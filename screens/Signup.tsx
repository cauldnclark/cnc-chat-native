import React, { useState } from "react";
// Formik = form
import { Formik } from "formik";
// Validator
import { signUpValidationSchema } from "../helper/yupvalidator";
// Components
import { ActivityIndicator, ToastAndroid } from "react-native";
import { MonoText } from "../components/StyledText";
import { Div, Text, Button } from "react-native-magnus";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import CustomTextInput from "../components/CustomTextInput";
// Types
import { signupNavigationProp } from "../types";
// API
const endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:";
const api_key = "AIzaSyDuMzWJCOWzgHPLr2YJIVsuUUONb7GdeC0";
const SIGN_UP_URL = endpoint + "signUp?key=" + api_key;

// FIXME: For now, SignUp will only register emailAddress and password
// FIXME: onSubmitEditing={() => onFocus.focus()} on every CustomTextInput
const SignUp = ({ navigation }: signupNavigationProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  // let onFocus: any

  if (isLoading) {
    return (
      <Div flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" color="#2ED573" />
      </Div>
    );
  }

  return (
    <KeyboardAvoidingWrapper>
      <Div px={20} py={200}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
          }}
          validateOnMount={true}
          onSubmit={(values) => {
            const enteredEmail = values.emailAddress;
            const enteredPassword = values.password;

            setIsLoading(true);

            fetch(SIGN_UP_URL, {
              method: "POST",
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                setIsLoading(false);

                if (response.ok) {
                  return response.json();
                } else {
                  return response.json().then((data) => {
                    let errorMessage = "Authentication failed!";

                    if (data && data.error && data.error.message) {
                      errorMessage = data.error.message;
                    }

                    throw new Error(errorMessage);
                  });
                }
              })
              .then((data) => {
                // successful request
                ToastAndroid.show("Sign-up Successful!", 5000);
                navigation.navigate("Login");
              })
              .catch((error) => {
                alert(error.message);
              });
          }}
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
            <Div flex={1} alignItems="center" justifyContent="center">
              <MonoText style={{ fontSize: 20 }}>Sign-up</MonoText>
              <Div mt={30} w="80%">
                <CustomTextInput
                  mb={10}
                  icon="person"
                  placeholder="First Name"
                  placeholderTextColor="black"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />

                {errors.firstName && touched.firstName && (
                  <MonoText
                    style={{
                      marginBottom: 5,
                      marginLeft: 30,
                      color: "red",
                    }}
                  >
                    {errors.firstName}
                  </MonoText>
                )}

                <CustomTextInput
                  mb={10}
                  icon="person"
                  placeholder="Last Name"
                  placeholderTextColor="black"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />

                {errors.lastName && touched.lastName && (
                  <MonoText
                    style={{
                      marginBottom: 5,
                      marginLeft: 30,
                      color: "red",
                    }}
                  >
                    {errors.lastName}
                  </MonoText>
                )}

                <CustomTextInput
                  mb={10}
                  icon="mail"
                  placeholder="Email Address"
                  placeholderTextColor="black"
                  onChangeText={handleChange("emailAddress")}
                  onBlur={handleBlur("emailAddress")}
                  value={values.emailAddress}
                />

                {errors.emailAddress && touched.emailAddress && (
                  <MonoText
                    style={{
                      marginBottom: 5,
                      marginLeft: 30,
                      color: "red",
                    }}
                  >
                    {errors.emailAddress}
                  </MonoText>
                )}

                <CustomTextInput
                  mb={10}
                  icon="lock"
                  placeholder="Password"
                  placeholderTextColor="black"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={showPassword}
                  isPassword={true}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                {errors.password && touched.password && (
                  <MonoText
                    style={{
                      marginBottom: 5,
                      marginLeft: 30,
                      color: "red",
                    }}
                  >
                    {errors.password}
                  </MonoText>
                )}
                <Button
                  w="100%"
                  mt={20}
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                >
                  <MonoText style={{ fontSize: 18, color: "white" }}>
                    Submit
                  </MonoText>
                </Button>

                <Div mt={30}>
                  <MonoText style={{ marginTop: 20 }}>
                    Already have an account?{" "}
                    <Text
                      color="salmon"
                      fontWeight="bold"
                      onPress={() => navigation.navigate("Login")}
                    >
                      Login.
                    </Text>
                  </MonoText>
                </Div>
              </Div>
            </Div>
          )}
        </Formik>
      </Div>
    </KeyboardAvoidingWrapper>
  );
};

export default SignUp;
