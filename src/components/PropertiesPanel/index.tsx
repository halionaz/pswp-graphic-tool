import s from './PropertiesPanel.module.css';

import Layers from '@/components/PropertiesPanel/Layers';
import Properties from '@/components/PropertiesPanel/Properties';

const PropertiesPanel = () => {
  return (
    <div className={s.Container}>
      <Properties />
      <Layers />
    </div>
  );
};
export default PropertiesPanel;
