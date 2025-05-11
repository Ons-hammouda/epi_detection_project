import os
import cv2
import base64
import numpy as np
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, RedirectResponse

from .detect import detect_and_annotate

# ─── Paths ─────────────────────────────────────────
SCRIPT_DIR  = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent

# ─── Load .env ───────────────────────────────────────
load_dotenv(PROJECT_DIR / ".env")

# ─── App + static ────────────────────────────────────
app = FastAPI()
app.mount(
    "/static",
    StaticFiles(directory=PROJECT_DIR / "frontend"),
    name="static"
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("/static/index.html")


# ─── New detect endpoint (no email!) ─────────────────
@app.post("/detect/")
async def detect(image: UploadFile = File(...)):
    # read image
    data = await image.read()
    img  = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(400, "Invalid image file")

    # run your detect.py logic
    vis, missing = detect_and_annotate(img)
    status = "all_good" if not missing else "missing"

    # encode result image
    ok, buf = cv2.imencode(".jpg", vis)
    if not ok:
        raise HTTPException(500, "Failed to encode image")
    img_b64 = base64.b64encode(buf).decode("ascii")

    return JSONResponse({
        "status":    status,
        "missing":   missing,
        "image_b64": img_b64
    })
