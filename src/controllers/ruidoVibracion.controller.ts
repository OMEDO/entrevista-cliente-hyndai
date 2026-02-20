/**
 * ruidoVibracion.controller.ts
 * Lógica específica de la sección Ruido & Vibración.
 */

import { useForm } from '../context/FormContext';
import { RuidoVibracionData } from '../types/form.types';

export const DEFINICIONES_RUIDO: { term: string; def: string }[] = [
  { term: 'Tronido', def: 'Estruendo o estrépito de cualquier cosa.' },
  { term: 'Zumbido', def: 'Ruido áspero, continuado y monótono que produce molestia, usualmente relacionado a vibraciones.' },
  { term: 'Chasquido', def: 'Ruido seco y súbito que se produce cuando se rompe o resquebraja una cosa.' },
  { term: 'Sonido metálico', def: 'Ruido de contacto entre metales, pudiera ser golpeteo o roce.' },
  { term: 'Ruido sordo', def: 'Ruido metálico muy fuerte, similar al golpe de un martillo.' },
  { term: 'Silbido', def: 'Ruido abrasivo que se produce con el roce de dos elementos.' },
  { term: 'Golpeteo', def: 'Sucesión de golpes poco fuertes pero continuos.' },
  { term: 'Traqueteo', def: 'Ruidos continuos que genera una cosa que se golpea con el movimiento.' },
  { term: 'Rugido', def: 'Sonido intenso y prolongado producido por ciertas cosas.' },
  { term: 'Rechinido', def: 'Producir o causar un sonido generalmente desagradable, producido por rozar una cosa con otra.' },
  { term: 'Chillido', def: 'Sonido agudo y estridente.' },
  { term: 'Golpe ligero', def: 'Ruido de contacto entre dos o más elementos que es apenas perceptible.' },
  { term: 'Retumbo', def: 'Resonar mucho o hacer gran ruido o estruendo una cosa.' },
  { term: 'Chirrido', def: 'Sonido agudo, continuado y desagradable producido por algo que roza o que está mal engrasado.' },
];

export const useRuidoVibracionController = () => {
  const { formData, updateSection } = useForm();
  const data = formData.ruidoVibracion;

  const set = (partial: Partial<RuidoVibracionData>) =>
    updateSection('ruidoVibracion', partial);

  const toggleBool = (key: keyof RuidoVibracionData) => {
    const val = data[key];
    if (typeof val === 'boolean') {
      set({ [key]: !val } as Partial<RuidoVibracionData>);
    }
  };

  return { data, set, toggleBool };
};
