# scripts/detect.py
import yaml, cv2, numpy as np
from pathlib import Path
from ultralytics import YOLO

# ─── Paths ────────────────────────────────────────────
SCRIPT_DIR  = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent

# ─── Load schema & models ─────────────────────────────
cfg     = yaml.safe_load(open(PROJECT_DIR/"data.yaml"))
SCHEMA  = cfg["names"]  # ['helmet','vest','goggles','gloves']
WEIGHTS = PROJECT_DIR/"runs"/"train"/"ppe_optimal"/"weights"/"best.pt"

PPE_MODEL    = YOLO(str(WEIGHTS))
PERSON_MODEL = YOLO("yolov8n.pt")  # COCO person detector

def box_iou(boxA, boxB):
    xA = max(boxA[0], boxB[0]); yA = max(boxA[1], boxB[1])
    xB = min(boxA[2], boxB[2]); yB = min(boxA[3], boxB[3])
    interW = max(0, xB - xA); interH = max(0, yB - yA)
    interArea = interW * interH
    areaA = (boxA[2]-boxA[0])*(boxA[3]-boxA[1])
    areaB = (boxB[2]-boxB[0])*(boxB[3]-boxB[1])
    union = areaA + areaB - interArea
    return interArea/union if union>0 else 0

def detect_and_annotate(img):
    """
    - YOLO for helmet, goggles, gloves
    - YOLO OR color‐fallback for vest (orange/yellow)
    """
    # 1) detect persons
    pres = PERSON_MODEL.predict(source=img, conf=0.5, classes=[0], verbose=False)[0]
    persons = pres.boxes.xyxy.cpu().numpy().astype(int)

    # 2) detect PPE
    res     = PPE_MODEL.predict(source=img, conf=0.25, iou=0.45, verbose=False)[0]
    cls_ids = res.boxes.cls.cpu().numpy().astype(int)
    coords  = res.boxes.xyxy.cpu().numpy().astype(int)
    names   = res.names  # idx→label

    # group by label
    dets = {l: [] for l in SCHEMA}
    for cid, box in zip(cls_ids, coords):
        lbl = names[int(cid)]
        if lbl in dets:
            dets[lbl].append(box.tolist())

    vis     = img.copy()
    missing = set()

    for (x1,y1,x2,y2) in persons:
        h = y2 - y1
        head_th = y1 + int(0.3*h)
        vest_th = head_th
        half_th = y1 + int(0.5*h)
        hands_y0 = y1 + int(0.6 * h)

        status = {}

        # helmet: center in top 30% OR IoU>0.05
        ok = any(
            ((x1< (b[0]+b[2])//2 < x2 and y1< (b[1]+b[3])//2 < head_th) or
             box_iou([x1,y1,x2,y2],b)>0.05)
            for b in dets["helmet"]
        )
        status["helmet"] = ok

        # vest: try YOLO first
        ok = any(
            ((x1< (b[0]+b[2])//2 < x2 and vest_th< (b[1]+b[3])//2 < y2) or
             box_iou([x1,y1,x2,y2],b)>0.1)
            for b in dets["vest"]
        )
        # if YOLO missed, fallback to color scan
        if not ok:
            torso = img[vest_th:y2, x1:x2]
            hsv   = cv2.cvtColor(torso, cv2.COLOR_BGR2HSV)
            # yellow range
            y1_low, y1_high = np.array([15,100,100]), np.array([35,255,255])
            # orange range
            o1_low, o1_high = np.array([5,100,100]), np.array([15,255,255])
            mask = cv2.inRange(hsv, y1_low, y1_high) | cv2.inRange(hsv, o1_low, o1_high)
            # check if >3% of torso is orange/yellow
            if (mask.sum() / 255) > 0.03 * mask.size:
                ok = True
        status["vest"] = ok

        # goggles: center top 50%
        ok = any(
            x1< (b[0]+b[2])//2 < x2 and y1< (b[1]+b[3])//2 < half_th
            for b in dets["goggles"]
        )
        status["goggles"] = ok

        # gloves
        # YOLO pass
        ok = False
        for b in dets["gloves"]:
            cx, cy = (b[0] + b[2]) // 2, (b[1] + b[3]) // 2
            if x1 < cx < x2 and y1 < cy < y2:
                ok = True
                break
       
        status["gloves"] = ok

        # collect missing
        for lbl,p in status.items():
            if not p:
                missing.add(lbl)

        # draw
        col = (0,255,0) if all(status.values()) else (0,0,255)
        cv2.rectangle(vis,(x1,y1),(x2,y2),col,2)
        text = " ".join(f"{l[0].upper()}:{'OK' if status[l] else 'NO'}" for l in SCHEMA)
        cv2.putText(vis,text,(x1,y1-10),cv2.FONT_HERSHEY_SIMPLEX,0.6,col,2)

    return vis, sorted(missing)
