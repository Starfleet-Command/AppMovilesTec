/* eslint-disable */
import React, { Component } from 'react';
import { Share, ActivityIndicator } from 'react-native';
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

export default class Home extends Component {
  constructor(props) {
    super(props);

    global.getData = [];
    global.counter = 0;

    this.state = {
      loading: false,
      modalVisible: false,
      getData: [],
      username: "",
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
        <Header searchBar rounded>
          <Button transparent>
            <Icon name="menu" />
          </Button>

          <Item>
            <Input placeholder="Buscar..." />
            <Icon name="people" />
          </Item>

          <Button transparent>
            <Icon name="funnel"></Icon>
          </Button>


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
    this.props.navigation.setParams({ handleRemove: this.removeVehicle });
  }

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
    const name = navigation.getParam('username');

    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="Grey" />
        </View>
      );
    }
    return (
      <Container>
        <Header>
          <Text>Welcome: {name}</Text>

        </Header>


        <Card>
          <CardItem>
            <CardItem header>
              <Text>
                CHARGING LAZERS
              </Text>
            </CardItem>
            <Body>
              <Text>
                DESTROY THEM WITH LAZERS
                </Text>
            </Body>
          </CardItem>
        </Card>

        <Content />

        <Footer>
          <FooterTab>
            <Button>
              <Text
                button
                onPress={() =>
                  this.props.navigation.push('Deals', {
                    username: this.state.username,
                  })
                }
              >
                Wishlist
                </Text>

            </Button>
            <Button active>
              <Text>Browse</Text>
            </Button>
            <Button>
              <Text>Daily Deals</Text>
            </Button>
            <Button>
              <Text
                button
                onPress={() =>
                  this.props.navigation.push('Scryfall', {
                  })
                }
              >
                MAGIC
                </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
