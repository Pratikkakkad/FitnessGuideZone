import React, { Component } from "react";
import { View, ListView, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Title,
  Body
} from "native-base";
import axios from "axios";

const datas = [
  "Mon: Chest",
  "Tue: Tricep",
  "Wed: Back",
  "Thu: Biceps",
  "Fri: shoulder",
  "Sat: Legs",
  "Sun: "
];

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
      response: []
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  componentDidMount() {
    console.log("Schedule");
    fetch("https://pratikapi.herokuapp.com/users/schedule/3")
      .then(res => res.json())
      .then(res =>
        this.setState({
          response: res.data[0]
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    const { response } = this.state;
    const num = 3;
    val = [1,2,3,4,5,6,7];
    console.log(response);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#f35300" }}
          androidStatusBarColor="#F57C00"
        >
          <Body>
            <Title>Schedule</Title>
          </Body>
        </Header>
        <View style={{backgroundColor: "#FFA726" }}>
          <Text> </Text>
        </View>
        <Content style={{ backgroundColor: "#FFA726" }}>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(response)}
            renderRow={(response, i) => (
              <ListItem>
                {console.log(response)}
                <Text> {response} </Text>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button full>
                <Text>Edit</Text>
              </Button>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {}
});
