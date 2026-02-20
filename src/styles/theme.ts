import { StyleSheet, TextStyle } from 'react-native';

// ─── Paleta Hyundai ───────────────────────────────────────────────────────────
export const colors = {
  primary: '#002C5F',      // Hyundai azul oscuro
  primaryLight: '#003F88',
  secondary: '#00AAD2',    // Hyundai azul claro
  accent: '#C8102E',       // Rojo Hyundai
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  lightGray: '#F0F2F5',
  gray: '#9E9E9E',
  darkGray: '#424242',
  border: '#DEE2E6',
  borderLight: '#EAECEF',
  text: '#212121',
  textSecondary: '#616161',
  error: '#C62828',
  success: '#2E7D32',
  divider: '#E9ECEF',
  checkboxActive: '#002C5F',
  shadowColor: 'rgba(0,44,95,0.10)',
  headerBg: '#002C5F',
  sectionBg: '#E8EEF7',
};

// ─── Espaciado ────────────────────────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ─── Bordes redondeados ───────────────────────────────────────────────────────
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// ─── Tipografía ───────────────────────────────────────────────────────────────
export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  base: 15,
  lg: 16,
  xl: 18,
  xxl: 22,
};

export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

// ─── Estilos globales ─────────────────────────────────────────────────────────
export const globalStyles = StyleSheet.create({
  // Contenedores
  screen: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContent: {
    paddingBottom: spacing.xl + spacing.md,
  },
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  // Tipografía
  screenTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    flex: 1,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  subsectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.darkGray,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  label: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  body: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },

  // Separadores
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },

  // Utilidades de layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Barra de navegación inferior
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 4,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginRight: spacing.sm,
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.3,
  },
  btnSecondaryText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.3,
  },

  // Indicador de progreso
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.offWhite,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 3,
  },
  progressDotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 3,
  },
  progressDotDone: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginHorizontal: 3,
  },
});
