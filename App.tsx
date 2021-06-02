import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ThemeProvider } from "react-native-magnus";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Welcome from "./screens/Welcome";

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider>
        <SafeAreaProvider>
          {!isUserAuthenticated && <Welcome />}
          {isUserAuthenticated && (
            <>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </>
          )}
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
