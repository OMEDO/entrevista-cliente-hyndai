import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  globalStyles, colors, spacing, fontSize, fontWeight, borderRadius,
} from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import FormInput from '../components/FormInput';
import { useForm } from '../context/FormContext';
import { generateAndSharePDF } from '../services/pdfGenerator.service';

type Props = NativeStackScreenProps<RootStackParamList, 'NotasEsquemas'>;

const S07_NotasEsquemas = ({ navigation }: Props) => {
  const { formData, updateSection, resetForm } = useForm();
  const notas = formData.notasEsquemas.notas;
  const [generando, setGenerando] = useState(false);

  const handleGenerarPDF = async () => {
    setGenerando(true);
    try {
      await generateAndSharePDF(formData);
    } catch (err: any) {
      // El usuario canceló el share — no es un error real
      if (err?.message?.includes('User did not share') || err?.message?.includes('cancel')) {
        return;
      }
      Alert.alert(
        'Error al generar PDF',
        err?.message ?? 'Ocurrió un error inesperado.',
        [{ text: 'OK' }],
      );
    } finally {
      setGenerando(false);
    }
  };

  const handleNuevoFormulario = () => {
    Alert.alert(
      'Nuevo Formulario',
      '¿Deseas limpiar todos los datos e iniciar un nuevo formulario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, limpiar',
          style: 'destructive',
          onPress: () => {
            resetForm();
            navigation.navigate('InformacionVehiculo');
          },
        },
      ],
    );
  };

  const resumenSecciones = [
    { label: 'Información del Vehículo', done: !!formData.header.nombreCliente },
    { label: 'Maniobrabilidad del Motor', done: Object.values(formData.maniobrabilidadMotor).some(v => v === true) },
    { label: 'Transmisión', done: Object.values(formData.transmision).some(v => v === true) },
    { label: 'Ruido & Vibración', done: Object.values(formData.ruidoVibracion).some(v => v === true) },
    { label: 'Sistema Eléctrico', done: Object.values(formData.sistemaElectrico).some(v => v === true) },
    { label: 'Servicios Relacionados', done: formData.serviciosRelacionados.servicios.some(s => s.descripcion.trim() !== '') },
    { label: 'Notas y Esquemas', done: notas.trim().length > 0 },
  ];

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={7} totalSteps={7} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Notas ── */}
        <SectionHeader title="Notas y Esquemas" subtitle="Última sección del formulario" />
        <View style={globalStyles.card}>
          <FormInput
            label="Notas adicionales y esquemas:"
            value={notas}
            onChangeText={t => updateSection('notasEsquemas', { notas: t })}
            placeholder="Escribe aquí cualquier nota adicional, descripción de esquemas o comentarios relevantes..."
            multiline
            numberOfLines={10}
          />
        </View>

        {/* ── Resumen ── */}
        <SectionHeader title="Resumen del Formulario" />
        <View style={globalStyles.card}>
          {resumenSecciones.map(({ label, done }) => (
            <View key={label} style={styles.summaryRow}>
              <Text style={[styles.summaryIcon, done ? styles.iconDone : styles.iconPending]}>
                {done ? '✓' : '○'}
              </Text>
              <Text style={[styles.summaryLabel, done && styles.summaryLabelDone]}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Botón Generar PDF ── */}
        <TouchableOpacity
          style={[styles.btnPDF, generando && styles.btnPDFDisabled]}
          onPress={handleGenerarPDF}
          activeOpacity={0.85}
          disabled={generando}
        >
          {generando ? (
            <>
              <ActivityIndicator color={colors.white} size="small" style={{ marginRight: spacing.sm }} />
              <Text style={styles.btnPDFText}>Generando PDF...</Text>
            </>
          ) : (
            <>
              <Text style={styles.btnPDFIcon}>📄</Text>
              <Text style={styles.btnPDFText}>Generar y Compartir PDF</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnNuevo}
          onPress={handleNuevoFormulario}
          activeOpacity={0.85}
        >
          <Text style={styles.btnNuevoText}>Nuevo Formulario</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Barra inferior ── */}
      <View style={globalStyles.navigationContainer}>
        <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.btnSecondaryText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.btnPrimary, generando && { opacity: 0.6 }]}
          onPress={handleGenerarPDF}
          disabled={generando}
        >
          {generando
            ? <ActivityIndicator color={colors.white} size="small" />
            : <Text style={globalStyles.btnPrimaryText}>Generar PDF</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
  },
  summaryIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing.sm,
    width: 24,
    textAlign: 'center',
  },
  iconDone: { color: colors.success },
  iconPending: { color: colors.gray },
  summaryLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    flex: 1,
  },
  summaryLabelDone: {
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  btnPDF: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md + 2,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    elevation: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  btnPDFDisabled: {
    opacity: 0.7,
  },
  btnPDFIcon: {
    fontSize: fontSize.xl,
    marginRight: spacing.sm,
  },
  btnPDFText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.5,
  },
  btnNuevo: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  btnNuevoText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
});

export default S07_NotasEsquemas;
