import Canvas from '@/views/Canvas';
import PropertiesPanel from '@/views/PropertiesPanel';
import ToolBar from '@/views/ToolBar';
import ContextProvider from '@/viewModel/ContextProvider';

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
