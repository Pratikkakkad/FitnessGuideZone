import React, { Component } from "react";
import { StyleSheet, View,ToastAndroid } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Input,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem
} from "native-base";

export default class Nutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fruites: [],
      Search: "",
      fruite: [],
      fruiteVisible: false
    };

    navigationOptions = {
      header: null
    };
  }

  componentDidMount() {
    console.log("nutrition");
    fetch("https://pratikapi.herokuapp.com/nutritoins/")
      .then(res => res.json())
      .then(res =>
        this.setState({
          fruites: res.data.map(f => f.fruits)
        })
      )
      .catch(err => console.log(err));
  }

  searchApi() {
    const { Search } = this.state;
    console.log(Search);
    Search == "" ? ToastAndroid.showWithGravity(
      'Enter Food Name',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    ) :
    fetch(`http://localhost:3000/nutritoins/${Search}`)
      .then(res => res.json())
      .then(res =>
        res == undefined
          ? null
          : this.setState({
              fruite: res.data[0],
              fruiteVisible: true
            })
      )
      .catch(err => console.log(err));
  }

  render() {
    const { fruite, fruiteVisible } = this.state;
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f35300" }}
          androidStatusBarColor="#F57C00"
        >
          <Body>
            <Title>Nutrition</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.container}>
          <Input
            style={styles.inputBox}
            placeholder="Search"
            onChangeText={text => this.setState({ Search: text })}
          />
          <Button style={styles.button} onPress={() => this.searchApi()}>
            <Text style={styles.buttonText}>Search</Text>
          </Button>
          {fruiteVisible && (fruite != undefined) && (
            <Card>
              <CardItem header>
                <Text>{fruite.fruits}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Protein: {fruite.prots}</Text>
                  <Text>Carbs: {fruite.carbs}</Text>
                  <Text>Fats: {fruite.fat}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>Calories: {fruite.calories}</Text>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFA726"
  },
  inputBox: {
    width: 380,
    backgroundColor: "rgba(255, 255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 5,
    marginHorizontal: 10
  },
  button: {
    width: 380,
    backgroundColor: "#F57C00",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  }
});
