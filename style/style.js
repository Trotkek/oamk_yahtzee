import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a1",
    padding: 25,
  },
  header: {
    color: "#420",
    marginTop: 30,
    marginBottom: 15,
    fontSize: 30,
    backgroundColor: "#4a1",
    flexDirection: "row",
  },
  footer: {
    marginTop: 20,
    backgroundColor: "#4a1",
    flexDirection: "row",
  },
  title: {
    color: "#420",
    fontWeight: "bold",
    flex: 1,
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  author: {
    color: "#420",
    fontWeight: "bold",
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    margin: 10,
  },
  home: {
    backgroundColor: "#4a1",
    alignItems: "center",
    justifyContent: "center",
  },

  gameboard: {
    backgroundColor: "#4a1",
    alignItems: "center",
    justifyContent: "center",
  },
  gameinfo: {
    backgroundColor: "#4a1",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 10,
  },
  row: {
    marginTop: 20,
    padding: 10,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#420",
    width: 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#4a1",
    fontSize: 21,
  },
  points: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: "center",
  },
  dicePoints: {
    flexDirection: "row",
    width: 280,
    alignContent: "center",
  },
  sum: {
    backgroundColor: "#4a1",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    marginTop: -20,
  },
  bonus: {
    backgroundColor: "#4a1",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 15,
    marginTop: 10,
  },
});
