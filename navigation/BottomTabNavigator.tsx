/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-magnus";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import Contacts from "../screens/Contacts";
import Messages from "../screens/Messages";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='TabOne'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name='Messages'
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='envelope' size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Contacts'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user-alt' size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='Messages'
        component={Messages}
        options={{
          headerTitle: "Messages",
          headerTitleAlign: "center",
          headerRight: () => (
            <Button
              h={40}
              w={50}
              mr='xl'
              bg='white'
              suffix={
                <MaterialIcons
                  position='absolute'
                  left={8}
                  name='logout'
                  size={20}
                  color='black'
                />
              }
              onPress={() => alert("Logout!")}
              title='Info'
              color='#fff'
            />
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='Contacts'
        component={Contacts}
        options={{
          headerTitle: "Contacts",
          headerTitleAlign: "center",
          headerRight: () => (
            <Button
              h={40}
              w={50}
              mr='xl'
              bg='white'
              suffix={
                <MaterialIcons
                  position='absolute'
                  left={8}
                  name='logout'
                  size={20}
                  color='black'
                />
              }
              onPress={() => alert("Logout!")}
              title='Info'
              color='#fff'
            />
          ),
        }}
      />
    </TabTwoStack.Navigator>
  );
}
