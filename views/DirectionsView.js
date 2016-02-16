'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import HtmlView from 'react-native-htmlview';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';
import ExternalLink from '../components/ExternalLink';


export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <View style={{ marginHorizontal: 10 }}>
          <H3>Convention Maps</H3>
        </View>
        <TouchableOpacity style={ styles.btn } onPress={ () => Actions.hotelMap() }>
          <Text style={ styles.btnText }>Hotel Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.btn } onPress={ () => Actions.parkingMap() }>
          <Text style={ styles.btnText }>Parking Map</Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10 }}>
          <H3>Hotel Info</H3>
        </View>
        <View style={ styles.btn }>
          <ExternalLink url="http://google.com">
            <Text style={[ styles.address, { fontWeight: 'bold' }]}>Holiday Inn – Tanglewood</Text>
            <Text style={ styles.address }>4468 Starkey Road, SW</Text>
            <Text style={ styles.address }>Roanoke, VA 24018</Text>
          </ExternalLink>
        </View>
        <View style={ styles.btn }>
          <ExternalLink url="tel://5407744400">
            <Text style={ styles.phone }>540-774-4400</Text>
          </ExternalLink>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  address: {
    color: globalStyles.COLORS.highlightDark,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  btn: {
    borderColor: globalStyles.COLORS.border,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  btnText: {
    color: '#548',
    fontSize: 16,
    textAlign: 'center'
  },
  phone: {
    color: globalStyles.COLORS.highlightDark,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});