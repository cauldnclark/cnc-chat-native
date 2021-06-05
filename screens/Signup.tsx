// FIXME: For now, SignUp will only register emailAddress and password
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

// formik = form
import { Formik } from "formik";

// yup = validator
import * as yup from "yup";

// icons
import { Octicons, Ionicons } from "@expo/vector-icons";

// Components
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { MonoText } from "../components/StyledText";
import { Div, Text, Input, Button } from "react-native-magnus";

// API
const endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:";
const api_key = "AIzaSyDuMzWJCOWzgHPLr2YJIVsuUUONb7GdeC0";
const SIGN_UP_URL = endpoint + "signUp?key=" + api_key;

// Schema validator
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
      "Must contain at least 1 Uppercase, a Number and a Special Character"
    ),
});

type navigationProp = {
  navigation: any;
};

const SignUp = ({ navigation }: navigationProp) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  // let onFocus: any

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
                // setIsLoading to false regardless of the result after sending the request
                // FIXME: Spinner/loading here

                if (response.ok) {
                  return response.json();
                } else {
                  return response.json().then((data) => {
                    // show an error modal
                    let errorMessage = "Registration failed!";

                    if (data && data.error && data.error.message) {
                      errorMessage = data.error.message;
                    }

                    throw new Error(errorMessage);
                  });
                }
              })
              .then(() => {
                alert("Registration Successful");
                // Upon successful signup, automatically navigate to login screen after 3s
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 3000);
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
            // FIXME:
            <Div flex={1} alignItems="center" justifyContent="center">
              <MonoText style={{ fontSize: 20 }}>Sign-up</MonoText>
              {/* FIXME: Add label(by default, it is not visible) and transition is from inside input field */}
              {/* to on top of input field */}
              {/* TODO: Add Icons */}
              <Div mt={30} w="80%">
                <SignUpTextInput
                  mb={10}
                  icon="person"
                  placeholder="First Name"
                  placeholderTextColor="black"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  // FIXME: onSubmitEditing={() => onFocus.focus()}
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

                <SignUpTextInput
                  mb={10}
                  icon="person"
                  placeholder="Last Name"
                  placeholderTextColor="black"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  // FIXME: onSubmitEditing={() => onFocus.focus()}
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

                <SignUpTextInput
                  mb={10}
                  icon="mail"
                  placeholder="Email Address"
                  placeholderTextColor="black"
                  onChangeText={handleChange("emailAddress")}
                  onBlur={handleBlur("emailAddress")}
                  value={values.emailAddress}
                  // keyboardType="email-address"
                  // FIXME: onSubmitEditing={() => onFocus.focus()}
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

                <SignUpTextInput
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
                  // FIXME: onSubmitEditing={() => onFocus.focus()}
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

// FIXME: Don't use any
type Props = {
  mb: number;
  value: string;
  icon: any; // FIXME:
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: any; // FIXME: () => void;
  onBlur: any; // FIXME: () => void;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: any;
};

const SignUpTextInput = ({
  icon,
  isPassword,
  showPassword,
  setShowPassword,
  ...props
}: Props) => {
  return (
    <Div>
      <Text style={{ position: "absolute", top: 15, left: 15, zIndex: 1 }}>
        <Octicons name={icon} size={30} color="black" />
      </Text>

      <Input pl={55} {...props} />
      {isPassword && (
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 15, zIndex: 1 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "md-eye-off" : "md-eye"}
            color="black"
            size={30}
          />
        </TouchableOpacity>
      )}
    </Div>
  );
};

export default SignUp;
