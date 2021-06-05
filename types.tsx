/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

// FIXME: Don't use any
export type navigationProp = {
  navigation: any; // FIXME:
};

export type Props = {
  // For Login Input and Sign-up Input
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
  setShowPassword?: any; // FIXME:
};

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
