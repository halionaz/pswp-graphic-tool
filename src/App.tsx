import Canvas from '@/views/Canvas';
import PropertiesPanel from '@/views/PropertiesPanel';
import ToolBar from '@/views/ToolBar';
import CommandProvider from '@/commands/CommandProvider';

const App = () => {
  return (
    <CommandProvider>
      <ToolBar />
      <Canvas />
      <PropertiesPanel />
    </CommandProvider>
  );
};

export default App;
