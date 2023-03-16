import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import styles from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import { Button, DataTable } from "react-native-paper";
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
      }
    } catch (error) {
      console.log("Read error: " + error.message);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScores([]);
      getScoreboardData();
    } catch (e) {
      console.log("Removing error: " + error.message);
    }

    console.log("Removing done.");
  };


  return (
    <View>
      <Header> </Header>

      <ScrollView>
        <DataTable>
          <DataTable.Header
            style={{
              backgroundColor: "#4a1",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <DataTable.Title
              textStyle={{
                color: "#420",
                fontSize: 15,
              }}
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              textStyle={{
                color: "#420",
                fontSize: 15,
              }}
            >
              Date & Time
            </DataTable.Title>
            <DataTable.Title
              textStyle={{
                color: "#420",
                fontSize: 15,
              }}
            >
              Score
            </DataTable.Title>
          </DataTable.Header>

          {scores.map((player, i) => (
            <DataTable.Row key={i + 1} style={{ backgroundColor: "#4a1" }}>
              <DataTable.Cell textStyle={{ color: "#420" }}>
                {player.name}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ color: "#420" }}>
                {player.date} {player.time}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{ color: "#420" }}
              >
                {player.points}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      {scores.length > 0 && (
        <Button style={styles.button} mode="contained" onPress={removeValue}>
          Reset Table
        </Button>
      )}
      <Footer> </Footer>
    </View>
  );
};
