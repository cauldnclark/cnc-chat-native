import * as React from "react";
import { StyleSheet } from "react-native";

import { Text } from "react-native-magnus";
import { View } from "../components/Themed";

export default function Contacts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts Screen</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
