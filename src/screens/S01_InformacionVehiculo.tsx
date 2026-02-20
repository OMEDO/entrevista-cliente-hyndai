import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useForm } from '../context/FormContext';
import { globalStyles, colors, spacing, fontSize, fontWeight } from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import FormInput from '../components/FormInput';
import { YesNoRadio } from '../components/RadioGroup';

type Props = NativeStackScreenProps<RootStackParamList, 'InformacionVehiculo'>;

const TOTAL_STEPS = 7;

const S01_InformacionVehiculo = ({ navigation }: Props) => {
  const { formData, updateSection } = useForm();
  const header = formData.header;
  const veh = formData.informacionVehiculo;

  const setHeader = (partial: Partial<typeof header>) =>
    updateSection('header', partial);
  const setVeh = (partial: Partial<typeof veh>) =>
    updateSection('informacionVehiculo', partial);

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={1} totalSteps={TOTAL_STEPS} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Datos generales del caso ── */}
        <SectionHeader title="Datos del Caso" />
        <View style={globalStyles.card}>
          <FormInput
            label="Fecha de inicio de caso"
            value={header.fechaInicioCaso}
            onChangeText={t => setHeader({ fechaInicioCaso: t })}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
          />
          <FormInput
            label="Nombre del Cliente"
            value={header.nombreCliente}
            onChangeText={t => setHeader({ nombreCliente: t })}
            placeholder="Nombre completo"
          />
          <FormInput
            label="No. de Orden de Reparación"
            value={header.noOrdenReparacion}
            onChangeText={t => setHeader({ noOrdenReparacion: t })}
            placeholder="Ej. 00012345"
            keyboardType="number-pad"
          />
          <FormInput
            label="Asesor Técnico"
            value={header.asesorTecnico}
            onChangeText={t => setHeader({ asesorTecnico: t })}
            placeholder="Nombre del asesor"
          />
        </View>

        {/* ── Información del Vehículo ── */}
        <SectionHeader title="Información del Vehículo" />
        <View style={globalStyles.card}>
          <FormInput
            label="VIN"
            value={veh.vin}
            onChangeText={t => setVeh({ vin: t })}
            placeholder="17 caracteres"
            style={{ fontFamily: 'monospace' } as any}
          />
          <FormInput
            label="Modelo"
            value={veh.modelo}
            onChangeText={t => setVeh({ modelo: t })}
            placeholder="Ej. Tucson 2023"
          />

          <View style={styles.yesNoRow}>
            <Text style={globalStyles.subsectionTitle}>
              ¿Es el cliente el conductor principal?
            </Text>
            <YesNoRadio
              value={veh.esConductorPrincipal}
              onChange={v => setVeh({ esConductorPrincipal: v })}
            />
          </View>

          <View style={globalStyles.divider} />

          <View style={styles.yesNoRow}>
            <Text style={globalStyles.subsectionTitle}>
              Acciones de Servicio abiertas:
            </Text>
            <YesNoRadio
              value={veh.accionesServicioAbiertas}
              onChange={v => setVeh({ accionesServicioAbiertas: v })}
            />
          </View>

          <FormInput
            label="Fecha de vencimiento de la garantía"
            value={veh.fechaVencimientoGarantia}
            onChangeText={t => setVeh({ fechaVencimientoGarantia: t })}
            placeholder="DD / MM / AAAA"
            keyboardType="numeric"
          />

          <View style={globalStyles.divider} />

          <View style={styles.yesNoRow}>
            <Text style={globalStyles.subsectionTitle}>
              ¿Está la condición presente?
            </Text>
            <YesNoRadio
              value={veh.condicionPresente}
              onChange={v => setVeh({ condicionPresente: v })}
            />
          </View>

          <View style={globalStyles.divider} />

          <View style={styles.yesNoRow}>
            <Text style={globalStyles.subsectionTitle}>
              ¿Hay instalado algún equipo NO original?
            </Text>
            <YesNoRadio
              value={veh.equipoNoOriginal}
              onChange={v => setVeh({ equipoNoOriginal: v })}
            />
          </View>

          <View style={globalStyles.divider} />

          <View style={styles.yesNoRow}>
            <Text style={globalStyles.subsectionTitle}>
              ¿El vehículo ha tenido Siniestros?
            </Text>
            <YesNoRadio
              value={veh.haTenicSiniestros}
              onChange={v => setVeh({ haTenicSiniestros: v })}
            />
          </View>
        </View>
      </ScrollView>

      {/* ── Navegación ── */}
      <View style={globalStyles.navigationContainer}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={globalStyles.btnPrimary}
          onPress={() => navigation.navigate('ManiobrabilidadMotor')}
        >
          <Text style={globalStyles.btnPrimaryText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  yesNoRow: {
    marginBottom: spacing.xs,
  },
});

export default S01_InformacionVehiculo;
