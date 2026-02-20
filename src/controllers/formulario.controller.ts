/**
 * formulario.controller.ts
 * Utilidades y lógica compartida entre todas las secciones del formulario.
 */

import { FormData } from '../types/form.types';

// ─── Helpers de toggle ────────────────────────────────────────────────────────
/** Alterna un valor booleano dentro de un objeto de estado. */
export const toggle = <T extends Record<string, unknown>>(
  state: T,
  key: keyof T,
): Partial<T> => ({ [key]: !state[key] } as Partial<T>);

// ─── Formateo de fecha ────────────────────────────────────────────────────────
export const formatDate = (date: Date): string => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const todayString = (): string => formatDate(new Date());

// ─── Validación básica de Header ──────────────────────────────────────────────
export interface HeaderValidation {
  isValid: boolean;
  errors: string[];
}

export const validateHeader = (
  header: FormData['header'],
): HeaderValidation => {
  const errors: string[] = [];
  if (!header.nombreCliente.trim()) {
    errors.push('El nombre del cliente es requerido.');
  }
  if (!header.asesorTecnico.trim()) {
    errors.push('El asesor técnico es requerido.');
  }
  return { isValid: errors.length === 0, errors };
};

// ─── Resumen de sección (para vista previa del PDF) ───────────────────────────
export const getCheckedLabels = (
  obj: Record<string, unknown>,
  labelMap: Record<string, string>,
): string[] =>
  Object.entries(obj)
    .filter(([key, val]) => val === true && labelMap[key])
    .map(([key]) => labelMap[key]);
