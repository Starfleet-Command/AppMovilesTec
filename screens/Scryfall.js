import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Footer,
    FooterTab,
    Picker,
    Form,
} from 'native-base';
import { View, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import wishlist from '../wishlist.json'



export default class CardItemBordered extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        card: 'Decimate',
        uri: 'https://api.scryfall.com/cards/named?fuzzy=Aus+com',
        image_uri: 'none',
        price: ' ',
        store_uri: '',
        quantity: '0',
        id: '1',
    };

    async getCardsFromApiAsync() {
        return fetch(this.state.uri)
            .then(response => response.json())
            .then(responseJson => {
                if (typeof responseJson !== 'undefined') {
                    this.setState(
                        {
                            image_uri: responseJson.image_uris.small,
                            price: responseJson.prices.usd,
                            store_uri: responseJson.purchase_uris.tcgplayer,
                            id: responseJson.id,
                            card: responseJson.name,
                        },
                        function () { },
                    );
                }
            })
            .catch(error => {
                console.error(error);
            });
    }




    render() {
        return (
            <Container>
                <Header />
                <Content padder>
                    <View style={styles.container}>
                        <TextInput
                            placeholder="Type the card here"
                            onChangeText={card =>
                                this.setState({
                                    card,
                                    uri: 'https://api.scryfall.com/cards/named?fuzzy=' + this.state.card,
                                })
                            }
                            value={this.state.card}
                        />
                    </View>

                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text
                                button
                                onPress={() => this.getCardsFromApiAsync()}
                                style={styles.buttonText}>
                                Search
                             </Text>
                        </View>
                    </TouchableOpacity>
                    <Card>
                        <CardItem header bordered>
                            <Text>
                                {this.state.card}: ${this.state.price}
                            </Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Image
                                    style={{ width: 146, height: 204 }}
                                    source={{ uri: this.state.image_uri }}
                                />
                            </Body>
                        </CardItem>
                        <CardItem
                            footer
                            bordered
                            button
                            onPress={() => Linking.openURL(this.state.store_uri)}>
                            <Text>Buy on TcgPlayer</Text>
                        </CardItem>
                    </Card>
                    <View style={styles.button}>
                        <Text
                            button
                            onPress={() =>
                                this.props.navigation.push('Wishlist', {
                                    card: this.state.card, image_uri: this.state.image_uri, price: this.state.price, quantity: this.state.quantity, id: this.state.id,
                                })
                            }
                            style={styles.buttonText}>
                            Add to Wishlist
                     </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}

