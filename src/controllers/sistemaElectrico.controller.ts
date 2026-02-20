/**
 * sistemaElectrico.controller.ts
 * Lógica específica de la sección Sistema Eléctrico.
 */

import { useForm } from '../context/FormContext';
import { SistemaElectricoData } from '../types/form.types';

export const useSistemaElectricoController = () => {
  const { formData, updateSection } = useForm();
  const data = formData.sistemaElectrico;

  const set = (partial: Partial<SistemaElectricoData>) =>
    updateSection('sistemaElectrico', partial);

  const toggleBool = (key: keyof SistemaElectricoData) => {
    const val = data[key];
    if (typeof val === 'boolean') {
      set({ [key]: !val } as Partial<SistemaElectricoData>);
    }
  };

  return { data, set, toggleBool };
};
