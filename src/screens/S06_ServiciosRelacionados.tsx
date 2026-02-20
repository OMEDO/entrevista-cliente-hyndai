import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles, colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import FormInput from '../components/FormInput';
import { useServiciosRelacionadosController } from '../controllers/serviciosRelacionados.controller';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiciosRelacionados'>;

const S06_ServiciosRelacionados = ({ navigation }: Props) => {
  const { data, updateServicio } = useServiciosRelacionadosController();

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={6} totalSteps={7} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        <SectionHeader
          title="Servicios relacionados a la condición"
          subtitle="Revisiones anteriores"
        />

        {data.servicios.map((servicio, index) => (
          <View key={index} style={styles.servicioCard}>
            <View style={styles.servicioHeader}>
              <Text style={styles.servicioNum}>Revisión #{index + 1}</Text>
            </View>

            <View style={styles.servicioBody}>
              <FormInput
                label="# Síntoma"
                value={servicio.sintomaNum}
                onChangeText={t => updateServicio(index, { sintomaNum: t })}
                placeholder="Ej. 001"
                keyboardType="number-pad"
              />
              <FormInput
                label="Descripción del síntoma"
                value={servicio.descripcion}
                onChangeText={t => updateServicio(index, { descripcion: t })}
                placeholder="Describe el síntoma reportado..."
                multiline
                numberOfLines={3}
              />

              <View style={globalStyles.row}>
                <View style={styles.halfField}>
                  <FormInput
                    label="Fecha de atención (Día)"
                    value={servicio.dia}
                    onChangeText={t => updateServicio(index, { dia: t })}
                    placeholder="DD/MM/AAAA"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.spacer} />
                <View style={styles.halfField}>
                  <FormInput
                    label="Hora"
                    value={servicio.hora}
                    onChangeText={t => updateServicio(index, { hora: t })}
                    placeholder="HH:MM"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <FormInput
                label="Técnico a cargo (Nombre)"
                value={servicio.tecnicoNombre}
                onChangeText={t => updateServicio(index, { tecnicoNombre: t })}
                placeholder="Nombre del técnico"
              />

              <FormInput
                label="Observaciones"
                value={servicio.observaciones}
                onChangeText={t => updateServicio(index, { observaciones: t })}
                placeholder="Notas adicionales..."
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={globalStyles.navigationContainer}>
        <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.btnSecondaryText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.btnPrimary} onPress={() => navigation.navigate('NotasEsquemas')}>
          <Text style={globalStyles.btnPrimaryText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  servicioCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  servicioHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  servicioNum: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.3,
  },
  servicioBody: {
    padding: spacing.md,
  },
  halfField: {
    flex: 1,
  },
  spacer: {
    width: spacing.sm,
  },
});

export default S06_ServiciosRelacionados;
