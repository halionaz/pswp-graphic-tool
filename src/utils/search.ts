import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';

const search = (
  searchId: string,
  node: GraphicObjectInterface
): GraphicObjectInterface | null => {
  if (node.id === searchId) return node;
  if (node.type === 'group') {
    for (const child of node.children) {
      const found = search(searchId, child);
      if (found) return node; // Return the group if a child is found
    }
  }
  return null;
};

export default search;
