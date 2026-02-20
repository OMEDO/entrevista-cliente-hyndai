import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import S01_InformacionVehiculo from '../screens/S01_InformacionVehiculo';
import S02_ManiobrabilidadMotor from '../screens/S02_ManiobrabilidadMotor';
import S03_Transmision from '../screens/S03_Transmision';
import S04_RuidoVibracion from '../screens/S04_RuidoVibracion';
import S05_SistemaElectrico from '../screens/S05_SistemaElectrico';
import S06_ServiciosRelacionados from '../screens/S06_ServiciosRelacionados';
import S07_NotasEsquemas from '../screens/S07_NotasEsquemas';

export type RootStackParamList = {
  InformacionVehiculo: undefined;
  ManiobrabilidadMotor: undefined;
  Transmision: undefined;
  RuidoVibracion: undefined;
  SistemaElectrico: undefined;
  ServiciosRelacionados: undefined;
  NotasEsquemas: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="InformacionVehiculo"
    screenOptions={{
      // El header nativo está oculto; cada screen tiene su propio PageHeader
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="InformacionVehiculo" component={S01_InformacionVehiculo} />
    <Stack.Screen name="ManiobrabilidadMotor" component={S02_ManiobrabilidadMotor} />
    <Stack.Screen name="Transmision" component={S03_Transmision} />
    <Stack.Screen name="RuidoVibracion" component={S04_RuidoVibracion} />
    <Stack.Screen name="SistemaElectrico" component={S05_SistemaElectrico} />
    <Stack.Screen name="ServiciosRelacionados" component={S06_ServiciosRelacionados} />
    <Stack.Screen name="NotasEsquemas" component={S07_NotasEsquemas} />
  </Stack.Navigator>
);

export default AppNavigator;
