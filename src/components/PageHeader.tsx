import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../styles/theme';
import { useForm } from '../context/FormContext';

interface Props {
  currentStep: number;
  totalSteps: number;
}

const STEPS = [
  'Info. Vehículo',
  'Motor',
  'Transmisión',
  'Ruido & Vibración',
  'Sist. Eléctrico',
  'Servicios Prev.',
  'Notas',
];

const PageHeader = ({ currentStep, totalSteps }: Props) => {
  const { formData } = useForm();
  const { nombreCliente, asesorTecnico, fechaInicioCaso } = formData.header;

  return (
    <View style={styles.container}>
      {/* Franja azul superior con logo y título */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>HYUNDAI</Text>
          <Text style={styles.formTitle}>Hoja de Entrevista al Cliente</Text>
        </View>
        <View style={styles.metaRight}>
          {fechaInicioCaso ? (
            <Text style={styles.metaText}>Fecha: {fechaInicioCaso}</Text>
          ) : null}
          {nombreCliente ? (
            <Text style={styles.metaText} numberOfLines={1}>{nombreCliente}</Text>
          ) : null}
          {asesorTecnico ? (
            <Text style={styles.metaText} numberOfLines={1}>Asesor: {asesorTecnico}</Text>
          ) : null}
        </View>
      </View>

      {/* Indicador de progreso */}
      <View style={styles.progressBar}>
        {STEPS.slice(0, totalSteps).map((step, i) => {
          const done = i < currentStep - 1;
          const active = i === currentStep - 1;
          return (
            <View
              key={step}
              style={[
                styles.progressStep,
                done && styles.progressDone,
                active && styles.progressActive,
              ]}
            >
              <Text
                style={[
                  styles.progressText,
                  (done || active) && styles.progressTextActive,
                ]}
                numberOfLines={1}
              >
                {active ? step : `${i + 1}`}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  brand: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    letterSpacing: 2,
  },
  formTitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  metaRight: {
    alignItems: 'flex-end',
    maxWidth: 160,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.80)',
    marginBottom: 2,
  },
  progressBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: 3,
  },
  progressStep: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  progressDone: {
    backgroundColor: colors.secondary,
  },
  progressActive: {
    backgroundColor: colors.white,
    flex: 2,
  },
  progressText: {
    fontSize: fontSize.xs - 1,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: fontWeight.medium,
  },
  progressTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
});

export default PageHeader;
