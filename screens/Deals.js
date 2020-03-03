import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, Footer, FooterTab, Thumbnail, } from "native-base";
import { View, Image, FlatList } from 'react-native';


export default class CardItemBordered extends Component {
    constructor(props) {
        super(props);

        global.getProducts = [];

        this.state = {
            getProducts: [],
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const card = navigation.getParam('card');
        const image_uri = navigation.getParam('image_uri');
        const price = navigation.getParam('price');
        const id = navigation.getParam('id');

        /*fetch('https://366dd267.ngrok.io/productos')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ getProducts: responseJson })
                console.log(responseJson)
            })
            .catch(error => console.log(error));
       */

        let Localwishlist =
        {

            carddata: [
                {
                    id: "1",
                    name: "Austere Command",
                    image: "https://vgezone.com/wp-content/uploads/2016/10/keldeo.png",
                    price: "",
                    quantity: ""
                },

            ],


        }
        var i;
        for (i = 0; i < Object.keys(Localwishlist.carddata).length; i++) {

            if (Localwishlist.carddata[i].id == id) {
                Localwishlist.carddata[i].quantity++;

            }
            else if (i == Localwishlist.carddata.length - 1) {
                Localwishlist.carddata.push({ id: id, name: card, image: image_uri, price: price, quantity: "0" })
            }

        }
        this.setState({ getProducts: Localwishlist })
        global.getProducts = eval(Localwishlist);
        console.log(global.getProducts.carddata[1].id)
    }




    render() {
        return (
            <View>
                <FlatList
                    vertical={true}
                    keyExtractor={(item) => item.id}
                    data={global.getProducts}
                    {...console.log(global.getProducts)}
                    renderItem={({ item }) => (

                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {item.carddata.id}
                                    </Text>
                                    <Thumbnail
                                        style={{ height: 300, width: 370 }}
                                        source={{ uri: item.carddata.image_uri }}
                                    />
                                </Body>
                            </CardItem>
                        </Card>
                    )}
                />
            </View>
        );
    }
}

