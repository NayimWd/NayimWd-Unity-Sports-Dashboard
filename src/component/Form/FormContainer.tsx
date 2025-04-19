import React from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormContainerProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: React.ReactNode;
}

const FormContainer = <T extends FieldValues>({
  methods,
  onSubmit,
  className,
  children,
}: FormContainerProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormContainer;
