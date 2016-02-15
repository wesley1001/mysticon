'use strict';

import React from 'react-native';

let {
  Component,
  Dimensions,
  InteractionManager,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

import moment from 'moment';

import EventItem from '../components/EventItem';

import globalStyles from '../globalStyles';

let window = Dimensions.get('window');

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default class ScheduleView extends Component {

  constructor(props) {
    super();

    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID+':'+rowID];
    };

    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs     = [];
    let currentDay = null;

    global.con_data.events.forEach(e => {
      let d = moment.utc(e.datetime, "YYYY-MM-DDThh:mm:ss");
      let day = days[d.day()];
      if (day !== currentDay) {
        console.log("new day", d.day());
        sectionIDs.push(day);
        dataBlob[day] = d;
        rowIDs.push([]);
        currentDay = day;
      }
      rowIDs[rowIDs.length-1].push(e._id);
      dataBlob[day+':'+e._id] = e;
    });
    console.log("BLOB",dataBlob);

    let ds = new ListView.DataSource({
      getRowData     : getRowData,
      getSectionData : getSectionData,
      rowHasChanged           : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      searchResults: []
    };
  }

  handleFilterInput(text) {
    if (text.length > 2) {
      let filteredEvents = global.con_data.events.filter(e => {
        return e.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      this.setState({
        searchResults: filteredEvents,
        filterText: text
      });
      console.log("Displaying events", filteredEvents);
    } else {
      this.setState({
        searchResults: [],
        filterText: text
      });
    }
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={ styles.section }>
        <Text style={ styles.sectionText }>
          { sectionData.format('dddd, MMMM D').toUpperCase() }
        </Text>
      </View>
    );
  }

  renderRow(rowData) {
    return <EventItem key={ rowData.event_id } event_id={ rowData.event_id } />;
  }

  render() {
    return (
      <View>
        { this.state.searchResults.length ? (
          <View>
            <View style={[styles.section, { marginTop: 39 }]}><Text style={ styles.sectionText }>SEARCH RESULTS</Text></View>
            <ScrollView style={ styles.searchResults }>
              { this.state.searchResults.map(sr => (
                <EventItem key={ sr.event_id } event_id={ sr.event_id } />
              ) ) }
            </ScrollView>
          </View>
        ) : (
          <ListView
            style={ styles.scroll }
            dataSource={ this.state.dataSource }
            renderRow={ this.renderRow }
            renderSectionHeader={ this.renderSectionHeader }
          />
        ) }
        <View style={ styles.filterContainer }>
          <TextInput placeholder="Search for an event" style={ styles.filterInput } value={ this.state.filterText } onChangeText={ this.handleFilterInput.bind(this) } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  filterInput: {
    fontSize: 15,
    height: 40
  },
  scroll: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 100,
    marginTop: 39,
    height: window.height - 40,
    position: 'absolute',
      left: 0,
    width: window.width
  },
  searchResults: {
    backgroundColor: '#F8F8F8',
    height: window.height - 40,
    position: 'absolute',
      left: 0,
    width: window.width
  },
  searchResultsHeader: {
    backgroundColor: globalStyles.COLORS.highlight,
    marginTop: 39,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  section: {
    backgroundColor: globalStyles.COLORS.highlight,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.85
  }
});