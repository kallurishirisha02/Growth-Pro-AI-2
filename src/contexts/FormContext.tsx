import { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  name: string;
  location: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
  clearFormData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
  });

  const clearFormData = () => {
    setFormData({ name: '', location: '' });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, clearFormData }}>
      {children}
    </FormContext.Provider>
  );
};