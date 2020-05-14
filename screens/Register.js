import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Alert,
} from 'react-native';
import styles, {IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from './styles';
import logo from '../images/login/logo.png';
import * as firebase from 'firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null,
  };

  handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
          return userCredentials.user.updateProfile({
             displayName: this.state.name 
          });
      })
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  static navigationOptions = {header: null};

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
          <Animated.Image
            source={logo}
            style={[styles.logo, {height: this.imageHeight}]}
          />

          <View style={styles.container}>
          <View style={styles.errorMessage}>
              {this.state.errorMessage && (
                <Text>{this.state.errorMessage}</Text>
              )}
          </View>
            <Text style={styles.welcome}>SIGN UP!</Text>
            <View style={styles.emailContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Name"
                onChangeText={value => this.setState({name: value})}
                value={this.state.name}
              />
              </View>
              <View style={styles.emailContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={value => this.setState({email: value})}
                //onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={value => this.setState({password: value})}
                value={this.state.password}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                <Text style={styles.buttonText}>
                  Sign Up
                </Text>
            </TouchableOpacity>

          </View>
        </Animated.View>
      </View>
    );
  }
}
