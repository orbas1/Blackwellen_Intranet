import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DirectoryScreen } from '../screens/DirectoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { KnowledgeScreen } from '../screens/KnowledgeScreen';
import { ServiceHubScreen } from '../screens/ServiceHubScreen';

export type RootStackParamList = {
  Home: undefined;
  Directory: undefined;
  Knowledge: undefined;
  ServiceHub: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Adaptive Home' }} />
      <Stack.Screen name="Directory" component={DirectoryScreen} options={{ title: 'Directory' }} />
      <Stack.Screen name="Knowledge" component={KnowledgeScreen} options={{ title: 'Knowledge Hub' }} />
      <Stack.Screen name="ServiceHub" component={ServiceHubScreen} options={{ title: 'Service Hub' }} />
    </Stack.Navigator>
  );
}
