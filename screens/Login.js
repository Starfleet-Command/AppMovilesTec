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

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({errorMessage: error.message}));
  }

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
            <Text style={styles.welcome}>WELCOME</Text>
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

            <TouchableOpacity>
              <View style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity type="button" style={styles.button} onPress={this.handleLogin}>
                <Text style={styles.buttonText}>
                  Log in
                </Text>
            </TouchableOpacity>

          </View>
        </Animated.View>
        <View style={styles.normalContainer}>
          <Text style={styles.normalText}>New to the app?</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}>
          <View style={styles.createAccount}>
            <Text style={styles.createText}>Create a new account</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
