'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import _ from 'lodash';
import HtmlView from 'react-native-htmlview';

import globalStyles from '../globalStyles';

import EventItem from '../components/EventItem';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class GuestDetailView extends Component {

  render() {
    let guest = _.find(global.con_data.guests, g => g.guest_id === this.props.guest_id);
    if (!guest) {
      Alert.alert("Guest "+guest.guest_id+" not found!");
      return null;
    }
    guest.event_list = global.con_data.events
      .filter(e => e.guest_list.includes(guest.guest_id))
      .map(e => e.event_id);

    console.log("GUEST",guest);
    return (
      <ScrollView style={ styles.view }>
        <H1>{ guest.name }</H1>
        <HtmlView value={ guest.bio } />
        <H4>Itinerary</H4>
        <View style={[styles.list, globalStyles.floatingList]}>
          { guest.event_list ? guest.event_list.map(e => (
            <EventItem key={ e } event_id={ e } />
          )) : null}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  list: {
    marginBottom: 50
  }
});