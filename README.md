# Entrevista Cliente Hyundai

Aplicación móvil **Android** en React Native que digitaliza la *Hoja de Entrevista al Cliente* de Hyundai. El asesor técnico captura los síntomas del vehículo en 7 pantallas y genera un PDF con la misma estructura del documento oficial para compartir por WhatsApp, correo, Drive, etc.

## Características

- 7 pantallas de formulario (una por sección del documento oficial)
- Sin login, sin base de datos — los datos viven en memoria durante la sesión
- Generación de PDF en 4 páginas con el formato y branding de Hyundai
- Compartir el PDF directamente desde el dispositivo (WhatsApp, Drive, Bluetooth, etc.)

## Secciones del formulario

| # | Pantalla | Contenido |
|---|---|---|
| 1 | Información del Vehículo | VIN, modelo, preguntas sí/No |
| 2 | Maniobrabilidad del Motor | Síntomas, frecuencia, temperatura, clima, combustible |
| 3 | Transmisión | Síntomas ATM/iVT/DCT y MT, selector, condiciones |
| 4 | Ruido & Vibración | 14 tipos de ruido, origen, cuándo, condiciones de camino |
| 5 | Sistema Eléctrico | Síntomas, frecuencia, cuándo ocurre, clima |
| 6 | Servicios Relacionados | Historial de hasta 3 revisiones anteriores |
| 7 | Notas y Esquemas | Texto libre + botón Generar PDF |

---

## Requisitos previos

| Herramienta | Versión |
|---|---|
| Node.js | ≥ 22.11.0 |
| JDK | 21 (el que incluye Android Studio) |
| Android Studio | Hedgehog o superior |
| Android SDK | API 33+ |

### Variables de entorno (agregar a `~/.zshrc` o `~/.bash_profile`)

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
```

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/omedo/entrevista-cliente-hyndai.git
cd entrevista-cliente-hyndai

# 2. Instalar dependencias JS
npm install

# 3. Crear archivo local de SDK (requerido por Gradle, solo la primera vez)
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

---

## Correr en desarrollo

### Paso 1 — Iniciar Metro (bundler JS)

```bash
npm start
```

### Paso 2 — Compilar e instalar en Android

En otra terminal:

```bash
npm run android
```

> Si el comando anterior falla por problemas de PATH/entorno, usa el build manual de Gradle (ver sección siguiente).

---

## Build manual con Gradle

```bash
# Compilar el APK de debug
JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
ANDROID_HOME="$HOME/Library/Android/sdk" \
PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$ANDROID_HOME/platform-tools:$PATH" \
./android/gradlew -p android assembleDebug
```

El APK queda en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Instalar en dispositivo/emulador conectado:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Instalar APK directamente en un celular (sin cable de datos)

1. Habilitar **Fuentes desconocidas** → Ajustes → Seguridad → Instalar apps desconocidas
2. Transferir el APK al teléfono (Drive, WhatsApp, cable, etc.)
3. Abrir el archivo `.apk` en el dispositivo y aceptar la instalación

---

## Estructura del proyecto

```
src/
├── types/
│   ├── form.types.ts               # Interfaces de todo el formulario + initialFormData
│   └── modules.d.ts                # Declaraciones para módulos nativos sin tipos
├── styles/
│   └── theme.ts                    # Paleta Hyundai (#002C5F) + estilos globales
├── context/
│   └── FormContext.tsx             # Estado global, hook useForm()
├── controllers/
│   ├── formulario.controller.ts    # Utilidades compartidas
│   ├── motor.controller.ts
│   ├── transmision.controller.ts
│   ├── ruidoVibracion.controller.ts
│   ├── sistemaElectrico.controller.ts
│   └── serviciosRelacionados.controller.ts
├── components/
│   ├── CheckboxItem.tsx
│   ├── RadioGroup.tsx
│   ├── FormInput.tsx
│   ├── SectionHeader.tsx
│   └── PageHeader.tsx
├── screens/
│   ├── S01_InformacionVehiculo.tsx
│   ├── S02_ManiobrabilidadMotor.tsx
│   ├── S03_Transmision.tsx
│   ├── S04_RuidoVibracion.tsx
│   ├── S05_SistemaElectrico.tsx
│   ├── S06_ServiciosRelacionados.tsx
│   └── S07_NotasEsquemas.tsx
├── navigation/
│   └── AppNavigator.tsx
└── services/
    └── pdfGenerator.service.ts     # HTML → PDF + Share sheet
```

---

## Notas técnicas

- **React Native 0.84** con New Architecture (Fabric / TurboModules) activa
- **Gradle 8.13** — la versión 9.x rompe la compatibilidad con RN 0.84
- `react-native-html-to-pdf@1.3.0` usa export nombrado: `import { generatePDF } from 'react-native-html-to-pdf'`
- La configuración del FileProvider para compartir PDFs está en `android/app/src/main/res/xml/share_download_paths.xml`

---

## Troubleshooting

| Problema | Solución |
|---|---|
| `Java Runtime not found` | Configurar `JAVA_HOME` apuntando al JBR de Android Studio |
| `JvmVendorSpec.IBM_SEMERU` error en build | Bajar Gradle a 8.13 en `android/gradle/wrapper/gradle-wrapper.properties` |
| `Cannot read property 'convert' of undefined` | Usar el import nombrado `{ generatePDF }` de `react-native-html-to-pdf` v1.3.0 |
| Share sheet no aparece / NullPointerException | Verificar que existe `android/app/src/main/res/xml/share_download_paths.xml` con `external-files-path` |
| `SDK location not found` | Crear `android/local.properties` con `sdk.dir=/ruta/a/tu/Android/sdk` |
