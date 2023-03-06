import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import Gameboard from "./Gameboard";
import { SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";

//TODO: filter and rank data
export default Scoreboard = ({ navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScore = JSON.parse(jsonValue);
        setScores(tmpScore);
        scores.sort((a,b)=>parseFloat(a.points)-parseFloat(b.points));
        //TODO: sort results here for rendering (explained in assigment instructions)
        // homes.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price))
      }
    } catch (error) {
      console.log("Read error: " + error.message);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
    } catch (e) {
      console.log("Removing error: " + error.message);
    }

    console.log("Removing done.");
  };

  return (
    <View>
      <Header />
      <View>
        <Text>Place  Player  Date  Time  Points</Text>  
        {scores.map((player, i) => (
          //TODO Use datatable here
            
          <Text key={i}>
            {i + 1}.  {player.name}   {player.date}   {player.time}   {player.points} 
          </Text>
        ))}
        <Pressable style={styles.button} onPress={() => removeValue()}>
          <Text style={styles.buttonText}>Remove data</Text>
        </Pressable>
      </View>
      <Footer />
    </View>
  );
};
