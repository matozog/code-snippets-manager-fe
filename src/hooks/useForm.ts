import { FormikValues, useFormik } from 'formik';
import { AnyObject, ObjectSchema } from 'yup';

export interface IFormService<K extends FormikValues> {
  formikProps: ReturnType<typeof useFormik<K>>;
}

export const useForm = <T extends FormikValues>(
  defaultValue: T,
  validationSchema: ObjectSchema<AnyObject>,
  onSubmit: (values: T) => void,
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
