import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';
import { PositionType } from '@/models/types';

const walk = (
  node: GraphicObjectInterface,
  ids: Set<string>,
  diff: PositionType,
  isParentSelected = false
): GraphicObjectInterface => {
  const isSelected = isParentSelected || ids.has(node.id);
  if (node.type !== 'group') {
    return isSelected
      ? {
          ...node,
          position: {
            x: node.position.x + diff.x,
            y: node.position.y + diff.y,
          },
        }
      : node;
  }

  return {
    ...node,
    children: node.children.map(c => walk(c, ids, diff, isSelected)),
  };
};

export default walk;
