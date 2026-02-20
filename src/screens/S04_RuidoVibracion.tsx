import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles, colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import CheckboxItem from '../components/CheckboxItem';
import FormInput from '../components/FormInput';
import { useRuidoVibracionController, DEFINICIONES_RUIDO } from '../controllers/ruidoVibracion.controller';

type Props = NativeStackScreenProps<RootStackParamList, 'RuidoVibracion'>;

const S04_RuidoVibracion = ({ navigation }: Props) => {
  const { data, set, toggleBool } = useRuidoVibracionController();
  const [showDefiniciones, setShowDefiniciones] = useState(false);

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={4} totalSteps={7} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Síntoma principal ── */}
        <SectionHeader title="Ruido & Vibración" subtitle="Síntoma" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Ruido" checked={data.sinRuido} onToggle={() => toggleBool('sinRuido')} />
            <CheckboxItem label="Vibración" checked={data.sinVibracion} onToggle={() => toggleBool('sinVibracion')} />
          </View>

          <View style={globalStyles.divider} />
          <Text style={globalStyles.subsectionTitle}>
            Describa el tipo de ruido:
          </Text>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Tronido" checked={data.tipoTronido} onToggle={() => toggleBool('tipoTronido')} />
            <CheckboxItem label="Silbido" checked={data.tipoSilbido} onToggle={() => toggleBool('tipoSilbido')} />
            <CheckboxItem label="Chillido" checked={data.tipoChillido} onToggle={() => toggleBool('tipoChillido')} />
            <CheckboxItem label="Zumbido" checked={data.tipoZumbido} onToggle={() => toggleBool('tipoZumbido')} />
            <CheckboxItem label="Golpeteo" checked={data.tipoGolpeteo} onToggle={() => toggleBool('tipoGolpeteo')} />
            <CheckboxItem label="Golpe ligero" checked={data.tipoGolpeLigero} onToggle={() => toggleBool('tipoGolpeLigero')} />
            <CheckboxItem label="Chasquido" checked={data.tipoChasquido} onToggle={() => toggleBool('tipoChasquido')} />
            <CheckboxItem label="Traqueteo" checked={data.tipoTraqueteo} onToggle={() => toggleBool('tipoTraqueteo')} />
            <CheckboxItem label="Retumbo" checked={data.tipoRetumbo} onToggle={() => toggleBool('tipoRetumbo')} />
            <CheckboxItem label="Sonido metálico" checked={data.tipoSonidoMetalico} onToggle={() => toggleBool('tipoSonidoMetalico')} />
            <CheckboxItem label="Rugido" checked={data.tipoRugido} onToggle={() => toggleBool('tipoRugido')} />
            <CheckboxItem label="Chirrido" checked={data.tipoChirrido} onToggle={() => toggleBool('tipoChirrido')} />
            <CheckboxItem label="Ruido sordo" checked={data.tipoRuidoSordo} onToggle={() => toggleBool('tipoRuidoSordo')} />
            <CheckboxItem label="Rechinido" checked={data.tipoRechinido} onToggle={() => toggleBool('tipoRechinido')} />
          </View>

          {/* Botón ver definiciones */}
          <TouchableOpacity
            style={styles.defBtn}
            onPress={() => setShowDefiniciones(v => !v)}
          >
            <Text style={styles.defBtnText}>
              {showDefiniciones ? '▲ Ocultar definiciones' : '▼ Ver definiciones de ruido'}
            </Text>
          </TouchableOpacity>
          {showDefiniciones && (
            <View style={styles.defContainer}>
              {DEFINICIONES_RUIDO.map(d => (
                <View key={d.term} style={styles.defRow}>
                  <Text style={styles.defTerm}>{d.term}:  </Text>
                  <Text style={styles.defText}>{d.def}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── ¿Cuándo se presenta? ── */}
        <SectionHeader title="¿Cuándo se presenta?" />
        <View style={globalStyles.card}>
          <CheckboxItem label="Cuando el vehículo no se mueve (el motor está encendido)" checked={data.cuandoEstatico} onToggle={() => toggleBool('cuandoEstatico')} />
          <CheckboxItem label="Cuando el vehículo está en movimiento" checked={data.cuandoEnMovimiento} onToggle={() => toggleBool('cuandoEnMovimiento')} />
          {data.cuandoEnMovimiento && (
            <View style={{ paddingLeft: spacing.lg }}>
              <CheckboxItem label="A velocidad crucero" checked={data.cuandoVelocidadCrucero} onToggle={() => toggleBool('cuandoVelocidadCrucero')} />
              <CheckboxItem label="Durante el frenado" checked={data.cuandoFrenado} onToggle={() => toggleBool('cuandoFrenado')} />
              <CheckboxItem label="Durante la aceleración" checked={data.cuandoAceleracion} onToggle={() => toggleBool('cuandoAceleracion')} />
              <CheckboxItem label="Al girar la dirección" checked={data.cuandoGiroDireccion} onToggle={() => toggleBool('cuandoGiroDireccion')} />
              <CheckboxItem label="Durante la desaceleración" checked={data.cuandoDesaceleracion} onToggle={() => toggleBool('cuandoDesaceleracion')} />
            </View>
          )}

          <FormInput label="¿A qué velocidad se presenta?" value={data.velocidadKmh} onChangeText={t => set({ velocidadKmh: t })} placeholder="0" keyboardType="numeric" suffix="Km/h" />
          <FormInput label="¿A qué régimen del motor se presenta?" value={data.regimenRPM} onChangeText={t => set({ regimenRPM: t })} placeholder="0" keyboardType="numeric" suffix="RPM" />
        </View>

        {/* ── Origen ── */}
        <SectionHeader title="¿De dónde proviene el ruido/vibración?" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Dentro del vehículo" checked={data.origenDentro} onToggle={() => toggleBool('origenDentro')} />
            <CheckboxItem label="Fuera del vehículo" checked={data.origenFuera} onToggle={() => toggleBool('origenFuera')} />
          </View>
        </View>

        {/* ── Condiciones de camino ── */}
        <SectionHeader title="Condiciones de camino" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Caminos pavimentados (suave)" checked={data.caminoPavimentadoSuave} onToggle={() => toggleBool('caminoPavimentadoSuave')} />
            <CheckboxItem label="Camino húmedo" checked={data.caminoHumedo} onToggle={() => toggleBool('caminoHumedo')} />
            <CheckboxItem label="Caminos pavimentados (rugoso)" checked={data.caminoPavimentadoRugoso} onToggle={() => toggleBool('caminoPavimentadoRugoso')} />
            <CheckboxItem label="Camino irregular" checked={data.caminoIrregular} onToggle={() => toggleBool('caminoIrregular')} />
          </View>
          <FormInput label="Otros:" value={data.caminoOtros} onChangeText={t => set({ caminoOtros: t })} placeholder="" />
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

          <FormInput
            label="¿Alguna otra condición bajo la cual la condición ocurre o empeora?"
            value={data.otrasCondiciones}
            onChangeText={t => set({ otrasCondiciones: t })}
            placeholder="Describe aquí..."
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      <View style={globalStyles.navigationContainer}>
        <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.btnSecondaryText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.btnPrimary} onPress={() => navigation.navigate('SistemaElectrico')}>
          <Text style={globalStyles.btnPrimaryText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defBtn: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  defBtnText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  defContainer: {
    marginTop: spacing.sm,
    backgroundColor: colors.offWhite,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
  },
  defRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  defTerm: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  defText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default S04_RuidoVibracion;
