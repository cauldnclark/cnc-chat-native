/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Dispatch, SetStateAction } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

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
  icon: string; // FIXME:
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: (e: string) => void; // FIXME:
  onBlur: (e: string) => void; // FIXME:
  secureTextEntry?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>; // FIXME:
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
