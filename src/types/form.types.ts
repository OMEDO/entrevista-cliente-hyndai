// ─── Header (compartido en todas las secciones) ─────────────────────────────
export interface HeaderData {
  fechaInicioCaso: string;
  nombreCliente: string;
  noOrdenReparacion: string;
  asesorTecnico: string;
}

// ─── Sección 1: Información del Vehículo ─────────────────────────────────────
export interface InformacionVehiculoData {
  vin: string;
  modelo: string;
  esConductorPrincipal: boolean | null;
  accionesServicioAbiertas: boolean | null;
  fechaVencimientoGarantia: string;
  condicionPresente: boolean | null;
  equipoNoOriginal: boolean | null;
  haTenicSiniestros: boolean | null;
}

// ─── Sección 2: Maniobrabilidad del Motor ────────────────────────────────────
export interface ManiobrabilidadMotorData {
  // Síntomas
  sinNoArranca: boolean;
  sinDificultadArranque: boolean;
  sinMarcaMinimaAspera: boolean;
  sinMarcaMinimaAlta: boolean;
  sinMotorInestable: boolean;
  sinMotorSuena: boolean;
  sinRPMsFluctuan: boolean;
  sinDetonaciones: boolean;
  sinMotorSigueMarcha: boolean;
  sinBajoRendimiento: boolean;
  sinBajoRendimientoKmL: string;
  sinOtro: boolean;
  sinOtroDesc: string;
  // Frecuencia
  frecTodoMomento: boolean;
  frecAlgunasVeces: boolean;
  frecRaraVez: boolean;
  frecAcabaIniciar: boolean;
  // Temperatura del motor
  tempEnFrio: boolean;
  tempAlCalentarse: boolean;
  tempNormal: boolean;
  tempCaliente: boolean;
  tempTodoTiempo: boolean;
  tempOtro: string;
  // Condiciones del clima
  climaCaluroso: boolean;
  climaFrio: boolean;
  climaHumedo: boolean;
  climaOtro: string;
  // Condiciones de manejo
  manejoAlAcelerar: boolean;
  acelerarFuerte: boolean;
  acelerarMedio: boolean;
  acelerarLigero: boolean;
  manejoAlDesacelerar: boolean;
  manejoEstableCrucero: boolean;
  // Combustible
  combustibleMagna: boolean;
  combustiblePremium: boolean;
  marcaCombustible: string;
  velocidadKmh: string;
  regimenRPM: string;
}

// ─── Sección 3: Transmisión ──────────────────────────────────────────────────
export interface TransmisionData {
  // ATM / iVT / DCT
  atmNoCambiosAdecuados: boolean;
  atmGolpea: boolean;
  atmDeslizamiento: boolean;
  atmNoCambio: boolean;
  atmArranqueOtroRango: boolean;
  atmFugasRuidos: boolean;
  atmSobremarcha: boolean;
  atmNoCambioSobremarcha: boolean;
  atmAcoplaDesacopla: boolean;
  atmNoFuncionaControlVel: boolean;
  atmModoSeguridad: boolean;
  // Selector de velocidad
  selectorP: boolean;
  selectorR: boolean;
  selectorN: boolean;
  selectorD: boolean;
  selectorMas: boolean;
  selectorMenos: boolean;
  entVelocidades12: boolean;
  entVelocidades23: boolean;
  entVelocidadesOtra: boolean;
  overdrivOn: boolean;
  overdriveOff: boolean;
  overdriveAmbas: boolean;
  // MT – Síntomas
  mtVibracionesRuido: boolean;
  mtDificultadCambio: boolean;
  // MT – Temperatura
  mtTempFrio: boolean;
  mtTempAlCalentarse: boolean;
  mtTempNormal: boolean;
  mtTempCaliente: boolean;
  mtTempTodoTiempo: boolean;
  mtTempOtro: string;
  // MT – Clima
  mtClimaDiasCalurosos: boolean;
  mtClimaDiasFrios: boolean;
  mtClimaHumedo: boolean;
  mtClimaOtro: string;
  // MT – Condiciones de manejo
  mtManejoFuerte: boolean;
  mtManejoMedia: boolean;
  mtManejoLigera: boolean;
  mtManejoDesacelerar: boolean;
  mtManejoEstableCrucero: boolean;
  mtVelocidadKmh: string;
  mtRegimenRPM: string;
  // Frecuencia
  frecSiempre: boolean;
  frecRaraVez: boolean;
  frecAlgunasVeces: boolean;
  frecAcabaIniciar: boolean;
}

// ─── Sección 4: Ruido & Vibración ────────────────────────────────────────────
export interface RuidoVibracionData {
  sinRuido: boolean;
  sinVibracion: boolean;
  // Tipo de ruido
  tipoTronido: boolean;
  tipoSilbido: boolean;
  tipoChillido: boolean;
  tipoZumbido: boolean;
  tipoGolpeteo: boolean;
  tipoGolpeLigero: boolean;
  tipoChasquido: boolean;
  tipoTraqueteo: boolean;
  tipoRetumbo: boolean;
  tipoSonidoMetalico: boolean;
  tipoRugido: boolean;
  tipoChirrido: boolean;
  tipoRuidoSordo: boolean;
  tipoRechinido: boolean;
  // Cuándo se presenta
  cuandoEstatico: boolean;
  cuandoEnMovimiento: boolean;
  cuandoVelocidadCrucero: boolean;
  cuandoFrenado: boolean;
  cuandoAceleracion: boolean;
  cuandoGiroDireccion: boolean;
  cuandoDesaceleracion: boolean;
  velocidadKmh: string;
  regimenRPM: string;
  // Origen
  origenDentro: boolean;
  origenFuera: boolean;
  // Condiciones de camino
  caminoPavimentadoSuave: boolean;
  caminoHumedo: boolean;
  caminoPavimentadoRugoso: boolean;
  caminoIrregular: boolean;
  caminoOtros: string;
  // Frecuencia
  frecSiempre: boolean;
  frecRaraVez: boolean;
  frecAlgunasVeces: boolean;
  frecAcabaIniciar: boolean;
  otrasCondiciones: string;
}

// ─── Sección 5: Sistema Eléctrico ────────────────────────────────────────────
export interface SistemaElectricoData {
  sinNoEnciende: boolean;
  sinInactivo: boolean;
  sinOtro: string;
  // Frecuencia
  frecSiempre: boolean;
  frecRaraVez: boolean;
  frecAVeces: boolean;
  frecAcabaIniciar: boolean;
  // Cuándo ocurre
  cuandoLlaveApagado: boolean;
  cuandoPrimerRecorrido: boolean;
  cuandoLlaveEncendido: boolean;
  cuandoDespuesManejo: boolean;
  // Clima
  climaCaluroso: boolean;
  climaFrio: boolean;
  climaHumedo: boolean;
  climaOtro: string;
}

// ─── Sección 6: Servicios Relacionados ───────────────────────────────────────
export interface ServicioAnterior {
  sintomaNum: string;
  descripcion: string;
  dia: string;
  hora: string;
  tecnicoNombre: string;
  observaciones: string;
}

export interface ServiciosRelacionadosData {
  servicios: ServicioAnterior[];
}

// ─── Sección 7: Notas y Esquemas ─────────────────────────────────────────────
export interface NotasEsquemasData {
  notas: string;
}

// ─── Forma completa ──────────────────────────────────────────────────────────
export interface FormData {
  header: HeaderData;
  informacionVehiculo: InformacionVehiculoData;
  maniobrabilidadMotor: ManiobrabilidadMotorData;
  transmision: TransmisionData;
  ruidoVibracion: RuidoVibracionData;
  sistemaElectrico: SistemaElectricoData;
  serviciosRelacionados: ServiciosRelacionadosData;
  notasEsquemas: NotasEsquemasData;
}

// ─── Estado inicial ───────────────────────────────────────────────────────────
export const initialFormData: FormData = {
  header: {
    fechaInicioCaso: '',
    nombreCliente: '',
    noOrdenReparacion: '',
    asesorTecnico: '',
  },
  informacionVehiculo: {
    vin: '',
    modelo: '',
    esConductorPrincipal: null,
    accionesServicioAbiertas: null,
    fechaVencimientoGarantia: '',
    condicionPresente: null,
    equipoNoOriginal: null,
    haTenicSiniestros: null,
  },
  maniobrabilidadMotor: {
    sinNoArranca: false, sinDificultadArranque: false, sinMarcaMinimaAspera: false,
    sinMarcaMinimaAlta: false, sinMotorInestable: false, sinMotorSuena: false,
    sinRPMsFluctuan: false, sinDetonaciones: false, sinMotorSigueMarcha: false,
    sinBajoRendimiento: false, sinBajoRendimientoKmL: '', sinOtro: false, sinOtroDesc: '',
    frecTodoMomento: false, frecAlgunasVeces: false, frecRaraVez: false, frecAcabaIniciar: false,
    tempEnFrio: false, tempAlCalentarse: false, tempNormal: false, tempCaliente: false,
    tempTodoTiempo: false, tempOtro: '',
    climaCaluroso: false, climaFrio: false, climaHumedo: false, climaOtro: '',
    manejoAlAcelerar: false, acelerarFuerte: false, acelerarMedio: false, acelerarLigero: false,
    manejoAlDesacelerar: false, manejoEstableCrucero: false,
    combustibleMagna: false, combustiblePremium: false, marcaCombustible: '',
    velocidadKmh: '', regimenRPM: '',
  },
  transmision: {
    atmNoCambiosAdecuados: false, atmGolpea: false, atmDeslizamiento: false,
    atmNoCambio: false, atmArranqueOtroRango: false, atmFugasRuidos: false,
    atmSobremarcha: false, atmNoCambioSobremarcha: false, atmAcoplaDesacopla: false,
    atmNoFuncionaControlVel: false, atmModoSeguridad: false,
    selectorP: false, selectorR: false, selectorN: false, selectorD: false,
    selectorMas: false, selectorMenos: false,
    entVelocidades12: false, entVelocidades23: false, entVelocidadesOtra: false,
    overdrivOn: false, overdriveOff: false, overdriveAmbas: false,
    mtVibracionesRuido: false, mtDificultadCambio: false,
    mtTempFrio: false, mtTempAlCalentarse: false, mtTempNormal: false,
    mtTempCaliente: false, mtTempTodoTiempo: false, mtTempOtro: '',
    mtClimaDiasCalurosos: false, mtClimaDiasFrios: false, mtClimaHumedo: false, mtClimaOtro: '',
    mtManejoFuerte: false, mtManejoMedia: false, mtManejoLigera: false,
    mtManejoDesacelerar: false, mtManejoEstableCrucero: false,
    mtVelocidadKmh: '', mtRegimenRPM: '',
    frecSiempre: false, frecRaraVez: false, frecAlgunasVeces: false, frecAcabaIniciar: false,
  },
  ruidoVibracion: {
    sinRuido: false, sinVibracion: false,
    tipoTronido: false, tipoSilbido: false, tipoChillido: false, tipoZumbido: false,
    tipoGolpeteo: false, tipoGolpeLigero: false, tipoChasquido: false, tipoTraqueteo: false,
    tipoRetumbo: false, tipoSonidoMetalico: false, tipoRugido: false, tipoChirrido: false,
    tipoRuidoSordo: false, tipoRechinido: false,
    cuandoEstatico: false, cuandoEnMovimiento: false, cuandoVelocidadCrucero: false,
    cuandoFrenado: false, cuandoAceleracion: false, cuandoGiroDireccion: false,
    cuandoDesaceleracion: false,
    velocidadKmh: '', regimenRPM: '',
    origenDentro: false, origenFuera: false,
    caminoPavimentadoSuave: false, caminoHumedo: false, caminoPavimentadoRugoso: false,
    caminoIrregular: false, caminoOtros: '',
    frecSiempre: false, frecRaraVez: false, frecAlgunasVeces: false, frecAcabaIniciar: false,
    otrasCondiciones: '',
  },
  sistemaElectrico: {
    sinNoEnciende: false, sinInactivo: false, sinOtro: '',
    frecSiempre: false, frecRaraVez: false, frecAVeces: false, frecAcabaIniciar: false,
    cuandoLlaveApagado: false, cuandoPrimerRecorrido: false,
    cuandoLlaveEncendido: false, cuandoDespuesManejo: false,
    climaCaluroso: false, climaFrio: false, climaHumedo: false, climaOtro: '',
  },
  serviciosRelacionados: {
    servicios: [
      { sintomaNum: '', descripcion: '', dia: '', hora: '', tecnicoNombre: '', observaciones: '' },
      { sintomaNum: '', descripcion: '', dia: '', hora: '', tecnicoNombre: '', observaciones: '' },
      { sintomaNum: '', descripcion: '', dia: '', hora: '', tecnicoNombre: '', observaciones: '' },
    ],
  },
  notasEsquemas: {
    notas: '',
  },
};
