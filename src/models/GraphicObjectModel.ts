import { PositionType, ScaleType } from '@/models/types';
import { Observable } from '@/models/types';

export type GraphicObjectType =
  | 'rectangle'
  | 'ellipse'
  | 'line'
  | 'image'
  | 'text';

// 타입과 무관하게 모든 오브젝트가 가지는 공통 요소
export interface GraphicObjectInterface {
  id: string;
  title: string;
  type: GraphicObjectType;
  position: PositionType;
  rotation: number;
  color: string;

  rotate(Deg: number): void;
  move(dx: number, dy: number): void;
}

export abstract class GraphicObject
  extends Observable
  implements GraphicObjectInterfaceBase
{
  constructor(
    readonly id: string,
    public title: string,
    public type: GraphicObjectType,
    public position: PositionType,
    public rotation = 0,
    public color = '#D9D9D9'

  ){ super(); }

  move(diff: PositionType) {
    this.position = {
      x: this.position.x + diff.x,
      y: this.position.y + diff.y,
    };
    this.notify()
  }
}


export interface RectangleInterface extends GraphicObjectInterfaceBase {
  type: 'rectangle';
  scale: ScaleType;
}

export interface EllipseInterface extends GraphicObjectInterfaceBase {
  type: 'ellipse';
  scale: ScaleType;
}

export interface LineInterface extends GraphicObjectInterfaceBase {
  type: 'line';
  strokeWidth: number;
  length: number;
}

export interface ImageInterface extends GraphicObjectInterfaceBase {
  type: 'image';
  imgSrc: string;
  scale: ScaleType;
}

export interface TextInterface extends GraphicObjectInterfaceBase {
  type: 'text';
  text: string;
  textColor: string;
  textSize: number;
}

export type GraphicObjectInterface =
  | RectangleInterface
  | EllipseInterface
  | LineInterface
  | ImageInterface
  | TextInterface;
