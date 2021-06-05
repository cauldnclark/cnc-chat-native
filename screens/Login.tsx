import React, { useState } from "react";
// Fomik = form
import { Formik } from "formik";
// Validator
import { loginValidationSchema } from "../helper/yupvalidator";
// Components
import { ActivityIndicator } from "react-native";
import { MonoText } from "../components/StyledText";
import { Div, Text, Button } from "react-native-magnus";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import CustomTextInput from "../components/CustomTextInput";
// Custom hook
import useHttp from "../hooks/useHttp";
// API
import { loginApi } from "../lib/api";
// Types
import { navigationProp } from "../types";

// FIXME: onSubmitEditing={() => onFocus.focus()} on every CustomTextInput
const Login = ({ navigation }: navigationProp) => {
  let { sendRequest, error } = useHttp(loginApi, true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  if (isLoading) {
    return (
      <Div flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" color="#2ED573" />
      </Div>
    );
  }

  if (error) {
    return (
      <Div flex={1} alignItems="center" justifyContent="center">
        <MonoText>{error}</MonoText>
      </Div>
    );
  }

  return (
    <KeyboardAvoidingWrapper>
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
            setIsLoading(true);
            sendRequest(values);
            setTimeout(() => {
              navigation.navigate("Root");
              setIsLoading(false);
            }, 1000);
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

              <Div alignSelf="flex-end">
                {/* TODO: Still thinking whether to add this */}
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

export default Login;
