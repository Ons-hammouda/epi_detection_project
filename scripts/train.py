# scripts/train.py
import argparse
import os
from ultralytics import YOLO

def parse_args():
    parser = argparse.ArgumentParser("Train PPE detector")
    parser.add_argument("--data",    type=str, default="data.yaml",   help="Data config")
    parser.add_argument("--weights", type=str, default="yolov8s.pt",  help="Backbone weights")
    parser.add_argument("--epochs",  type=int, default=100,           help="Epochs")
    parser.add_argument("--imgsz",   type=int, default=640,           help="Image size")
    parser.add_argument("--batch",   type=int, default=16,            help="Batch size")
    parser.add_argument("--project", type=str, default="runs/train",  help="Save directory")
    parser.add_argument("--name",    type=str, default="ppe_optimal", help="Run name")
    return parser.parse_args()

def main():
    args = parse_args()
    os.makedirs(args.project, exist_ok=True)
    model = YOLO(args.weights)
    model.train(
        data=args.data,
        epochs=args.epochs,
        imgsz=args.imgsz,
        batch=args.batch,
        project=args.project,
        name=args.name,
        cache=True,
        val=True,
        save_period=10
    )
    print("=== Final validation ===")
    model.val(
        data=args.data,
        weights=f"{args.project}/{args.name}/weights/best.pt",
        imgsz=args.imgsz,
        batch=args.batch
    )

if __name__ == "__main__":
    main()
