import React, {createContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Register from './app/screens/Register';
import PinScreen from './app/screens/PinScreen';
import LoginScreen from './app/screens/LoginScreen';
import Dashboard from './app/screens/Dashboard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppColors, {
  AppColors_Dark,
  AppColors_Light,
} from './app/utils/AppColors';
import {UserInfo} from './app/modals/Invoice';
import {getUserInfo} from './app/utils/Database';
import {Provider, useSelector} from 'react-redux';
import configureStore from './app/redux/Store';
import {Mode} from './app/Redux/ThemeReducer';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  useEffect(() => {
    getUserInfo().then(value => {
      setUserInfo(value);
    });
  }, []);

  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        {userInfo === null ? <SignupModule /> : <LoginModule />}
      </NavigationContainer>
    </Provider>
  );
};

const SignupModule = () => {
  const mode: Mode = useSelector(store => {
    return store.theme.mode;
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            mode === 'light'
              ? AppColors_Light.navigationColor
              : AppColors_Dark.navigationColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PinScreen" component={PinScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

const LoginModule = () => {
  const mode: Mode = useSelector(store => {
    return store.theme.mode;
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            mode === 'light'
              ? AppColors_Light.navigationColor
              : AppColors_Dark.navigationColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default App;
