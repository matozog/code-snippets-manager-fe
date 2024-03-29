import { FormikValues, useFormik } from 'formik';

export interface IFormService<K extends FormikValues> {
  formikProps: ReturnType<typeof useFormik<K>>;
}

export const useForm = <T extends FormikValues>(
  defaultValue: T,
  validationSchema: any,
  onSubmit: (values: T) => void
): IFormService<T> => {
  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return {
    formikProps: formik,
  };
};
