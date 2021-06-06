import React from "react";

// Keyboard avoiding view
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const KeyboardAvoidingWrapper = ({ children }: any) => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
