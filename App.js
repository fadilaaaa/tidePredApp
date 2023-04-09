import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {
  Dashboard,
  AddTide,
  Login,
  InitialScreen,
  MonitoringSceen,
  HistoriScreen,
  SplashScreen,
} from './src/screens';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="InitialScreen" component={InitialScreen} />
          <Stack.Screen name="MonitoringScreen" component={MonitoringSceen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AddTide" component={AddTide} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HistoriScreen" component={HistoriScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
