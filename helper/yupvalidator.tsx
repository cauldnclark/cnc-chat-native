// Yup = validator
import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

export const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain at least 1 Uppercase, a Number and a Special Character"
    ),
});
