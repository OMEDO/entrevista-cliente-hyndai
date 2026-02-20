/**
 * pdfGenerator.service.ts
 * Genera un PDF que replica la estructura del documento original
 * "Hoja de Entrevista al Cliente – Hyundai" (4 páginas).
 */

import { generatePDF } from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { FormData } from '../types/form.types';

// ─── Helpers de renderizado ───────────────────────────────────────────────────

const cb = (v: boolean) =>
  `<span class="cb ${v ? 'cb-on' : 'cb-off'}"></span>`;

const yn = (v: boolean | null) =>
  `${cb(v === true)}&nbsp;Sí&nbsp;&nbsp;&nbsp;${cb(v === false)}&nbsp;No`;

const fieldVal = (v: string, width = '100px') =>
  `<span class="fv" style="min-width:${width}">${v || '&nbsp;'}</span>`;

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ─── CSS global ───────────────────────────────────────────────────────────────

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8.5pt;
  color: #1a1a1a;
  padding: 14px;
}

/* ── Checkboxes ── */
.cb {
  display: inline-block;
  width: 11px; height: 11px;
  border: 1.4px solid #555;
  vertical-align: middle;
  margin-right: 3px;
  position: relative;
  flex-shrink: 0;
}
.cb-on { background: #002C5F; border-color: #002C5F; }
.cb-on::after {
  content: '';
  position: absolute;
  left: 2px; top: -1px;
  width: 5px; height: 8px;
  border: 1.8px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(40deg);
}

/* ── Campos de texto ── */
.fv {
  border-bottom: 1px solid #555;
  display: inline-block;
  padding: 0 2px;
  min-height: 14px;
  vertical-align: bottom;
  font-weight: 600;
  color: #002C5F;
}

/* ── Header de página ── */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2.5px solid #002C5F;
  padding-bottom: 6px;
  margin-bottom: 8px;
}
.brand {
  font-size: 22pt;
  font-weight: 900;
  color: #002C5F;
  letter-spacing: 2px;
  line-height: 1;
}
.form-title {
  font-size: 11pt;
  font-weight: bold;
  color: #002C5F;
  margin-top: 3px;
}
.meta-block { text-align: right; font-size: 7.5pt; }
.meta-row { margin-bottom: 3px; }
.meta-row .fv { min-width: 130px; }

/* ── Sección wrapper ── */
.section-wrap {
  display: flex;
  border: 1px solid #aaa;
  border-radius: 2px;
  margin-bottom: 7px;
  overflow: hidden;
}
.section-label {
  background: #002C5F;
  color: white;
  font-weight: bold;
  font-size: 7.5pt;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  padding: 6px 3px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.5px;
}
.section-body { flex: 1; padding: 7px 9px; }

/* ── Dos columnas ── */
.two-col { display: flex; gap: 0; }
.col-l {
  flex: 1;
  padding-right: 8px;
  border-right: 1px solid #ddd;
}
.col-r { flex: 1; padding-left: 8px; }

/* ── Títulos internos ── */
.st {
  font-weight: bold;
  font-size: 8pt;
  color: #002C5F;
  margin-top: 7px;
  margin-bottom: 3px;
  display: block;
}
.st-first { margin-top: 0; }

/* ── Ítems de checkbox ── */
.ci { display: block; margin-bottom: 2.5px; line-height: 1.45; }
.cr { display: inline-flex; align-items: center; margin-right: 10px; margin-bottom: 2.5px; white-space: nowrap; }
.cb-wrap { display: flex; flex-wrap: wrap; gap: 2px 0; }

/* ── Tablas ── */
.veh-table { width: 100%; border-collapse: collapse; }
.veh-table td { padding: 3px 5px; vertical-align: middle; }
.veh-row-sep td { border-top: 1px solid #ddd; }

.srv-table { width: 100%; border-collapse: collapse; font-size: 7.5pt; }
.srv-table th {
  background: #002C5F; color: white;
  padding: 4px 5px; text-align: left;
  font-size: 7pt; font-weight: bold;
}
.srv-table td {
  border: 1px solid #ccc;
  padding: 4px 5px;
  min-height: 36px;
  vertical-align: top;
}

/* ── Definiciones ── */
.def-section {
  border-top: 1px solid #ccc;
  margin-top: 8px;
  padding-top: 6px;
}
.def-title {
  font-weight: bold;
  font-size: 8pt;
  color: #002C5F;
  text-align: center;
  margin-bottom: 5px;
}
.def-table { display: flex; gap: 10px; font-size: 7pt; }
.def-col { flex: 1; }
.def-item { margin-bottom: 3px; line-height: 1.35; }
.def-term { font-weight: bold; color: #002C5F; }

/* ── Separador ── */
.divider { border: none; border-top: 1px solid #ddd; margin: 5px 0; }

/* ── Notas ── */
.note-line {
  border-bottom: 1px solid #999;
  min-height: 26px;
  padding: 3px 2px;
  font-size: 9pt;
}

/* ── Salto de página ── */
.page-break { page-break-after: always; }
`;

// ─── Header (común en las 4 páginas) ─────────────────────────────────────────

const renderHeader = (h: FormData['header']) => `
<div class="page-header">
  <div>
    <div class="brand">&#9837; HYUNDAI</div>
    <div class="form-title">Hoja de Entrevista al Cliente</div>
  </div>
  <div class="meta-block">
    <div class="meta-row">Fecha de inicio de caso: ${fieldVal(h.fechaInicioCaso)}</div>
    <div class="meta-row">Nombre del Cliente ${fieldVal(h.nombreCliente)}</div>
    <div class="meta-row">No. De orden de reparación ${fieldVal(h.noOrdenReparacion)}</div>
    <div class="meta-row">Asesor Técnico ${fieldVal(h.asesorTecnico)}</div>
  </div>
</div>`;

// ─── Página 1 ─────────────────────────────────────────────────────────────────

const renderPage1 = (d: FormData): string => {
  const v = d.informacionVehiculo;
  const m = d.maniobrabilidadMotor;
  const t = d.transmision;

  return `
${renderHeader(d.header)}

<!-- ── Información del Vehículo ── -->
<div class="section-wrap">
  <div class="section-label">Información del vehículo</div>
  <div class="section-body">
    <table class="veh-table">
      <tr>
        <td>VIN ${fieldVal(v.vin, '140px')}</td>
        <td>Modelo: ${fieldVal(v.modelo, '90px')}</td>
        <td>¿Es el cliente el conductor principal? &nbsp;${yn(v.esConductorPrincipal)}</td>
      </tr>
      <tr class="veh-row-sep">
        <td>Acciones de Servicio abiertas: &nbsp;${yn(v.accionesServicioAbiertas)}</td>
        <td colspan="2">Fecha de vencimiento de la garantía: ${fieldVal(v.fechaVencimientoGarantia || '&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;', '90px')}</td>
      </tr>
      <tr class="veh-row-sep">
        <td>¿Está la condición presente? &nbsp;${yn(v.condicionPresente)}</td>
        <td>¿Equipo NO original? &nbsp;${yn(v.equipoNoOriginal)}</td>
        <td>¿El vehículo ha tenido Siniestros? &nbsp;${yn(v.haTenicSiniestros)}</td>
      </tr>
    </table>
  </div>
</div>

<!-- ── Maniobrabilidad del Motor ── -->
<div class="section-wrap">
  <div class="section-label">Maniobrabilidad del Motor</div>
  <div class="section-body">
    <div class="two-col">
      <div class="col-l">
        <span class="st st-first">Síntoma</span>
        <span class="ci">${cb(m.sinNoArranca)} No arranca</span>
        <span class="ci">${cb(m.sinDificultadArranque)} Dificultad al arrancar o no arranca pero gira el motor</span>
        <span class="ci">${cb(m.sinMarcaMinimaAspera)} Marcha mínima áspera</span>
        <span class="ci">${cb(m.sinMarcaMinimaAlta)} Marcha mínima muy alta (acelerada)</span>
        <span class="ci">${cb(m.sinMotorInestable)} Marcha del motor inestable o temblorosa</span>
        <span class="ci">${cb(m.sinMotorSuena)} Marcha del motor suena o golpetea</span>
        <span class="ci">${cb(m.sinRPMsFluctuan)} RPMs fluctúan sin acelerar</span>
        <span class="ci">${cb(m.sinDetonaciones)} Marcha del motor ruido de detonaciones / cascabeleo</span>
        <span class="ci">${cb(m.sinMotorSigueMarcha)} Motor sigue en marcha al apagarlo</span>
        <span class="ci">${cb(m.sinBajoRendimiento)} Bajo rendimiento de combustible ${m.sinBajoRendimiento ? fieldVal(m.sinBajoRendimientoKmL, '40px') + ' Km/L' : ''}</span>
        <span class="ci">${cb(m.sinOtro)} Otro: ${m.sinOtro ? fieldVal(escape(m.sinOtroDesc)) : ''}</span>

        <span class="st">Frecuencia del síntoma</span>
        <span class="ci">${cb(m.frecTodoMomento)} Todo momento</span>
        <span class="ci">${cb(m.frecAlgunasVeces)} Algunas veces</span>
        <span class="ci">${cb(m.frecRaraVez)} Rara vez</span>
        <span class="ci">${cb(m.frecAcabaIniciar)} Acaba de iniciar la condición</span>
      </div>
      <div class="col-r">
        <span class="st st-first">¿Cuándo ocurre?</span>
        <span class="st" style="font-size:7.5pt;margin-top:0">Temperatura del motor:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(m.tempEnFrio)} En frío</span>
          <span class="cr">${cb(m.tempAlCalentarse)} Al calentarse</span>
          <span class="cr">${cb(m.tempNormal)} Normal</span>
          <span class="cr">${cb(m.tempCaliente)} Caliente</span>
          <span class="cr">${cb(m.tempTodoTiempo)} Todo el tiempo</span>
        </div>
        ${m.tempOtro ? `<span class="ci">Otro: ${fieldVal(escape(m.tempOtro))}</span>` : ''}

        <span class="st">Condiciones del clima:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(m.climaCaluroso)} Caluroso, soleado</span>
          <span class="cr">${cb(m.climaFrio)} Frío, fresco</span>
          <span class="cr">${cb(m.climaHumedo)} Húmedo, lluvia</span>
        </div>
        ${m.climaOtro ? `<span class="ci">Otro: ${fieldVal(escape(m.climaOtro))}</span>` : ''}

        <span class="st">Condiciones de manejo:</span>
        <span class="ci">${cb(m.manejoAlAcelerar)} Al acelerar:
          &nbsp;${cb(m.acelerarFuerte)} Fuerte
          &nbsp;${cb(m.acelerarMedio)} Medio
          &nbsp;${cb(m.acelerarLigero)} Ligero
        </span>
        <span class="ci">${cb(m.manejoAlDesacelerar)} Al desacelerar</span>
        <span class="ci">${cb(m.manejoEstableCrucero)} Estable – Crucero</span>

        <span class="st">Tipo de combustible</span>
        <div class="cb-wrap">
          <span class="cr">${cb(m.combustibleMagna)} Magna</span>
          <span class="cr">${cb(m.combustiblePremium)} Premium</span>
        </div>
        ${m.marcaCombustible ? `<span class="ci">Marca: ${fieldVal(escape(m.marcaCombustible))}</span>` : '<span class="ci">Marca del combustible: <span class="fv" style="min-width:80px">&nbsp;</span></span>'}
        <span class="ci">¿A qué velocidad se presenta? ${fieldVal(m.velocidadKmh || '', '50px')} Km/h</span>
        <span class="ci">¿A qué régimen del motor se presenta? ${fieldVal(m.regimenRPM || '', '50px')} rpm</span>
      </div>
    </div>
  </div>
</div>

<!-- ── Transmisión ── -->
<div class="section-wrap">
  <div class="section-label">Transmisión</div>
  <div class="section-body">
    <div class="two-col">
      <div class="col-l">
        <span class="st st-first">Síntoma (ATM/iVT/DCT)</span>
        <span class="ci">${cb(t.atmNoCambiosAdecuados)} El vehículo no hace cambios adecuadamente</span>
        <span class="ci">${cb(t.atmGolpea)} Golpea al cambiar de velocidad</span>
        <span class="ci">${cb(t.atmDeslizamiento)} Deslizamiento (incrementan las RPM del motor)</span>
        <span class="ci">${cb(t.atmNoCambio)} No hace ningún cambio de velocidad</span>
        <span class="ci">${cb(t.atmArranqueOtroRango)} El motor arranca en otro rango que no es "P" o "N"</span>
        <span class="ci">${cb(t.atmFugasRuidos)} Fugas o ruidos inusuales (Tronidos, traqueteos, golpes, etc.)</span>
        <span class="ci">${cb(t.atmSobremarcha)} Sobremarcha no funciona:</span>
        <span class="ci" style="padding-left:14px">${cb(t.atmNoCambioSobremarcha)} No hace el cambio a sobremarcha</span>
        <span class="ci" style="padding-left:14px">${cb(t.atmAcoplaDesacopla)} Acopla y desacopla la sobremarcha</span>
        <span class="ci" style="padding-left:14px">${cb(t.atmNoFuncionaControlVel)} No funciona con el control de velocidad activado, pero funciona en otras condiciones</span>
        <span class="ci">${cb(t.atmModoSeguridad)} Se encuentra en modo de seguridad</span>

        <span class="st">¿Cuándo ocurre?</span>
        <span style="font-size:7.5pt">Cuando el selector de velocidad está en:</span>
        <div class="cb-wrap" style="margin-top:3px">
          <span class="cr">${cb(t.selectorP)} P</span>
          <span class="cr">${cb(t.selectorR)} R</span>
          <span class="cr">${cb(t.selectorN)} N</span>
          <span class="cr">${cb(t.selectorD)} D</span>
          <span class="cr">${cb(t.selectorMas)} +</span>
          <span class="cr">${cb(t.selectorMenos)} -</span>
        </div>
        <span style="font-size:7.5pt; display:block; margin-top:4px">Entre las velocidades:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(t.entVelocidades12)} 1 &amp; 2</span>
          <span class="cr">${cb(t.entVelocidades23)} 2 &amp; 3</span>
          <span class="cr">${cb(t.entVelocidadesOtra)} Otra</span>
        </div>
        <span style="font-size:7.5pt; display:block; margin-top:4px">Cuando el interruptor de over-drive está:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(t.overdrivOn)} On</span>
          <span class="cr">${cb(t.overdriveOff)} Off</span>
          <span class="cr">${cb(t.overdriveAmbas)} Ambas</span>
        </div>
      </div>
      <div class="col-r">
        <span class="st st-first">Síntoma (MT)</span>
        <span class="ci">${cb(t.mtVibracionesRuido)} Vibraciones y ruido</span>
        <span class="ci">${cb(t.mtDificultadCambio)} Dificultad para cambio de velocidad</span>

        <span class="st">Temperatura de motor:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(t.mtTempFrio)} Frío</span>
          <span class="cr">${cb(t.mtTempAlCalentarse)} Al calentarse</span>
          <span class="cr">${cb(t.mtTempNormal)} Normal</span>
          <span class="cr">${cb(t.mtTempCaliente)} Caliente</span>
          <span class="cr">${cb(t.mtTempTodoTiempo)} Todo el tiempo</span>
        </div>
        ${t.mtTempOtro ? `<span class="ci">Otro: ${fieldVal(escape(t.mtTempOtro))}</span>` : ''}

        <span class="st">Condiciones del clima:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(t.mtClimaDiasCalurosos)} Solo días calurosos</span>
          <span class="cr">${cb(t.mtClimaDiasFrios)} Solo en días fríos</span>
          <span class="cr">${cb(t.mtClimaHumedo)} Húmedo/lluvia</span>
        </div>
        ${t.mtClimaOtro ? `<span class="ci">Otro: ${fieldVal(escape(t.mtClimaOtro))}</span>` : ''}

        <span class="st">Condiciones de manejo: Aceleración</span>
        <div class="cb-wrap">
          <span class="cr">${cb(t.mtManejoFuerte)} Fuerte</span>
          <span class="cr">${cb(t.mtManejoMedia)} Media</span>
          <span class="cr">${cb(t.mtManejoLigera)} Ligera</span>
        </div>
        <span class="ci">${cb(t.mtManejoDesacelerar)} Al desacelerar</span>
        <span class="ci">${cb(t.mtManejoEstableCrucero)} Estable-Crucero</span>
        <span class="ci">¿A qué velocidad se presenta? ${fieldVal(t.mtVelocidadKmh || '', '50px')} Km/h</span>
        <span class="ci">¿A qué régimen del motor se presenta? ${fieldVal(t.mtRegimenRPM || '', '50px')} RPM</span>

        <span class="st">¿Con qué frecuencia se presenta?</span>
        <div class="cb-wrap">
          <span class="cr">${cb(t.frecSiempre)} Siempre</span>
          <span class="cr">${cb(t.frecRaraVez)} Rara vez</span>
          <span class="cr">${cb(t.frecAlgunasVeces)} Algunas veces</span>
          <span class="cr">${cb(t.frecAcabaIniciar)} Acaba de iniciar la condición</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

// ─── Página 2: Ruido & Vibración ──────────────────────────────────────────────

const renderPage2 = (d: FormData): string => {
  const r = d.ruidoVibracion;

  return `
${renderHeader(d.header)}

<div class="section-wrap">
  <div class="section-label">Ruido &amp; Vibración</div>
  <div class="section-body">
    <div class="two-col">
      <div class="col-l">
        <span class="st st-first">Síntoma</span>
        <div class="cb-wrap">
          <span class="cr">${cb(r.sinRuido)} Ruido</span>
          <span class="cr">${cb(r.sinVibracion)} Vibración</span>
        </div>

        <span class="st">Describa el tipo de ruido <span style="font-size:7pt;font-weight:normal">(Vea las siguientes definiciones de ruido)</span></span>
        <table style="width:100%;font-size:7.5pt;border-collapse:collapse">
          <tr>
            <td style="padding:1.5px 4px 1.5px 0">${cb(r.tipoTronido)} Tronido</td>
            <td style="padding:1.5px 4px 1.5px 0">${cb(r.tipoSilbido)} Silbido</td>
            <td style="padding:1.5px 0">${cb(r.tipoChillido)} Chillido</td>
          </tr>
          <tr>
            <td style="padding:1.5px 4px">${cb(r.tipoZumbido)} Zumbido</td>
            <td style="padding:1.5px 4px">${cb(r.tipoGolpeteo)} Golpeteo</td>
            <td style="padding:1.5px 0">${cb(r.tipoGolpeLigero)} Golpe ligero</td>
          </tr>
          <tr>
            <td style="padding:1.5px 4px">${cb(r.tipoChasquido)} Chasquido</td>
            <td style="padding:1.5px 4px">${cb(r.tipoTraqueteo)} Traqueteo</td>
            <td style="padding:1.5px 0">${cb(r.tipoRetumbo)} Retumbo</td>
          </tr>
          <tr>
            <td style="padding:1.5px 4px">${cb(r.tipoSonidoMetalico)} Son. metálico</td>
            <td style="padding:1.5px 4px">${cb(r.tipoRugido)} Rugido</td>
            <td style="padding:1.5px 0">${cb(r.tipoChirrido)} Chirrido</td>
          </tr>
          <tr>
            <td style="padding:1.5px 4px">${cb(r.tipoRuidoSordo)} Ruido sordo</td>
            <td style="padding:1.5px 4px">${cb(r.tipoRechinido)} Rechinido</td>
            <td></td>
          </tr>
        </table>

        <span class="st">¿De dónde proviene el ruido/vibración?</span>
        <span style="font-size:7.5pt;display:block;margin-bottom:3px">Describa la ubicación del ruido y márquela en el esquema:</span>
        <div class="cb-wrap">
          <span class="cr">${cb(r.origenDentro)} Dentro del vehículo</span>
          <span class="cr">${cb(r.origenFuera)} Fuera del vehículo</span>
        </div>
        <!-- Placeholder esquema del vehículo -->
        <div style="border:1px solid #ccc;height:70px;margin:5px 0;display:flex;align-items:center;justify-content:center;color:#999;font-size:7pt">
          [ Diagrama del vehículo – marque la ubicación del ruido ]
        </div>
      </div>
      <div class="col-r">
        <span class="st st-first">¿Cuándo se presenta?</span>
        <span class="ci">${cb(r.cuandoEstatico)} Cuando el vehículo no se mueve (el motor está encendido)</span>
        <span class="ci">${cb(r.cuandoEnMovimiento)} Cuando el vehículo está en movimiento</span>
        <div style="padding-left:12px">
          <span class="cr">${cb(r.cuandoVelocidadCrucero)} A velocidad crucero</span>
          <span class="cr">${cb(r.cuandoFrenado)} Durante el frenado</span>
          <span class="ci">${cb(r.cuandoAceleracion)} Durante la aceleración</span>
          <span class="cr">${cb(r.cuandoGiroDireccion)} Al girar la dirección</span>
          <span class="ci">${cb(r.cuandoDesaceleracion)} Durante la desaceleración</span>
        </div>
        <span class="ci">¿A qué velocidad se presenta? ${fieldVal(r.velocidadKmh || '', '50px')} Km/h</span>
        <span class="ci">¿A qué régimen del motor se presenta? ${fieldVal(r.regimenRPM || '', '50px')} RPM</span>

        <span class="st">Condiciones de camino</span>
        <div class="cb-wrap">
          <span class="cr">${cb(r.caminoPavimentadoSuave)} Caminos pavimentados (suave)</span>
          <span class="cr">${cb(r.caminoHumedo)} Camino húmedo</span>
          <span class="cr">${cb(r.caminoPavimentadoRugoso)} Caminos pavimentados (rugoso)</span>
          <span class="cr">${cb(r.caminoIrregular)} Camino irregular</span>
        </div>
        ${r.caminoOtros ? `<span class="ci">Otros: ${fieldVal(escape(r.caminoOtros))}</span>` : ''}

        <span class="st">¿Con qué frecuencia se presenta?</span>
        <div class="cb-wrap">
          <span class="cr">${cb(r.frecSiempre)} Siempre</span>
          <span class="cr">${cb(r.frecRaraVez)} Rara vez</span>
          <span class="cr">${cb(r.frecAlgunasVeces)} Algunas veces</span>
          <span class="cr">${cb(r.frecAcabaIniciar)} Acaba de iniciar la condición</span>
        </div>

        ${r.otrasCondiciones ? `
        <span class="st">¿Alguna otra condición bajo la cual la condición ocurre o empeora?</span>
        <p style="font-size:8pt;border-bottom:1px solid #ccc;padding-bottom:3px">${escape(r.otrasCondiciones)}</p>
        ` : `
        <span class="st">¿Alguna otra condición bajo la cual la condición ocurre o empeora?</span>
        <div style="border-bottom:1px solid #999;min-height:18px"></div>
        <div style="border-bottom:1px solid #999;min-height:18px;margin-top:4px"></div>
        `}
      </div>
    </div>

    <!-- Definiciones de Ruido -->
    <div class="def-section">
      <div class="def-title">Definiciones de Ruido</div>
      <div class="def-table">
        <div class="def-col">
          <div class="def-item"><span class="def-term">Tronido.-</span> Estruendo o estrépito de cualquier cosa.</div>
          <div class="def-item"><span class="def-term">Zumbido.-</span> Ruido áspero, continuado y monótono que produce molestia, usualmente relacionado a vibraciones.</div>
          <div class="def-item"><span class="def-term">Chasquido.-</span> Ruido seco y súbito que se produce cuando se rompe o resquebraja una cosa.</div>
          <div class="def-item"><span class="def-term">Sonido metálico.-</span> Ruido de contacto entre metales, pudiera ser golpeteo o roce.</div>
          <div class="def-item"><span class="def-term">Ruido sordo.-</span> Ruido metálico muy fuerte, similar al golpe de un martillo.</div>
          <div class="def-item"><span class="def-term">Silbido.-</span> Ruido abrasivo que se produce con el roce de dos elementos.</div>
          <div class="def-item"><span class="def-term">Golpeteo.-</span> Sucesión de golpes poco fuertes pero continuos.</div>
        </div>
        <div class="def-col">
          <div class="def-item"><span class="def-term">Traqueteo.-</span> Ruidos continuos que genera una cosa que se golpea con el movimiento.</div>
          <div class="def-item"><span class="def-term">Rugido.-</span> Sonido intenso y prolongado producido por ciertas cosas, como el rugido de un león.</div>
          <div class="def-item"><span class="def-term">Rechinido.-</span> Producir o causar un sonido, generalmente desagradable, producido por rozar una cosa con otra.</div>
          <div class="def-item"><span class="def-term">Chillido.-</span> Sonido agudo y estridente.</div>
          <div class="def-item"><span class="def-term">Golpe ligero.-</span> Ruido de contacto entre dos o más elementos que es apenas perceptible.</div>
          <div class="def-item"><span class="def-term">Retumbo.-</span> Resonar mucho o hacer gran ruido o estruendo una cosa.</div>
          <div class="def-item"><span class="def-term">Chirrido.-</span> Sonido agudo, continuado y desagradable producido por algo que roza o que está mal engrasado.</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

// ─── Página 3: Sistema Eléctrico + Servicios ─────────────────────────────────

const renderPage3 = (d: FormData): string => {
  const e = d.sistemaElectrico;
  const s = d.serviciosRelacionados;

  return `
${renderHeader(d.header)}

<!-- ── Sistema Eléctrico ── -->
<div class="section-wrap">
  <div class="section-label">Sistema Eléctrico</div>
  <div class="section-body">
    <span class="st st-first">Síntoma</span>
    <span class="ci">${cb(e.sinNoEnciende)} El Sistema no enciende / no se apaga</span>
    <span class="ci">${cb(e.sinInactivo)} El Sistema está completamente inactivo</span>
    <span class="ci">Otro ${e.sinOtro ? fieldVal(escape(e.sinOtro)) : '<span class="fv" style="min-width:200px">&nbsp;</span>'}</span>

    <div style="display:flex;gap:20px;margin-top:6px">
      <div>
        <span class="st" style="margin-top:0">¿Con qué frecuencia se presenta?</span>
        <div class="cb-wrap">
          <span class="cr">${cb(e.frecSiempre)} Siempre</span>
          <span class="cr">${cb(e.frecRaraVez)} Rara vez</span>
          <span class="cr">${cb(e.frecAVeces)} A veces</span>
          <span class="cr">${cb(e.frecAcabaIniciar)} Acaba de iniciar la condición</span>
        </div>
      </div>
      <div>
        <span class="st" style="margin-top:0">¿Cuándo ocurre la condición?</span>
        <div class="cb-wrap">
          <span class="cr">${cb(e.cuandoLlaveApagado)} Llave IGN / motor apagado</span>
          <span class="cr">${cb(e.cuandoPrimerRecorrido)} Primer recorrido del día</span>
          <span class="cr">${cb(e.cuandoLlaveEncendido)} Llave IGN / motor encendido</span>
          <span class="cr">${cb(e.cuandoDespuesManejo)} Después de manejo continuo</span>
        </div>
      </div>
      <div>
        <span class="st" style="margin-top:0">Condiciones del clima</span>
        <div class="cb-wrap">
          <span class="cr">${cb(e.climaCaluroso)} Caluroso, soleado</span>
          <span class="cr">${cb(e.climaFrio)} Frío, fresco</span>
          <span class="cr">${cb(e.climaHumedo)} Húmedo, lluvia</span>
          ${e.climaOtro ? `<span class="cr">${cb(true)} ${escape(e.climaOtro)}</span>` : `<span class="ci">Otro <span class="fv" style="min-width:80px">&nbsp;</span></span>`}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ── Servicios Relacionados ── -->
<div class="section-wrap">
  <div class="section-label">Servicios relacionados a la condición (revisiones anteriores)</div>
  <div class="section-body">
    <table class="srv-table">
      <thead>
        <tr>
          <th style="width:5%"># Síntoma</th>
          <th style="width:30%">Descripción del síntoma</th>
          <th style="width:13%">Fecha de atención (Día)</th>
          <th style="width:9%">Hora</th>
          <th style="width:20%">Técnico a cargo (Nombre)</th>
          <th style="width:23%">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        ${s.servicios.map(sv => `
        <tr>
          <td style="height:44px">${escape(sv.sintomaNum)}</td>
          <td>${escape(sv.descripcion)}</td>
          <td>${escape(sv.dia)}</td>
          <td>${escape(sv.hora)}</td>
          <td>${escape(sv.tecnicoNombre)}</td>
          <td>${escape(sv.observaciones)}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`;
};

// ─── Página 4: Notas y Esquemas ───────────────────────────────────────────────

const renderPage4 = (d: FormData): string => {
  const texto = d.notasEsquemas.notas;
  const lineas = texto ? texto.split('\n') : [];
  const totalLineas = Math.max(lineas.length, 10);
  const linesHtml = Array.from({ length: totalLineas }, (_, i) =>
    `<div class="note-line">${lineas[i] ? escape(lineas[i]) : '&nbsp;'}</div>`,
  ).join('');

  return `
${renderHeader(d.header)}

<div class="section-wrap">
  <div class="section-label">Notas y esquemas</div>
  <div class="section-body">
    ${linesHtml}
  </div>
</div>`;
};

// ─── HTML completo ────────────────────────────────────────────────────────────

export const buildPDFHtml = (formData: FormData): string => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoja de Entrevista al Cliente – Hyundai</title>
  <style>${CSS}</style>
</head>
<body>
  ${renderPage1(formData)}
  <div class="page-break"></div>
  ${renderPage2(formData)}
  <div class="page-break"></div>
  ${renderPage3(formData)}
  <div class="page-break"></div>
  ${renderPage4(formData)}
</body>
</html>`;

// ─── Genera y comparte el PDF ─────────────────────────────────────────────────

export const generateAndSharePDF = async (formData: FormData): Promise<void> => {
  const html = buildPDFHtml(formData);

  const clientName = formData.header.nombreCliente.trim().replace(/\s+/g, '_') || 'cliente';
  const timestamp = new Date().toISOString().slice(0, 10);
  const fileName = `Entrevista_Hyundai_${clientName}_${timestamp}`;

  const file = await generatePDF({
    html,
    fileName,
    directory: 'Documents',
    base64: false,
  });

  if (!file.filePath) {
    throw new Error('No se pudo generar el PDF.');
  }

  await Share.open({
    url: `file://${file.filePath}`,
    type: 'application/pdf',
    title: 'Hoja de Entrevista – Hyundai',
    failOnCancel: false,
  });
};
