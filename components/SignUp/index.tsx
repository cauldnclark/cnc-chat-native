import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Div, Text, Input, Icon, Button } from "react-native-magnus";

const signUpValidationSchema = yup.object().shape({
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
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  // let onFocus: any;
  const initialValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      onSubmit={(values) => alert(JSON.stringify(values))}
      validationSchema={signUpValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        // FIXME:
        <Div flex={1} alignItems="center" justifyContent="center">
          <Text fontSize="6xl" fontWeight="bold" mb={20}>
            Sign-up
          </Text>
          {/* FIXME: Add label(by default, it is not visible) and transition is from inside input field */}
          {/* to on top of input field */}
          {/* TODO: Add Icons */}
          <Div w="80%">
            <Input
              mb={10}
              placeholder="First name"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              // onSubmitEditing={() => onFocus.focus()}
            />

            {errors.firstName && touched.firstName && (
              <Text fontSize="xl" fontWeight="bold" color="red">
                {errors.firstName}
              </Text>
            )}

            <Input
              mb={10}
              placeholder="Last name"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              // onSubmitEditing={() => onFocus.focus()}
            />

            {errors.lastName && touched.lastName && (
              <Text fontSize="xl" fontWeight="bold" color="red">
                {errors.lastName}
              </Text>
            )}

            <Input
              mb={10}
              placeholder="Email Address"
              value={values.emailAddress}
              onChangeText={handleChange("emailAddress")}
              onBlur={handleBlur("emailAddress")}
              // onSubmitEditing={() => onFocus.focus()}
            />

            {errors.emailAddress && touched.emailAddress && (
              <Text fontSize="xl" fontWeight="bold" color="red">
                {errors.emailAddress}
              </Text>
            )}

            <Input
              mb={10}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              // onSubmitEditing={() => onFocus.focus()}
            />

            {errors.password && touched.password && (
              <Text fontSize="xl" fontWeight="bold" color="red">
                {errors.password}
              </Text>
            )}
            <Button w="100%" onPress={handleSubmit}>
              Submit
            </Button>
          </Div>
        </Div>
      )}
    </Formik>
  );
}
