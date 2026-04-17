import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClothingDetailsScreen } from '../screens/ClothingDetailsScreen';
import { ClothingFormScreen } from '../screens/ClothingFormScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { WardrobeScreen } from '../screens/WardrobeScreen';

const Tab = createBottomTabNavigator();
const WardrobeStack = createNativeStackNavigator();

const headerOptions = {
  headerTitleStyle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '900',
  },
  headerTintColor: '#111827',
};

function WardrobeStackNavigator() {
  return (
    <WardrobeStack.Navigator screenOptions={headerOptions}>
      <WardrobeStack.Screen
        name="Listes"
        component={WardrobeScreen}
        options={{ headerShown: false }}
      />
      <WardrobeStack.Screen
        name="Details"
        component={ClothingDetailsScreen}
        options={{ title: 'Détails' }}
      />
      <WardrobeStack.Screen
        name="Form"
        component={ClothingFormScreen}
        options={{ title: 'Vêtement' }}
      />
    </WardrobeStack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'Armoire') {
            iconName = 'shopping-bag';
          }

          if (route.name === 'Resultat') {
            iconName = 'magic';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
      <Tab.Screen
        name="Armoire"
        component={WardrobeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) || 'Listes';

          return {
            title: 'Armoire',
            headerShown: routeName === 'Listes',
          };
        }}
      />
      <Tab.Screen
        name="Resultat"
        component={ResultScreen}
        options={{ title: 'Recommandations' }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}
