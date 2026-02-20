/**
 * transmision.controller.ts
 * Lógica específica de la sección Transmisión.
 */

import { useForm } from '../context/FormContext';
import { TransmisionData } from '../types/form.types';

export const useTransmisionController = () => {
  const { formData, updateSection } = useForm();
  const data = formData.transmision;

  const set = (partial: Partial<TransmisionData>) =>
    updateSection('transmision', partial);

  const toggleBool = (key: keyof TransmisionData) => {
    const val = data[key];
    if (typeof val === 'boolean') {
      set({ [key]: !val } as Partial<TransmisionData>);
    }
  };

  return { data, set, toggleBool };
};
