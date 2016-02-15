import React from 'react-native';

let {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Entypo';

let window = Dimensions.get('window');


class TabIcon extends React.Component {
  handlePress() {
    if (this.props.onPress) {
      this.props.onPress();
      return;
    }
    this.setState({
      selected: true
    });
    Actions[this.props.action]();
  }
  render() {
    return (
      <TouchableOpacity style={ styles.tab } onPress={ this.handlePress.bind(this) }>
        <Icon name={ this.props.icon } color="#558" size={ this.props.iconSize || 20 } />
        <Text style={{ color: '#335' }}>{ this.props.text }</Text>
      </TouchableOpacity>
    );
  }
}

export default class Tabbers extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <TabIcon icon="home"     action="dashboard" text="Home" />
        <TabIcon icon="calendar" action="schedule"  text="Schedule" />
        <TabIcon icon="users"    action="guests"    text="Guests" />
        <TabIcon icon="dots-three-horizontal"  onPress={ this.props.onPressMenuButton } text="More" />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    borderColor: '#CCC',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 54
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 8
  }
});