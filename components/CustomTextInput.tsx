import React from "react";
import { TouchableOpacity } from "react-native";
// Components
import { Div, Text, Input } from "react-native-magnus";
// Icons
import { Octicons, Ionicons } from "@expo/vector-icons";
// Types
import { Props } from "../types";

const CustomTextInput = ({
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
          onPress={() => setShowPassword && setShowPassword(!showPassword)}
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

export default CustomTextInput;
