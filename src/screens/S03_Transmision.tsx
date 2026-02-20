import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles, spacing } from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import CheckboxItem from '../components/CheckboxItem';
import FormInput from '../components/FormInput';
import { useTransmisionController } from '../controllers/transmision.controller';

type Props = NativeStackScreenProps<RootStackParamList, 'Transmision'>;

const S03_Transmision = ({ navigation }: Props) => {
  const { data, set, toggleBool } = useTransmisionController();

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={3} totalSteps={7} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── ATM / iVT / DCT ── */}
        <SectionHeader title="Transmisión" subtitle="Síntoma (ATM / iVT / DCT)" />
        <View style={globalStyles.card}>
          <CheckboxItem label="El vehículo no hace cambios adecuadamente" checked={data.atmNoCambiosAdecuados} onToggle={() => toggleBool('atmNoCambiosAdecuados')} />
          <CheckboxItem label="Golpea al cambiar de velocidad" checked={data.atmGolpea} onToggle={() => toggleBool('atmGolpea')} />
          <CheckboxItem label="Deslizamiento (incrementan las RPM del motor)" checked={data.atmDeslizamiento} onToggle={() => toggleBool('atmDeslizamiento')} />
          <CheckboxItem label="No hace ningún cambio de velocidad" checked={data.atmNoCambio} onToggle={() => toggleBool('atmNoCambio')} />
          <CheckboxItem label='El motor arranca en otro rango que no es "P" o "N"' checked={data.atmArranqueOtroRango} onToggle={() => toggleBool('atmArranqueOtroRango')} />
          <CheckboxItem label="Fugas o ruidos inusuales (tronidos, traqueteos, golpes, etc.)" checked={data.atmFugasRuidos} onToggle={() => toggleBool('atmFugasRuidos')} />

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>Sobremarcha no funciona:</Text>
          <View style={{ paddingLeft: spacing.md }}>
            <CheckboxItem label="No hace el cambio a sobremarcha" checked={data.atmNoCambioSobremarcha} onToggle={() => toggleBool('atmNoCambioSobremarcha')} />
            <CheckboxItem label="Acopla y desacopla la sobremarcha" checked={data.atmAcoplaDesacopla} onToggle={() => toggleBool('atmAcoplaDesacopla')} />
            <CheckboxItem label="No funciona con el control de velocidad activado, pero funciona en otras condiciones" checked={data.atmNoFuncionaControlVel} onToggle={() => toggleBool('atmNoFuncionaControlVel')} />
          </View>
          <CheckboxItem label="Se encuentra en modo de seguridad" checked={data.atmModoSeguridad} onToggle={() => toggleBool('atmModoSeguridad')} />
        </View>

        {/* ── ¿Cuándo ocurre? ── */}
        <SectionHeader title="¿Cuándo ocurre?" />
        <View style={globalStyles.card}>
          <Text style={globalStyles.subsectionTitle}>Cuando el selector de velocidad está en:</Text>
          <View style={globalStyles.rowWrap}>
            {(['P','R','N','D','+','-'] as const).map(sel => {
              const keyMap: Record<string, keyof typeof data> = {
                P: 'selectorP', R: 'selectorR', N: 'selectorN',
                D: 'selectorD', '+': 'selectorMas', '-': 'selectorMenos',
              };
              const k = keyMap[sel] as keyof typeof data;
              return (
                <CheckboxItem
                  key={sel}
                  label={sel}
                  checked={data[k] as boolean}
                  onToggle={() => toggleBool(k)}
                />
              );
            })}
          </View>

          <Text style={globalStyles.subsectionTitle}>Entre las velocidades:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="1 & 2" checked={data.entVelocidades12} onToggle={() => toggleBool('entVelocidades12')} />
            <CheckboxItem label="2 & 3" checked={data.entVelocidades23} onToggle={() => toggleBool('entVelocidades23')} />
            <CheckboxItem label="Otra" checked={data.entVelocidadesOtra} onToggle={() => toggleBool('entVelocidadesOtra')} />
          </View>

          <Text style={globalStyles.subsectionTitle}>Cuando el interruptor de over-drive está:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="On" checked={data.overdrivOn} onToggle={() => toggleBool('overdrivOn')} />
            <CheckboxItem label="Off" checked={data.overdriveOff} onToggle={() => toggleBool('overdriveOff')} />
            <CheckboxItem label="Ambas" checked={data.overdriveAmbas} onToggle={() => toggleBool('overdriveAmbas')} />
          </View>
        </View>

        {/* ── MT ── */}
        <SectionHeader title="Síntoma (MT – Transmisión Manual)" />
        <View style={globalStyles.card}>
          <CheckboxItem label="Vibraciones y ruido" checked={data.mtVibracionesRuido} onToggle={() => toggleBool('mtVibracionesRuido')} />
          <CheckboxItem label="Dificultad para cambio de velocidad" checked={data.mtDificultadCambio} onToggle={() => toggleBool('mtDificultadCambio')} />

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>Temperatura de motor:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Frío" checked={data.mtTempFrio} onToggle={() => toggleBool('mtTempFrio')} />
            <CheckboxItem label="Al calentarse" checked={data.mtTempAlCalentarse} onToggle={() => toggleBool('mtTempAlCalentarse')} />
            <CheckboxItem label="Normal" checked={data.mtTempNormal} onToggle={() => toggleBool('mtTempNormal')} />
            <CheckboxItem label="Caliente" checked={data.mtTempCaliente} onToggle={() => toggleBool('mtTempCaliente')} />
            <CheckboxItem label="Todo el tiempo" checked={data.mtTempTodoTiempo} onToggle={() => toggleBool('mtTempTodoTiempo')} />
          </View>
          <FormInput label="Otro:" value={data.mtTempOtro} onChangeText={t => set({ mtTempOtro: t })} placeholder="" />

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>Condiciones del clima:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Solo días calurosos" checked={data.mtClimaDiasCalurosos} onToggle={() => toggleBool('mtClimaDiasCalurosos')} />
            <CheckboxItem label="Solo en días fríos" checked={data.mtClimaDiasFrios} onToggle={() => toggleBool('mtClimaDiasFrios')} />
            <CheckboxItem label="Húmedo / lluvia" checked={data.mtClimaHumedo} onToggle={() => toggleBool('mtClimaHumedo')} />
          </View>
          <FormInput label="Otro:" value={data.mtClimaOtro} onChangeText={t => set({ mtClimaOtro: t })} placeholder="" />

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>Condiciones de manejo – Aceleración:</Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Fuerte" checked={data.mtManejoFuerte} onToggle={() => toggleBool('mtManejoFuerte')} />
            <CheckboxItem label="Media" checked={data.mtManejoMedia} onToggle={() => toggleBool('mtManejoMedia')} />
            <CheckboxItem label="Ligera" checked={data.mtManejoLigera} onToggle={() => toggleBool('mtManejoLigera')} />
          </View>
          <CheckboxItem label="Al desacelerar" checked={data.mtManejoDesacelerar} onToggle={() => toggleBool('mtManejoDesacelerar')} />
          <CheckboxItem label="Estable – Crucero" checked={data.mtManejoEstableCrucero} onToggle={() => toggleBool('mtManejoEstableCrucero')} />

          <FormInput label="¿A qué velocidad se presenta?" value={data.mtVelocidadKmh} onChangeText={t => set({ mtVelocidadKmh: t })} placeholder="0" keyboardType="numeric" suffix="Km/h" />
          <FormInput label="¿A qué régimen del motor se presenta?" value={data.mtRegimenRPM} onChangeText={t => set({ mtRegimenRPM: t })} placeholder="0" keyboardType="numeric" suffix="RPM" />
        </View>

        {/* ── Frecuencia ── */}
        <SectionHeader title="¿Con qué frecuencia se presenta?" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Siempre" checked={data.frecSiempre} onToggle={() => toggleBool('frecSiempre')} />
            <CheckboxItem label="Rara vez" checked={data.frecRaraVez} onToggle={() => toggleBool('frecRaraVez')} />
            <CheckboxItem label="Algunas veces" checked={data.frecAlgunasVeces} onToggle={() => toggleBool('frecAlgunasVeces')} />
            <CheckboxItem label="Acaba de iniciar la condición" checked={data.frecAcabaIniciar} onToggle={() => toggleBool('frecAcabaIniciar')} />
          </View>
        </View>
      </ScrollView>

      <View style={globalStyles.navigationContainer}>
        <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.btnSecondaryText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.btnPrimary} onPress={() => navigation.navigate('RuidoVibracion')}>
          <Text style={globalStyles.btnPrimaryText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default S03_Transmision;
