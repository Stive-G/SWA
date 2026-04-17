import { WardrobeProvider } from './src/context/WardrobeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <WardrobeProvider>
      <AppNavigator />
    </WardrobeProvider>
  );
}
