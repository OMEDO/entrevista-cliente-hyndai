import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles, colors, spacing } from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import CheckboxItem from '../components/CheckboxItem';
import FormInput from '../components/FormInput';
import { useMotorController } from '../controllers/motor.controller';

type Props = NativeStackScreenProps<RootStackParamList, 'ManiobrabilidadMotor'>;

const S02_ManiobrabilidadMotor = ({ navigation }: Props) => {
  const { data, set, toggleBool } = useMotorController();

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={2} totalSteps={7} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Síntomas ── */}
        <SectionHeader title="Maniobrabilidad del Motor" subtitle="Síntoma" />
        <View style={globalStyles.card}>
          <CheckboxItem label="No arranca" checked={data.sinNoArranca} onToggle={() => toggleBool('sinNoArranca')} />
          <CheckboxItem label="Dificultad al arrancar o no arranca pero gira el motor" checked={data.sinDificultadArranque} onToggle={() => toggleBool('sinDificultadArranque')} />
          <CheckboxItem label="Marcha mínima áspera" checked={data.sinMarcaMinimaAspera} onToggle={() => toggleBool('sinMarcaMinimaAspera')} />
          <CheckboxItem label="Marcha mínima muy alta (acelerada)" checked={data.sinMarcaMinimaAlta} onToggle={() => toggleBool('sinMarcaMinimaAlta')} />
          <CheckboxItem label="Marcha del motor inestable o temblorosa" checked={data.sinMotorInestable} onToggle={() => toggleBool('sinMotorInestable')} />
          <CheckboxItem label="Marcha del motor suena o golpetea" checked={data.sinMotorSuena} onToggle={() => toggleBool('sinMotorSuena')} />
          <CheckboxItem label="RPMs fluctúan sin acelerar" checked={data.sinRPMsFluctuan} onToggle={() => toggleBool('sinRPMsFluctuan')} />
          <CheckboxItem label="Marcha del motor ruido de detonaciones / cascabeleo" checked={data.sinDetonaciones} onToggle={() => toggleBool('sinDetonaciones')} />
          <CheckboxItem label="Motor sigue en marcha al apagarlo" checked={data.sinMotorSigueMarcha} onToggle={() => toggleBool('sinMotorSigueMarcha')} />

          <View style={styles.checkRow}>
            <CheckboxItem label="Bajo rendimiento de combustible" checked={data.sinBajoRendimiento} onToggle={() => toggleBool('sinBajoRendimiento')} />
            {data.sinBajoRendimiento && (
              <FormInput
                value={data.sinBajoRendimientoKmL}
                onChangeText={t => set({ sinBajoRendimientoKmL: t })}
                placeholder="0.0"
                keyboardType="decimal-pad"
                suffix="Km/L"
              />
            )}
          </View>

          <View style={styles.checkRow}>
            <CheckboxItem label="Otro:" checked={data.sinOtro} onToggle={() => toggleBool('sinOtro')} />
            {data.sinOtro && (
              <FormInput
                value={data.sinOtroDesc}
                onChangeText={t => set({ sinOtroDesc: t })}
                placeholder="Describe el síntoma"
              />
            )}
          </View>
        </View>

        {/* ── Frecuencia ── */}
        <SectionHeader title="Frecuencia del síntoma" />
        <View style={globalStyles.card}>
          <CheckboxItem label="Todo momento" checked={data.frecTodoMomento} onToggle={() => toggleBool('frecTodoMomento')} />
          <CheckboxItem label="Algunas veces" checked={data.frecAlgunasVeces} onToggle={() => toggleBool('frecAlgunasVeces')} />
          <CheckboxItem label="Rara vez" checked={data.frecRaraVez} onToggle={() => toggleBool('frecRaraVez')} />
          <CheckboxItem label="Acaba de iniciar la condición" checked={data.frecAcabaIniciar} onToggle={() => toggleBool('frecAcabaIniciar')} />
        </View>

        {/* ── ¿Cuándo ocurre? ── */}
        <SectionHeader title="¿Cuándo ocurre?" />
        <View style={globalStyles.card}>
          <Text style={globalStyles.subsectionTitle}>Temperatura del motor:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="En frío" checked={data.tempEnFrio} onToggle={() => toggleBool('tempEnFrio')} />
            <CheckboxItem label="Al calentarse" checked={data.tempAlCalentarse} onToggle={() => toggleBool('tempAlCalentarse')} />
            <CheckboxItem label="Normal" checked={data.tempNormal} onToggle={() => toggleBool('tempNormal')} />
            <CheckboxItem label="Caliente" checked={data.tempCaliente} onToggle={() => toggleBool('tempCaliente')} />
            <CheckboxItem label="Todo el tiempo" checked={data.tempTodoTiempo} onToggle={() => toggleBool('tempTodoTiempo')} />
          </View>
          <FormInput
            label="Otro:"
            value={data.tempOtro}
            onChangeText={t => set({ tempOtro: t })}
            placeholder=""
          />

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>Condiciones del clima:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Caluroso, soleado" checked={data.climaCaluroso} onToggle={() => toggleBool('climaCaluroso')} />
            <CheckboxItem label="Frío, fresco" checked={data.climaFrio} onToggle={() => toggleBool('climaFrio')} />
            <CheckboxItem label="Húmedo, lluvia" checked={data.climaHumedo} onToggle={() => toggleBool('climaHumedo')} />
          </View>
          <FormInput
            label="Otro:"
            value={data.climaOtro}
            onChangeText={t => set({ climaOtro: t })}
            placeholder=""
          />

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>Condiciones de manejo:</Text>
          <CheckboxItem label="Al acelerar:" checked={data.manejoAlAcelerar} onToggle={() => toggleBool('manejoAlAcelerar')} />
          {data.manejoAlAcelerar && (
            <View style={[globalStyles.rowWrap, { paddingLeft: spacing.lg }]}>
              <CheckboxItem label="Fuerte" checked={data.acelerarFuerte} onToggle={() => toggleBool('acelerarFuerte')} />
              <CheckboxItem label="Medio" checked={data.acelerarMedio} onToggle={() => toggleBool('acelerarMedio')} />
              <CheckboxItem label="Ligero" checked={data.acelerarLigero} onToggle={() => toggleBool('acelerarLigero')} />
            </View>
          )}
          <CheckboxItem label="Al desacelerar" checked={data.manejoAlDesacelerar} onToggle={() => toggleBool('manejoAlDesacelerar')} />
          <CheckboxItem label="Estable – Crucero" checked={data.manejoEstableCrucero} onToggle={() => toggleBool('manejoEstableCrucero')} />
        </View>

        {/* ── Combustible ── */}
        <SectionHeader title="Tipo de combustible" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Magna" checked={data.combustibleMagna} onToggle={() => toggleBool('combustibleMagna')} />
            <CheckboxItem label="Premium" checked={data.combustiblePremium} onToggle={() => toggleBool('combustiblePremium')} />
          </View>
          <FormInput
            label="Marca del combustible:"
            value={data.marcaCombustible}
            onChangeText={t => set({ marcaCombustible: t })}
            placeholder=""
          />
          <FormInput
            label="¿A qué velocidad se presenta?"
            value={data.velocidadKmh}
            onChangeText={t => set({ velocidadKmh: t })}
            placeholder="0"
            keyboardType="numeric"
            suffix="Km/h"
          />
          <FormInput
            label="¿A qué régimen del motor se presenta?"
            value={data.regimenRPM}
            onChangeText={t => set({ regimenRPM: t })}
            placeholder="0"
            keyboardType="numeric"
            suffix="RPM"
          />
        </View>
      </ScrollView>

      <View style={globalStyles.navigationContainer}>
        <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.btnSecondaryText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.btnPrimary} onPress={() => navigation.navigate('Transmision')}>
          <Text style={globalStyles.btnPrimaryText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkRow: {
    marginBottom: spacing.xs,
  },
});

export default S02_ManiobrabilidadMotor;
