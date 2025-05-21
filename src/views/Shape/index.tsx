import { MouseEvent, useContext } from 'react';
import useDrag from '@/libs/hooks/useDrag';
import { GraphicObjectInterface } from '@/models/GraphicObjectModel';
import {
  ControllerContext,
  SelectedObjectsContext,
} from '@/viewModel/GraphicEditorContext';
import Ellipse from '@/views/Shape/Ellipse';
import Image from '@/views/Shape/Image';
import Line from '@/views/Shape/Line';
import Rectangle from '@/views/Shape/Rectangle';

interface Props {
  onShapeContextMenu: (e: MouseEvent, id: string) => void;
  onGroupContextMenu: (e: MouseEvent, ids: string[]) => void;
}

export default function ShapeLayer({
  onShapeContextMenu,
  onGroupContextMenu,
}: Props) {
  const controller = useContext(ControllerContext);
  const selected = useContext(SelectedObjectsContext);
  const { bind } = useDrag();

  const objects: GraphicObjectInterface[] = controller?.objects ?? [];

  return objects.map((obj) => {
    const commonProps = {
      key: obj.id,
      ...bind(obj.id),
      onContextMenu: (e: MouseEvent) => {
        if (selected.length > 1) {
          onGroupContextMenu(e, selected);
        } else {
          onShapeContextMenu(e, obj.id);
        }
      },
    };

    switch (obj.type) {
      case 'ellipse':
        return <Ellipse {...commonProps} data={obj} />;
      case 'rect':
        return <Rectangle {...commonProps} data={obj} />;
      case 'line':
        return <Line {...commonProps} data={obj} />;
      case 'image':
        return <Image {...commonProps} data={obj} />;
      default:
        return null;
    }
  });
}
