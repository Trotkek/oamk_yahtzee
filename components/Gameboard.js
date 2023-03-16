import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../style/style";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
  SCOREBOARD_KEY,
} from "../constants/Game";
import { Col, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";

let board = [];
let counter = 6;

export default Gameboard = ({ route }) => {
  const [nbrOfThrowsleft, setNbrOfThrowsleft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("");
  const [bonusState, setBonusState] = useState("");
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [playerName, setPlayerName] = useState("");
  const [nbrOfWins, setNbrOfWins] = useState(0);
  const [sum, setSum] = useState(0);
  const [selectedDicePoints, setSelectedDicesPoints] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setdicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0)
  );

  const [end, setEnd] = useState(false);
  const [bonusReached, setBonusReached] = useState(false);

  const [scores, setScores] = useState([]);

  //Will be done once when entering to gameboard for the first time
  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
      getScoreboardData();
    }
  }, []);

  //Dices
  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable key={"row" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          color={getDiceColor(i)}
          style={{ alignSelf: "center" }}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  //Points
  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"points" + spot}>
        <Text key={"points" + spot} style={styles.points}>
          {getSpotTotal(spot)}
        </Text>
      </Col>
    );
  }

  //Buttons to set points
  const buttonsRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    buttonsRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          onPress={() => selectDicePoints(diceButton)}
          key={"buttonsRow" + diceButton}
        >
          <MaterialCommunityIcons
            //Name variables to use the specific MaterialCommunity icons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={40}
            color={getDicePointsColor(diceButton)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : "steelblue";
  }

  //Take copy of the array and then set value of selected dice (change falue every time the same one is called)
  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  };

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  //TODO: add more to this function. It needs total calculations, not only color change
  const selectDicePoints = (i) => {
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    let total = sum;

    if (nbrOfThrowsleft <= 0) {
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce(
          (total, x) => (x === i + 1 ? total + 1 : total),
          0
        );
        points[i] = nbrOfDices * (i + 1);
        setdicePointsTotal(points);
        setNbrOfThrowsleft(NBR_OF_THROWS);
        setSelectedDices(selected);
        setSelectedDicesPoints(selectedPoints);

        counter -= 1;
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        resetDices();

        let temp = BONUS_POINTS_LIMIT - (total + points[i]);
        let check = total + points[i];
        if (check >= BONUS_POINTS_LIMIT) {
          setBonusState("you have reached the bonus");
          if (!bonusReached) {
            setSum(total + points[i] + BONUS_POINTS);
            setBonusReached(true);
            return points[i];
          }
        } else {
          setBonusState("you are " + temp + " points away from the bonus");
        }
        setSum(total + points[i]);
        // selected.fill(false);
      } else {
        setStatus("Already selected, choose another one");
      }
    } else {
      setStatus("Throw more times to select points");
    }

    return points[i];
  };

  const throwDices = () => {
    let spots = [...diceSpots];
    // console.log(sum);
    if (nbrOfThrowsleft === 0) {
      setStatus("Out of throws, select number");
      setDiceSpots(spots);
      return;
    } else {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = "dice-" + randomNumber;
          spots[i] = randomNumber;
        }
      }
      setNbrOfThrowsleft(nbrOfThrowsleft - 1);
      setDiceSpots(spots);
      setStatus("select and throw dices again");
    }
  };
  const resetDices = () => {
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = "dice-" + randomNumber;
      spots[i] = randomNumber;
    }
    setNbrOfThrowsleft(nbrOfThrowsleft - 1);
    setDiceSpots(spots);
    setStatus("RESET");
  };

  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsleft > 0) {
      setStatus("You won");
    } else if (board.every((val, i, arr) => val === arr[0]) && counter === 0) {
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setStatus("You won, game over");
    } else if (counter === 0) {
      setStatus("Game over");
      // setNbrOfThrowsleft(0);
      setEnd(true);
      if (bonusReached) {
        setBonusState("Congrats on reaching the bonus");
      } else {
        setBonusState("You didn't reach the bonus points");
      }

      //TODO: SAVE SCORE TO MEMORY
    } else {
      setStatus("Keep on throwing");
    }
  };

  const reset = () => {
    resetDices();
    setNbrOfThrowsleft(NBR_OF_THROWS - 1);
    setStatus("");
    setBonusState("");
    setBonusReached(false);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSum(0);
    setSelectedDicesPoints(new Array(MAX_SPOT).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setdicePointsTotal(new Array(MAX_SPOT).fill(0));
    counter = 6;
    setEnd(false);
  };

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsleft === NBR_OF_THROWS) {
      setStatus("Game has not started");
    }
    if (nbrOfThrowsleft < 0) {
      setNbrOfThrowsleft(NBR_OF_THROWS - 1);
    } else if (selectedDicePoints.every((x) => x)) {
      savePlayerPoints();
      console.log("saved player points");
    }
  }, [nbrOfThrowsleft]);

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

  //TODO: add the total points in here instead of the hardcoded ones
  // const savePlayerPoints = async () => {
  //   const playerPoints = {
  //     name: playerName,
  //     date: "3.3.3.2023",
  //     time: "09:00",
  //     points: 60,
  //   };
  //   try {
  //     const newScore = [...scores, playerPoints];
  //     const jsonValue = JSON.stringify(newScore);
  //     await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
  //   } catch (error) {
  //     console.log("Write error: " + error.message);
  //   }
  // };

  const savePlayerPoints = async () => {
    const currentDate = new Date();
    const playerPoints = {
      name: playerName,
      date: `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      points: sum,
    };
    try {
      const newScore = [...scores, playerPoints]
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
      setScores(newScore);
      console.log(newScore);
      const jsonValue = JSON.stringify(newScore);

      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text>The player is: {playerName}</Text>

      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsleft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>

      {end ? (
        <Pressable style={styles.button} onPress={() => reset()}>
          <Text style={styles.buttonText}>RESET</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={() => throwDices()}>
          <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>
      )}

      <Text style={styles.sum}>Sum: {sum}</Text>
      <Text style={styles.bonus}>Bonus: {bonusState}</Text>
      <View style={styles.dicePoints}>
        <Grid>{pointsRow}</Grid>
      </View>
      <View style={styles.dicePoints}>
        <Grid>{buttonsRow}</Grid>
      </View>
      <Footer />
    </View>
  );
};
