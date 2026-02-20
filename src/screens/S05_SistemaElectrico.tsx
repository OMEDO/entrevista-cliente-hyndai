import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { globalStyles } from '../styles/theme';
import PageHeader from '../components/PageHeader';
import SectionHeader from '../components/SectionHeader';
import CheckboxItem from '../components/CheckboxItem';
import FormInput from '../components/FormInput';
import { useSistemaElectricoController } from '../controllers/sistemaElectrico.controller';

type Props = NativeStackScreenProps<RootStackParamList, 'SistemaElectrico'>;

const S05_SistemaElectrico = ({ navigation }: Props) => {
  const { data, set, toggleBool } = useSistemaElectricoController();

  return (
    <View style={globalStyles.screen}>
      <PageHeader currentStep={5} totalSteps={7} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.container, globalStyles.scrollContent]}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Síntoma ── */}
        <SectionHeader title="Sistema Eléctrico" subtitle="Síntoma" />
        <View style={globalStyles.card}>
          <CheckboxItem label="El Sistema no enciende / no se apaga" checked={data.sinNoEnciende} onToggle={() => toggleBool('sinNoEnciende')} />
          <CheckboxItem label="El Sistema está completamente inactivo" checked={data.sinInactivo} onToggle={() => toggleBool('sinInactivo')} />
          <FormInput
            label="Otro:"
            value={data.sinOtro}
            onChangeText={t => set({ sinOtro: t })}
            placeholder="Describe el síntoma"
          />
        </View>

        {/* ── Frecuencia ── */}
        <SectionHeader title="¿Con qué frecuencia se presenta?" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Siempre" checked={data.frecSiempre} onToggle={() => toggleBool('frecSiempre')} />
            <CheckboxItem label="Rara vez" checked={data.frecRaraVez} onToggle={() => toggleBool('frecRaraVez')} />
            <CheckboxItem label="A veces" checked={data.frecAVeces} onToggle={() => toggleBool('frecAVeces')} />
            <CheckboxItem label="Acaba de iniciar la condición" checked={data.frecAcabaIniciar} onToggle={() => toggleBool('frecAcabaIniciar')} />
          </View>
        </View>

        {/* ── ¿Cuándo ocurre? ── */}
        <SectionHeader title="¿Cuándo ocurre la condición?" />
        <View style={globalStyles.card}>
          <View style={globalStyles.rowWrap}>
            <CheckboxItem label="Llave IGN / motor apagado" checked={data.cuandoLlaveApagado} onToggle={() => toggleBool('cuandoLlaveApagado')} />
            <CheckboxItem label="Primer recorrido del día" checked={data.cuandoPrimerRecorrido} onToggle={() => toggleBool('cuandoPrimerRecorrido')} />
            <CheckboxItem label="Llave IGN / motor encendido" checked={data.cuandoLlaveEncendido} onToggle={() => toggleBool('cuandoLlaveEncendido')} />
            <CheckboxItem label="Después de manejo continuo" checked={data.cuandoDespuesManejo} onToggle={() => toggleBool('cuandoDespuesManejo')} />
          </View>
        </View>

        {/* ── Clima ── */}
        <SectionHeader title="Condiciones del clima" />
        <View style={globalStyles.card}>
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
        </View>
      </ScrollView>

      <View style={globalStyles.navigationContainer}>
        <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.btnSecondaryText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.btnPrimary} onPress={() => navigation.navigate('ServiciosRelacionados')}>
          <Text style={globalStyles.btnPrimaryText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default S05_SistemaElectrico;
