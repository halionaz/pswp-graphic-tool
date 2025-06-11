import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';

const getObjectAABB = (object: GraphicObjectInterface) => {
  let width = 0;
  let height = 0;

  switch (object.type) {
    case 'rectangle':
    case 'ellipse':
    case 'image':
      width = object.scale.width;
      height = object.scale.height;
      break;
    case 'line':
      width = object.length;
      height = object.strokeWidth;
      break;
    case 'text':
      // This is an approximation. A real solution would measure the DOM element.
      width = object.text.length * (object.textSize * 0.6);
      height = object.textSize;
      break;
    default:
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  const minX = object.position.x - width / 2;
  const minY = object.position.y - height / 2;

  return { minX, minY, maxX: minX + width, maxY: minY + height };
};

export default getObjectAABB;
