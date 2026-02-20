import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FormProvider } from './src/context/FormContext';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/styles/theme';

const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <FormProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FormProvider>
  </SafeAreaProvider>
);

export default App;
