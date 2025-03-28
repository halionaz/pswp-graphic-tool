import Canvas from '@/components/Canvas';
import ContextProvider from '@/utils/providers/ContextProvider';
// import PropertiesPanel from '@/components/PropertiesPanel';
// import ToolBar from '@/components/ToolBar';

const App = () => {
  return (
    <ContextProvider>
      <Canvas />
    </ContextProvider>
  );
};

export default App;
