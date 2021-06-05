import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
// fomik = form
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
    <KeyboardAvoidingWrapper>
      {/* TODO: LOGO HERE */}
      <Div px={20} py={200}>
        <Div h={150} justifyContent="space-between">
          <MonoText style={{ fontSize: 40, color: "blue" }}>
            Hang out anytime, anywhere.
          </MonoText>
          <MonoText style={{ fontSize: 15 }}>
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
                    // show an error modal or this
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
                // Login successful, navigate to MainScreen
                // Adding setTimeout since alert should pop-up first, before navigating to MainScreen
                setTimeout(() => {
                  navigation.navigate("Root");
                }, 1000);
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
            <Div mt={15}>
              <LoginTextInput
                mb={10}
                icon="mail"
                placeholder="Email Address"
                placeholderTextColor="black"
                onChangeText={handleChange("emailAddress")}
                onBlur={handleBlur("emailAddress")}
                value={values.emailAddress}
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
                <MonoText style={{ fontSize: 18, color: "white" }}>
                  Log In
                </MonoText>
              </Button>
            </Div>
          )}
        </Formik>

        <Div mt={50}>
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

const LoginTextInput = ({
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
          style={{ position: "absolute", top: 15, right: 15, zIndex: 1 }}
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

export default Login;
