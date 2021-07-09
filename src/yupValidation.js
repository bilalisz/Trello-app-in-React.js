import * as yup from "yup";

let validationsForm = yup.object().shape({
  title: yup.string().min(4).max(20).required("Title is required"),
  description: yup.string().min(4).max(50).required("description is required"),
  assign: yup
    .string()
    .min(4)
    .max(20)
    .required("Places select any name to assign"),
});

export default validationsForm;
