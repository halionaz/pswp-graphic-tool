import { SelectionHandler } from "./SelectionHandler";
import { CanvasHandler } from "./CanvasHandler";
import { ShapeHandler } from "./ShapeHandler";
import { GraphicObjectInterface } from "@/libs/types";

/** Build a handler chain starting with the top-most shape (if any) */
export function buildHandlerChain(
  hitShape: GraphicObjectInterface | null
) {
  // Chain: Shape → Selection → Canvas
  const canvas = new CanvasHandler();
  const selection = new SelectionHandler(canvas);
  return hitShape ? new ShapeHandler(hitShape, selection) : selection;
}
