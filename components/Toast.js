import React from 'react-native';

let {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  Text
} = React;

let window = Dimensions.get("window");


export default class Toast extends React.Component {

  constructor() {
    super();
    this.state = {
      text: 'ERROR',
      bottom: new Animated.Value(-60)
    }
  }

  componentWillMount() {
    global.makeToast = (text) => {
      this.setState({
        text: text
      });

      // add
      Animated.timing(
        this.state.bottom,
        { toValue: 60 }
      ).start();

      // remove
      setTimeout(() => {
        Animated.timing(
          this.state.bottom,
          { toValue: -60 }
        ).start();
      }, 2000);
    }
  }

  render() {
    return (
      <Animated.View style={[ styles.toast, { bottom: this.state.bottom } ]}>
        <Text style={ styles.text }>{ this.state.text }</Text>
      </Animated.View>
    );
  }

}


let styles = StyleSheet.create({
  toast: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    opacity: 0.9,
    paddingVertical: 10,
    position: 'absolute',
      bottom: 60,
      left: 60,
      right: 60,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 20
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 30
  }
});