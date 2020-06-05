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
import { View, Image, TextInput, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
import wishlist from '../wishlist.json';
import * as firebase from 'firebase';


export default class CardItemBordered extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        card: '',
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
                    console.log(this.state.id);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    storeData = async () => {
        
        var carddata = this.state;
        await firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/cards/'+carddata.id).once('value').then(function(snapshot){
            var cardexists = snapshot.val();
            console.log(cardexists);

            if(cardexists){
                console.log("Card already exists!");
                try{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/cards/'+carddata.id).update({
                    quantity: cardexists.quantity+1,
                });
                console.log("Quantity incremented.");
                } catch (error) {
                    console.error(error);
                }
            }

            else{
                try {
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid+'/cards/'+carddata.id).set({
                        //uid: firebase.auth().currentUser.uid,
                        id: carddata.id,
                        card: carddata.card,
                        image_uri: carddata.image_uri,
                        price: carddata.price,
                        quantity: 1,
        
                    })
                    .then(() => {
                        console.log('Card added!')});
            
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }



    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#8fb4ff'}} />
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
                                this.storeData()}
                            style={styles.buttonText}>
                            Add to Wishlist
                     </Text>
                    </View>

                </Content>
            </Container >
        );
    }
}

