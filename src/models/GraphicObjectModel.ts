import { PositionType, ScaleType } from '@/models/types';

export type GraphicObjectType =
  | 'rectangle'
  | 'ellipse'
  | 'line'
  | 'image'
  | 'text';

// 타입과 무관하게 모든 오브젝트가 가지는 공통 요소
export interface GraphicObjectInterfaceBase {
  id: string;
  title: string;
  type: GraphicObjectType;
  position: PositionType;
  rotation: number;
  color: string;
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
