import ContextProvider from '@/viewModels/ContextProvider';

import Canvas from '@/views/Canvas';
import PropertiesPanel from '@/views/PropertiesPanel';
import ToolBar from '@/views/ToolBar';

const App = () => {
  return (
    <ContextProvider>
      <ToolBar />
      <Canvas />
      <PropertiesPanel />
    </ContextProvider>
  );
};

export default App;
