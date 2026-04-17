import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WardrobeProvider } from './src/context/WardrobeContext';
import { ClothingDetailsScreen } from './src/screens/ClothingDetailsScreen';
import { ClothingFormScreen } from './src/screens/ClothingFormScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { WardrobeScreen } from './src/screens/WardrobeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WardrobeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Armoire" component={WardrobeScreen} />
          <Stack.Screen name="Details" component={ClothingDetailsScreen} />
          <Stack.Screen name="Form" component={ClothingFormScreen} />
          <Stack.Screen name="Resultat" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WardrobeProvider>
  );
}
