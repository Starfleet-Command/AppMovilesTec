/* eslint-disable */
import React, { Component } from 'react';
import { Share, ActivityIndicator, StyleSheet } from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import {
  Container,
  Header,
  Content,
  View,
  Footer,
  FooterTab,
  Badge,
  Item,
  Input,
  Icon,
  Text,
  ScrollView,
  Card,
  CardItem,
  Button,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import * as firebase from 'firebase'

export default class Home extends Component {
  constructor(props) {
    super(props);

    global.getData = [];
    global.counter = 0;

    this.state = {
      loading: false,
      modalVisible: false,
      getData: [],
      currentUser: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      swipeEnabled: false,
      gestureResponseDistance: {
        horizontal: -1,
        vertical: -1,
      },
      header: (
        <Header style={{backgroundColor: '#8fb4ff'}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Cochin',
              fontSize: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Mythic Companion App
          </Text>
        </Header>
      ),

      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#626262',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.props.navigation.setParams({ handleRemove: this.removeVehicle });
  }

  signOutUser = () =>{
    firebase.auth().signOut();
  };

  removeVehicle = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        title: 'El titulo',
        url:
          'http://img.culturacolectiva.com/content/2017/06/1d56bcb1-bf9f-4b15-8319-531f0eb72d7d-high.jpg',
        message:
          'Esta obra está considerada como uno de los máximos ejemplos de la etapa de mayor madurez artística de Tamayo. Representa a un hombre, una mujer y una figura andrógina de aspecto impreciso. Este cuadro tiene una particular historia detrás: fue robado en 1987 y hallada hasta 2003 en un contenedor de basura por la ciudadana neoyorquina Elizabeth Gibson.',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { navigation } = this.props;
    const { currentUser } = this.state;
    var user = firebase.auth().currentUser;

    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="Grey" />
        </View>
      );
    }
    return (
      <Container>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: 20,
          }}>
          Welcome: {user.displayName}!
        </Text>

        <Content>
          <View style={style.container}>
            <Button Button style = {
              {
                backgroundColor: '#0bc1e6'
              }
            }
              iconLeft
              title="Wishlist"
              onPress={() =>
                this.props.navigation.push('Wishlist', {
                  currentUser: this.state.currentUser,
                })
              }>
              <Icon name="list" />
              <Text style={{textAlign: 'center'}}>Wishlist</Text>
            </Button>

            <Button Button style = {
              {
                backgroundColor: '#4d80f0'
              }
            }
              iconLeft
              title="Assistant"
              onPress={() => this.props.navigation.push('Assistant', {})}>
              <Icon name="lightbulb" />
              <Text style={{textAlign: 'center'}}>Assistant</Text>
            </Button>
          </View>

          <View style={style.container}>
              <Button Button style = {
                {
                  backgroundColor: '#999ea8'
                }
              }
              iconLeft
              title="Scryfall"
              onPress={() => this.props.navigation.push('Scryfall', {})}>
                <Text style={{textAlign:'center'}}>Card search</Text>
              </Button>
          </View>
              
            <View style={style.container}>
              <Button style={{
                backgroundColor:'red',
              }}
                iconLeft
                title="Logout"
                onPress = {this.signOutUser}>
                  <Text>
                    Logout
                  </Text>
                </Button>
            </View>
        </Content>

        {/* <Footer>
         
        </Footer> */}
      </Container>
    );
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    height: 100,
    marginTop: 10,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'stretch',
  },
  buttonLeft:{
    justifyContent:'center'
  },
  buttonContainter:{
    flex: 1,
  }
})