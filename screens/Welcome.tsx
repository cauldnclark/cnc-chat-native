import React, { useState } from "react";
// Components
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { Div, Text, Button, Modal } from "react-native-magnus";

const WelcomeScreen = () => {
  const [modalForLogin, setModalForLogin] = useState<boolean>(false);
  const [modalForSignUp, setModalForSignUp] = useState<boolean>(false);

  const showLoginModal = () => setModalForLogin(() => !modalForLogin);
  const showSignUpModal = () => setModalForSignUp(() => !modalForSignUp);

  const loginModal = (
    <Modal
      isVisible={modalForLogin}
      h="60%"
      bg="white"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <Button
        onPress={showLoginModal}
        w={100}
        alignSelf="flex-end"
        bg="salmon"
        mt={20}
        mr={20}
      >
        Close
      </Button>
      <Login />
      {/* TODO: Modal transitioning should be from LEFT to RIGHT. */}
      {/* TODO: Design Modal and close modal when user click outside modal */}
    </Modal>
  );

  const signUpModal = (
    <Modal
      isVisible={modalForSignUp}
      h="70%"
      bg="white"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <Button
        onPress={showSignUpModal}
        w={100}
        alignSelf="flex-end"
        bg="salmon"
        mt={20}
        mr={20}
      >
        Close
      </Button>
      <SignUp />
      {/* TODO: Modal transitioning should be from LEFT to RIGHT. */}
      {/* TODO: Design Modal and close modal when user click outside modal */}
    </Modal>
  );

  return (
    <Div flex={1} alignItems="center" justifyContent="space-evenly">
      {/* TODO: LOGO HERE */}
      <Div w="90%">
        <Text fontSize="6xl" color="black" fontWeight="bold" mb={20}>
          Hang out anytime, anywhere.
        </Text>
        <Text fontSize="xl" color="black" textAlign="center">
          Chat Native makes it easy and fun to stay close to your favorite
          people.
        </Text>
      </Div>

      <Div w="55%">
        {/* FIXME: Figure out how to use fontFamily and use the one in assets > fonts
           fontFamily="SpaceMono Regular" */}
        <Button
          w="100%"
          mt={20}
          mb={20}
          alignSelf="center"
          onPress={showLoginModal}
        >
          <Text
            fontWeight="bold"
            color="white"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Log in
          </Text>
        </Button>

        <Button w="100%" alignSelf="center" onPress={showSignUpModal}>
          <Text
            fontWeight="bold"
            color="white"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Sign up
          </Text>
        </Button>

        {/* Modals */}
        {loginModal}
        {signUpModal}
      </Div>
    </Div>
  );
};

export default WelcomeScreen;
