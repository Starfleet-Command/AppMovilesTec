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
    Button,
    Icon,
    Item,
    Input,
} from 'native-base';
import { View, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';

export default class Assistant extends Component {
    constructor(props) {
        super(props);


    }

    state = {
        getProducts: [],
        query: '',
        intent: '',
        entity: '',
        formatEntity: '',
        scryfallUri: '',
        legality: [],
        response: '',
    };

    async getCardInfo() {
        return fetch(this.state.scryfallUri)
            .then(response => response.json())
            .then(responseJson => {
                if (typeof responseJson !== 'undefined') {
                    if (this.state.intent == "Oracle") {
                        this.setState(
                            {
                                response: responseJson.oracle_text
                            },
                            function () { },

                        );
                    }
                    else if (this.state.intent == "Rarity") {
                        this.setState(
                            {
                                response: responseJson.rarity
                            },
                            function () { },

                        );
                    }
                    else if (this.state.intent == "Flavor Text") {
                        this.setState(
                            {
                                response: responseJson.flavor_text
                            },
                            function () { },

                        );
                    }
                    else if (this.state.intent == "Legality") {
                        var results = [];
                        var format = this.state.formatEntity;
                        this.setState(
                            {
                                response: responseJson.legalities
                            },
                            function () { },

                        );

                        for (var key in legality) {
                            if (key == format) {

                                this.state.isLegal = legality[0].key
                            }

                        }
                    }

                    else if (this.state.intent == "Set") {
                        this.setState(
                            {
                                response: responseJson.set_name
                            },
                            function () { },

                        );
                    }

                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    async TalkAI() {
        return fetch("https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6440f58c-5631-482d-bcd9-78a78ae9086e?verbose=true&timezoneOffset=0&subscription-key=ca1be37a7a9d4a9f846fecebf4afc5f9&q=" + this.state.query)
            .then(response => response.json())
            .then(responseJson => {
                if (typeof responseJson !== 'undefined') {
                    this.setState(
                        {
                            intent: responseJson.intents[0].intent,
                            entity: responseJson.entities[0].entity,

                            scryfallUri: "https://api.scryfall.com/cards/named?fuzzy=" + this.state.entity
                        },
                        function () { },
                    );
                    if (intent == "Legality") {
                        this.setState(
                            {
                                formatEntity: responseJson.entities[1].entity,
                            },
                            function () { },
                        );
                    }

                    this.getCardInfo();


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
                            placeholder="Type your query here"
                            onChangeText={(query) => this.setState({ query })}
                            value={this.state.query}
                        />
                    </View>
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text
                                button
                                onPress={() => this.TalkAI()}
                                style={styles.buttonText}>
                                Query
                             </Text>
                        </View>
                    </TouchableOpacity>



                    <Card>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>
                                Your Assistant responds...
            </Text>
                        </CardItem>

                        <CardItem bordered>

                            <Body>
                                <Text>
                                    This is what I found: {'\n'}

                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    {this.state.entity}:
                                </Text>
                                <Text>
                                    {this.state.response + '\n'}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }

}