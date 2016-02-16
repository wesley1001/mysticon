import React from 'react-native';

let {
  LinkingIOS,
  View,
  TouchableOpacity
} = React;

export default class ExternalLink extends React.Component {

  handlePress() {
    LinkingIOS.openURL(this.props.url);
  }

  render() {
    return (
      <TouchableOpacity onPress={ this.handlePress.bind(this) }>
        { this.props.children }
      </TouchableOpacity>
    );
  }

}
