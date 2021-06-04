import React from "react";
import { Div } from "react-native-magnus";

// screens
import Messages from "./Messages";
import Contacts from "./Contacts";

const Welcome = () => {
  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Messages />
      <Contacts />
    </Div>
  );
};

export default Welcome;
