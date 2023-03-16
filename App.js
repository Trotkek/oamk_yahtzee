import { View } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import Home from "./components/Home";
import styles from "./style/style";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  const icons = {
    Home: "md-home",
    Gameboard: "game-controller",
    Scoreboard: "list",
  };

  const navigationOptions = ({ route }) => ({
    tabBarIcon: () => {
      return <Ionicons name={icons[route.name]} size={25} color={"#360"} />;
    },
  });
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={navigationOptions}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
