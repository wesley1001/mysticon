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

import _        from 'lodash';
import HtmlView from 'react-native-htmlview';
import moment   from 'moment';

import globalStyles from '../globalStyles';

import FeedbackButton from '../components/FeedbackButton';
import GuestItem      from '../components/GuestItem';
import TodoButton     from '../components/TodoButton';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class EventDetailView extends Component {

  render() {
    let event = _.find(global.con_data.events, e => e.event_id === this.props.event_id);
    if (!event) {
      Alert.alert("Event "+event.event_id+" not found!");
      return null;
    }
    let formatDate = moment.utc(event.datetime).format('dddd h:mma');
    return (
      <ScrollView style={ styles.view }>
        <H1 style={ globalStyles.h1 }>{ event.title }</H1>
        <Text style={ styles.timeText  }>{ formatDate }</Text>
        <Text style={ styles.locationText  }>{ event.location }</Text>
        <HtmlView value={ event.description } />
        <H4>Guests</H4>
        <View style={[styles.list, globalStyles.floatingList]}>
          { event.guest_list ? event.guest_list.map(g => (
            <GuestItem key={ g } guest_id={ g } />
          )) : null}
        </View>
        <TodoButton event={ event } />
        <FeedbackButton subject={ event.title } />
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  list: {
    marginBottom: 30
  },
  timeText: {
    color: '#666666',
    fontSize: 15
  },
  locationText: {
    color: '#77F',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10
  }
});