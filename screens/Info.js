import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
export default class CardItemBordered extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>Emma Solas</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    Banal'Vhenan. Mar Solas ena mar din
                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Ellana</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}