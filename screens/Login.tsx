import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// fomik = form
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
const SIGN_IN_URL = endpoint + "signInWithPassword?key=" + api_key;

// Schema valildator
const loginValidationSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

type navigationProp = {
  navigation: any;
};

const Login = ({ navigation }: navigationProp) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      {/* TODO: LOGO HERE */}
      <Div w="80%" h="70%" justifyContent="space-evenly">
        <Div h={80} justifyContent="space-between">
          <MonoText>Hang out anytime, anywhere.</MonoText>
          <MonoText>
            Chat Native makes it easy and fun to stay close to your favorite
            people.
          </MonoText>
        </Div>

        <Formik
          initialValues={{ emailAddress: "", password: "" }}
          validateOnMount={true}
          onSubmit={(values) => {
            const enteredEmail = values.emailAddress;
            const enteredPassword = values.password;

            fetch(SIGN_IN_URL, {
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
                // FIXME: Add spinner/loading
                // setIsLoading to false regardless of the result after sending the request
                if (response.ok) {
                  return response.json();
                } else {
                  return response.json().then((data) => {
                    // show an error modal
                    let errorMessage = "Authenticated failed!";

                    if (data && data.error && data.error.message) {
                      errorMessage = data.error.message;
                    }

                    throw new Error(errorMessage);
                  });
                }
              })
              .then(() => {
                alert("Login successful");
                navigation.navigate("MainScreen"); // Login successful, navigate to MainScreen
              })
              .catch((error) => {
                alert(error.message);
              });
          }}
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
            <Div>
              <LoginTextInput
                mb={10}
                icon="mail"
                placeholder="Email Address"
                placeholderTextColor="black"
                onChangeText={handleChange("emailAddress")}
                onBlur={handleBlur("emailAddress")}
                value={values.emailAddress}
                keyboardType="email-address"
                // FIXME: onSubmitEditing={() => onFocus.focus()}
              />

              {errors.emailAddress && touched.emailAddress && (
                <Text
                  mb={10}
                  ml={30}
                  fontSize="xl"
                  fontWeight="bold"
                  color="red"
                >
                  {errors.emailAddress}
                </Text>
              )}

              <LoginTextInput
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
                <Text
                  ml={30}
                  mb={20}
                  fontSize="xl"
                  fontWeight="bold"
                  color="red"
                >
                  {errors.password}
                </Text>
              )}

              <Div alignSelf="flex-end">
                <MonoText>Forgot your password?</MonoText>
              </Div>

              <Button
                w="80%"
                alignSelf="center"
                mt={20}
                onPress={() => handleSubmit()}
                disabled={!isValid}
              >
                <MonoText>Log In</MonoText>
              </Button>
            </Div>
          )}
        </Formik>

        <Div>
          <MonoText>
            Don't have an account yet?{" "}
            <Text
              color="salmon"
              fontWeight="bold"
              onPress={() => navigation.navigate("Signup")}
            >
              Create your account
            </Text>
            , it takes less than a minute.
          </MonoText>
        </Div>
      </Div>
    </Div>
  );
};

// type Props = {
//   icon: string;
//   isPassword: boolean;
//   hidePassword: boolean;
//   setHidePassword: boolean;
// };

const LoginTextInput = ({
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
    top: 15,
    right: 15,
    zIndex: 1,
  },
});

export default Login;
