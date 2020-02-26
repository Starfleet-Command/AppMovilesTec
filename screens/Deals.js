import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, Footer, FooterTab, } from "native-base";
import { View, Image } from 'react-native';


export default class CardItemBordered extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>$950</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    The Last of Us II
                                </Text>

                                <Image
                                    style={{ width: 150, height: 200 }}
                                    source={{ uri: 'https://cdn.wccftech.com/wp-content/uploads/2019/08/WCCFthelastofuspart23-740x429.jpg' }}
                                />
                            </Body>
                        </CardItem>
                        <CardItem footer bordered button onPress={() => alert("PH for link to store")}>
                            <Text>PS Store</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}