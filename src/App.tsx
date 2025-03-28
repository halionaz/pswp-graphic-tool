import Canvas from '@/components/Canvas';
import ToolBar from '@/components/ToolBar';
import ContextProvider from '@/utils/providers/ContextProvider';

const App = () => {
  return (
    <ContextProvider>
      <ToolBar />
      <Canvas />
    </ContextProvider>
  );
};

export default App;
