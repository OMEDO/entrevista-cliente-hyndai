import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, initialFormData } from '../types/form.types';

interface FormContextType {
  formData: FormData;
  updateSection: <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateSection = <K extends keyof FormData>(
    section: K,
    data: Partial<FormData[K]>,
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const resetForm = () => setFormData(initialFormData);

  return (
    <FormContext.Provider value={{ formData, updateSection, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm debe usarse dentro de <FormProvider>');
  }
  return context;
};
