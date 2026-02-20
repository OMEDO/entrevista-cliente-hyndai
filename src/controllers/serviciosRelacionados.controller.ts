/**
 * serviciosRelacionados.controller.ts
 * Lógica específica de la sección Servicios Relacionados (revisiones anteriores).
 */

import { useForm } from '../context/FormContext';
import { ServicioAnterior } from '../types/form.types';

export const useServiciosRelacionadosController = () => {
  const { formData, updateSection } = useForm();
  const data = formData.serviciosRelacionados;

  const updateServicio = (index: number, partial: Partial<ServicioAnterior>) => {
    const updated = data.servicios.map((s, i) =>
      i === index ? { ...s, ...partial } : s,
    );
    updateSection('serviciosRelacionados', { servicios: updated });
  };

  return { data, updateServicio };
};
