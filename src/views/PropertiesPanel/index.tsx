import Properties from '@/views/PropertiesPanel/Properties';
import s from './PropertiesPanel.module.css';
import Layers from '@/views/PropertiesPanel/Layers';

const PropertiesPanel = () => {
  return (
    <div className={s.Container}>
      <Properties />
      <Layers />
    </div>
  );
};
export default PropertiesPanel;
