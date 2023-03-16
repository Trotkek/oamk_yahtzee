import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable, TextInput, Keyboard } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../style/style";
import Footer from './Footer';
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  MIN_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
} from "../constants/Game";

export default Home = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.home}>
      <Text style={styles.header}> Mini-Yahtzee </Text>
      {!hasPlayerName ? (
        <>
          <Text color="#420"> Enter players name: </Text>
          <TextInput onChangeText={setPlayerName} autoFocus={true}>
            {" "}
          </TextInput>
          <Pressable
            style={styles.button}
            onPress={() => handlePlayerName(playerName)}
          >
            <Text style={styles.buttonText}> OK </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text> Rules of the game</Text>
          <Text>
            THE GAME: Upper section of the classic Yahtzee dice game. You have{" "}
            {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS}{" "}
            throws. After each throw you can keep dices in order to get same
            dice spot counts as many as possible. In the end of the turn you
            must select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends
            when all points have been selected. The order for selecting those is
            free. POINTS: After each turn game calculates the sum for the dices
            you selected. Only the dices having the same spot count are
            calculated. Inside the game you can not select same points from
            {MIN_SPOT} to {MAX_SPOT} again. GOAL: To get points as much as
            possible. {BONUS_POINTS_LIMIT} points is the limit of getting bonus
            which gives you {BONUS_POINTS} points more.
          </Text>
          <Text> Good luck, {playerName} ! </Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("Gameboard", { player: playerName })
            }
          >
            <Text style={styles.buttonText}> PLAY </Text>
          </Pressable>
        </>
      )}
      <Footer/> 
    </View>
  );
};
