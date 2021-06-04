// FIXME: For now, SignUp will only register emailAddress and password
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// formik = form
import { Formik } from "formik";

// yup = validator
import * as yup from "yup";

// icons
import { Octicons, Ionicons } from "@expo/vector-icons";

// Components
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
            navigation.navigate("Login"); // Upon successful signup, automatically navigate to login
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
          <MonoText>Sign-up</MonoText>
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
              <Text mb={10} ml={30} fontSize="xl" fontWeight="bold" color="red">
                {errors.firstName}
              </Text>
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
              <Text mb={10} ml={30} fontSize="xl" fontWeight="bold" color="red">
                {errors.lastName}
              </Text>
            )}

            <SignUpTextInput
              mb={10}
              icon="mail"
              placeholder="Email Address"
              placeholderTextColor="black"
              onChangeText={handleChange("emailAddress")}
              onBlur={handleBlur("emailAddress")}
              values={values.emailAddress}
              keyboardType="email-address"
              // FIXME: onSubmitEditing={() => onFocus.focus()}
            />

            {errors.emailAddress && touched.emailAddress && (
              <Text mb={10} ml={30} fontSize="xl" fontWeight="bold" color="red">
                {errors.emailAddress}
              </Text>
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
              <Text mb={10} ml={30} fontSize="xl" fontWeight="bold" color="red">
                {errors.password}
              </Text>
            )}
            <Button w="100%" onPress={() => handleSubmit()} disabled={!isValid}>
              Submit
            </Button>

            <Text mt={50}>
              Already have an account?{" "}
              <Text
                color="salmon"
                fontWeight="bold"
                onPress={() => navigation.navigate("Login")}
              >
                Login ** TO GO BACK TO LOGIN SCREEN, CLICK THIS FOR NOW**
              </Text>
            </Text>
          </Div>
        </Div>
      )}
    </Formik>
  );
};

const SignUpTextInput = ({
  icon,
  isPassword,
  showPassword,
  setShowPassword,
  ...props
}: any) => {
  return (
    <Div>
      <Text style={styles.leftIcon}>
        <Octicons name={icon} size={30} color="black" />
      </Text>

      <Input pl={55} {...props} />
      {isPassword && (
        <TouchableOpacity
          style={styles.rightIcon}
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

const styles = StyleSheet.create({
  leftIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 1,
  },

  rightIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1,
  },
});

export default SignUp;
