import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';
import getObjectAABB from '@/utils/getObjectAABB';

const calculateRecursiveBoundingBox = (object: GraphicObjectInterface) => {
  if (object.type !== 'group') {
    return getObjectAABB(object);
  }

  // If it's a group, recurse
  if (object.children.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  let globalMinX = Infinity,
    globalMinY = Infinity,
    globalMaxX = -Infinity,
    globalMaxY = -Infinity;

  object.children.forEach(child => {
    const childBox = calculateRecursiveBoundingBox(child);
    if (childBox.minX < globalMinX) globalMinX = childBox.minX;
    if (childBox.minY < globalMinY) globalMinY = childBox.minY;
    if (childBox.maxX > globalMaxX) globalMaxX = childBox.maxX;
    if (childBox.maxY > globalMaxY) globalMaxY = childBox.maxY;
  });

  return {
    minX: globalMinX,
    minY: globalMinY,
    maxX: globalMaxX,
    maxY: globalMaxY,
  };
};
export default calculateRecursiveBoundingBox;
