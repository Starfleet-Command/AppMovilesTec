import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, Footer, FooterTab, Thumbnail, Button, Icon, Item, Input } from "native-base";
import { View, Image, FlatList, Linking, AsyncStorage } from 'react-native';
import styles from './styles';



export default class CardItemBordered extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getProducts: [],
            textData: [],
            latestCard: '',
        };
    }

    static navigationOptions = ({ navigation }) => {

        const { params } = navigation.state;
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
                        <Input placeholder="Buscar..." onChangeText={text => params.searchText(text)} />
                        <Icon name="md-search" />
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

    retrieveData = async () => {
        try {
            const Savedcard = await AsyncStorage.getItem('name');
            console.log(Savedcard);
            if (Savedcard != null) {
                this.setState({ latestCard: Savedcard })
            }
        } catch (error) {
            console.log(error);
        }
    };



    componentDidMount() {
        const { navigation } = this.props;
        const card = navigation.getParam('card');
        const image_uri = navigation.getParam('image_uri');
        const price = navigation.getParam('price');
        const id = navigation.getParam('id');

        this.props.navigation.setParams({ searchText: this.setSearchText });


        var i;
        for (i = 0; i < Object.keys(Localwishlist.carddata).length; i++) {


            if (Localwishlist.carddata[i].id == id) {
                Localwishlist.carddata[i].quantity++;

            }
            else if (i == Localwishlist.carddata.length - 1 && id != undefined) {
                Localwishlist.carddata.push({ id: id, name: card, image: image_uri, price: price, quantity: "0" })
            }

        }
        this.setState({ getProducts: Localwishlist })
        this.retrieveData();
    }


    setSearchText = event => {

        searchText = event;
        data = Localwishlist;
        searchText = searchText.trim().toLowerCase();

        data = data.carddata.filter(l => { return l.name.toLowerCase().match(searchText) })
        this.setState({ textData: data })
    };

    buyAll(store) {
        var storeUrl;
        var cards = [];

        if (store == "TCG") {
            for (let i = 0; i < Object.keys(this.state.getProducts.carddata).length; i++) {
                cards.push('' + this.state.getProducts.carddata[i].quantity + ' ' + this.state.getProducts.carddata[i].name + "||")

            }

            storeUrl = 'https://store.tcgplayer.com/massentry?c=' + cards.join(' ');
        }
        else if (store == "CardKingdom") {
            for (let i = 0; i < Object.keys(this.state.getProducts.carddata).length; i++) {
                cards.push('' + this.state.getProducts.carddata[i].quantity + '' + this.state.getProducts.carddata[i].name + "%0D%0A")
            }
            storeUrl = 'https://www.cardkingdom.com/builder/mtg?maindeck=' + cards.join('') + '&format=all';
        }

        console.log(storeUrl)
        Linking.openURL(storeUrl);

    }





    render() {
        return (
            <View>
                <Card>
                    <Text>
                        The most recently added card is {this.state.latestCard}
                    </Text>
                </Card>
                <FlatList
                    vertical={true}
                    data={this.state.textData}
                    keyExtractor={(item) => item.id}
                    //{...console.log(this.state.getProducts.carddata)}
                    renderItem={({ item }) => (

                        <Card>
                            <CardItem header bordered>
                                <Text style={{ fontWeight: "bold" }}>
                                    {item.name}
                                </Text>
                            </CardItem>

                            <CardItem bordered>

                                <Body>
                                    <Image
                                        style={{ width: 150, height: 204 }}
                                        source={{ uri: item.image }}
                                    />
                                    <Text style={{ fontWeight: "bold" }}>
                                        Quantity: {item.quantity + '\n'}
                                        Total Price: {item.price * item.quantity}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )}
                    ListFooterComponent={<View style={styles.button}>
                        <Text
                            button
                            onPress={() => this.buyAll("TCG")}
                            style={styles.buttonText}>
                            Buy All in TCGPlayer
                     </Text>

                    </View>}

                    ListFooterComponent={<View style={styles.button}>
                        <Text
                            button
                            onPress={() => this.buyAll("CardKingdom")}
                            style={styles.buttonText}>
                            Buy All in CardKingdom
                     </Text>

                    </View>}
                />


            </View>
        );
    }
}

const Localwishlist =
{

    carddata: [
        {
            id: "1",
            name: "Austere Command",
            image: "https://img.scryfall.com/cards/small/front/b/e/bef16a71-5ed2-4f30-a844-c02a0754f679.jpg?1562853529",
            price: "15.65",
            quantity: "2"
        }

    ]


}