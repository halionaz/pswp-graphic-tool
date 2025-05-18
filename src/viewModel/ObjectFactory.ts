import {
  EllipseInterface,
  GraphicObjectInterfaceBase,
  GraphicObjectType,
  ImageInterface,
  LineInterface,
  RectangleInterface,
  TextInterface,
} from '@/models/GraphicObjectModel';

const objectFactory = (type: GraphicObjectType) => {
  const newObjectBase: GraphicObjectInterfaceBase = {
    id: crypto.randomUUID(),
    title: `new ${type}`,
    type,
    color: '#D9D9D9',
    position: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    rotation: 0,
  };

  switch (type) {
    case 'rectangle':
      return {
        ...newObjectBase,
        scale: { width: 100, height: 100 },
      } as RectangleInterface;
    case 'ellipse':
      return {
        ...newObjectBase,
        scale: { width: 100, height: 100 },
      } as EllipseInterface;
    case 'line':
      return {
        ...newObjectBase,
        length: 250,
        strokeWidth: 2,
      } as LineInterface;
    case 'text':
      return {
        ...newObjectBase,
        text: 'new text',
        textColor: '#000000',
        textSize: 16,
      } as TextInterface;
    case 'image':
      return {
        ...newObjectBase,
        imgSrc:
          'https://i.namu.wiki/i/6Gan-zxEhaYP36aBUs-yL7pMW06cBqd4It6FbLfZopirrtNArvXJoPrBsIjADeadfMiz2tCrBRY8rnsYFIVnJQ.webp',
        scale: { width: 400, height: 400 },
      } as ImageInterface;
  }
};

export default objectFactory;
