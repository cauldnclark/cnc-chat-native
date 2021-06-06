/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { StackNavigationProp } from "@react-navigation/stack";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

/* Login and Sign-up */
type LoginNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
export type loginNavigationProp = {
  navigation: LoginNavigationProp;
};

type SignupNavigationProp = StackNavigationProp<RootStackParamList, "Signup">;
export type signupNavigationProp = {
  navigation: SignupNavigationProp;
};

export type Props = {
  mb: number;
  value: string;
  icon: any; //FIXME: any for now... string; should work since ---> icon="mail/lock" ---> getting an alert from lint
  // See here why https://github.com/expo/vector-icons/issues/137
  // Still doesn't work even if we're "@expo/vector-icons": "^12.0.0",
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: (v: string) => void;
  onBlur: (v: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
};

/* End of Login and Sign-up */

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
