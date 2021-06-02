import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Div, Text, Input, Icon, Button } from "react-native-magnus";

const loginValidationSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // let onFocus: any;
  const initialValues = { emailAddress: "", password: "" };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      onSubmit={(values) => alert(JSON.stringify(values))}
      validationSchema={loginValidationSchema}
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
        <Div
          flex={1}
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Div w="80%">
            <Text fontSize="6xl" fontWeight="bold" mb={10}>
              Login
            </Text>
            <Text mb={30}>
              Don't have an account yet? Create your account, it takes less than
              a minute
            </Text>
          </Div>
          <Div w="80%">
            <Input
              mb={20}
              placeholder="Email Address"
              value={values.emailAddress}
              onChangeText={handleChange("emailAddress")}
              onBlur={handleBlur("emailAddress")}
              // onSubmitEditing={() => onFocus.focus()}
            />
            {/* TODO: Validation for email*/}
            {errors.emailAddress && touched.emailAddress && (
              <Text fontSize="xl" fontWeight="bold" color="red">
                {errors.emailAddress}
              </Text>
            )}
            <Input
              mb={30}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              // onSubmitEditing={() => onFocus.focus()}
              secureTextEntry={!showPassword}
            />
            {/* FIXME: Add Icons for viewing password and icon checks when input is valid */}
            {/* <Icon
              name={showPassword ? "eye-off" : "eye"}
              // onPress={() => setShowPassword(!showPassword)}
            /> */}
            {/* TODO: Validation for password */}
            {errors.password && touched.password && (
              <Text fontSize="xl" fontWeight="bold" color="red">
                {errors.password}
              </Text>
            )}
            <Button onPress={handleSubmit} disabled={!isValid}>
              Log in
            </Button>
          </Div>
        </Div>
      )}
    </Formik>
  );
}
