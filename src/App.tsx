import Canvas from '@/components/Canvas';
import PropertiesPanel from '@/components/PropertiesPanel';
import ToolBar from '@/components/ToolBar';
import ContextProvider from '@/libs/providers/ContextProvider';

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
