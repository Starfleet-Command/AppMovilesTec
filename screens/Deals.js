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
        fetch('http://localhost:3000/carddata')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ getProducts: responseJson })
                console.log(responseJson)
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <View>
                <FlatList
                    vertical={true}
                    data={this.state.getProducts}
                    renderItem={({ item }) => (

                        <Card>
                            <CardItem>
                                <Body>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {item.type}
                                    </Text>
                                    <Thumbnail
                                        style={{ height: 300, width: 370 }}
                                        source={{ uri: item.image }}
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

