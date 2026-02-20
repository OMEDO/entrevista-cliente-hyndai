/**
 * motor.controller.ts
 * Lógica específica de la sección Maniobrabilidad del Motor.
 */

import { useForm } from '../context/FormContext';
import { ManiobrabilidadMotorData } from '../types/form.types';

export const MOTOR_SINTOMAS_LABELS: Record<keyof ManiobrabilidadMotorData, string> = {
  sinNoArranca: 'No arranca',
  sinDificultadArranque: 'Dificultad al arrancar o no arranca pero gira el motor',
  sinMarcaMinimaAspera: 'Marcha mínima áspera',
  sinMarcaMinimaAlta: 'Marcha mínima muy alta (acelerada)',
  sinMotorInestable: 'Marcha del motor inestable o temblorosa',
  sinMotorSuena: 'Marcha del motor suena o golpetea',
  sinRPMsFluctuan: 'RPMs fluctúan sin acelerar',
  sinDetonaciones: 'Marcha del motor ruido de detonaciones / cascabeleo',
  sinMotorSigueMarcha: 'Motor sigue en marcha al apagarlo',
  sinBajoRendimiento: 'Bajo rendimiento de combustible',
  sinBajoRendimientoKmL: '',
  sinOtro: 'Otro',
  sinOtroDesc: '',
  frecTodoMomento: 'Todo momento',
  frecAlgunasVeces: 'Algunas veces',
  frecRaraVez: 'Rara vez',
  frecAcabaIniciar: 'Acaba de iniciar la condición',
  tempEnFrio: 'En frío',
  tempAlCalentarse: 'Al calentarse',
  tempNormal: 'Normal',
  tempCaliente: 'Caliente',
  tempTodoTiempo: 'Todo el tiempo',
  tempOtro: '',
  climaCaluroso: 'Caluroso, soleado',
  climaFrio: 'Frío, fresco',
  climaHumedo: 'Húmedo, lluvia',
  climaOtro: '',
  manejoAlAcelerar: 'Al acelerar',
  acelerarFuerte: 'Fuerte',
  acelerarMedio: 'Medio',
  acelerarLigero: 'Ligero',
  manejoAlDesacelerar: 'Al desacelerar',
  manejoEstableCrucero: 'Estable – Crucero',
  combustibleMagna: 'Magna',
  combustiblePremium: 'Premium',
  marcaCombustible: '',
  velocidadKmh: '',
  regimenRPM: '',
};

export const useMotorController = () => {
  const { formData, updateSection } = useForm();
  const data = formData.maniobrabilidadMotor;

  const set = (partial: Partial<ManiobrabilidadMotorData>) =>
    updateSection('maniobrabilidadMotor', partial);

  const toggleBool = (key: keyof ManiobrabilidadMotorData) => {
    const val = data[key];
    if (typeof val === 'boolean') {
      set({ [key]: !val } as Partial<ManiobrabilidadMotorData>);
    }
  };

  return { data, set, toggleBool };
};
