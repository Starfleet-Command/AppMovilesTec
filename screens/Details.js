/* eslint-disable */
import React, { Component } from 'react';
import {ActivityIndicator,StyleSheet,TouchableOpacity, FlatList, View} from 'react-native'
import { Container, Content, Button, Thumbnail, Text, Title, Icon, Left, Body, Right, FooterTab, Footer, Badge, Card } from 'native-base';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

export default class Details extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource:[]    
     };
   } 

   componentWillMount() {
    ////////////////////////////////////////////[ GET INFO FROM DB ]////////////////////////////////////////////////////
    fetch('http://677cb047.ngrok.io/artworks/list')
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any    
 }

  static navigationOptions = ({ navigation }) => {       
    const itemId = navigation.getParam('itemId', 'NO-ID');    
    return {
      /*
      headerTitle: (
        <Thumbnail style={{marginTop:190, height: 200, width: 200, flex: 1}}  square large source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} />
      ),
      */
    title: JSON.stringify(itemId),
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#626262',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}

FlatListItemSeparator = () => {
  return (
    <View style={{
       height: .5,
       width:"100%",
       backgroundColor:"rgba(0,0,0,0.5)",
  }}
  />
  );
  }
  renderItem=(data)=>
  <TouchableOpacity >
  <Text style={styles.lightText}>{data.item.gender}</Text>
  </TouchableOpacity>

  render() {

    if(this.state.loading){
      return( 
        <View > 
          <ActivityIndicator size="large" color="red"/>
        </View>
    )}

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    const name = navigation.getParam('name');
    const imgUrl = navigation.getParam('imgUrl');
    const description = navigation.getParam('description');

    return (     
      
      <Container style={{alignItems: 'center', backgroundColor: '#F1F1F1'}}>            
      <Content>
      <Card transparent style={{alignItems: 'center', backgroundColor: '#F1F1F1'}}>            
        <Text>{name}</Text>
      </Card>
      <Thumbnail square source={{uri:imgUrl}}
       style={{margin:10,alignItems: 'center', height:200, width:300}} />
      <Card transparent style={{paddingLeft:10}}>            
      <Text style={{fontSize:12}}>{description}</Text>
      </Card>

      <View>
 <FlatList
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
    keyExtractor= {item=>item.gender.toString()}
 />
</View>

      </Content>
      <Footer>
        <FooterTab>        
            <Button transparent>
              <Icon  name="thumbs-up" />
              <Text>12</Text>
            </Button>        
        </FooterTab>        
        <FooterTab>        
            <Button transparent>
              <Icon  name="chatbubbles"/>     
              <Text>12</Text>         
            </Button>        
        </FooterTab>        
        <FooterTab>        
            <Button transparent>
              <Icon2  name="facebook-f" />              
            </Button>        
        </FooterTab>        
        <FooterTab>        
            <Button transparent>
              <Icon2  name="twitter" />              
            </Button>        
        </FooterTab> 
        <FooterTab>        
            <Button transparent>
              <Icon2  name="instagram" />              
            </Button>        
        </FooterTab>        
      </Footer>
    </Container>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
   }
});