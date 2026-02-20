#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo "▶ Creando carpeta de assets..."
mkdir -p android/app/src/main/assets

echo "▶ Generando bundle de JS..."
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res

echo "▶ Compilando APK..."
cd android && ./gradlew assembleDebug

echo ""
echo "✅ APK generado en:"
echo "   android/app/build/outputs/apk/debug/app-debug.apk"

# Copiar a la raíz del proyecto
cp "$PROJECT_DIR/android/app/build/outputs/apk/debug/app-debug.apk" "$PROJECT_DIR/EntrevistaClienteHyundai.apk"
echo "   (también copiado como EntrevistaClienteHyundai.apk en la raíz)"
