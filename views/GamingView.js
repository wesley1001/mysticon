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

import dataStore    from '../dataStore';
import globalStyles from '../globalStyles';
import GamingItem   from '../components/GamingItem';

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
    let ds = new ListView.DataSource({
      getRowData     : getRowData,
      getSectionData : getSectionData,
      rowHasChanged           : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource: ds
    }
  }

  componentWillMount() {
    dataStore.fetchGaming()
      .then(resp => {
        this.setupDataSource(resp);
      })
  }

  setupDataSource(eventArray) {
    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs     = [];
    let currentDay = null;

    eventArray.forEach((e, index) => {
      let d = moment.utc(e.datetime, "YYYY-MM-DDThh:mm:ss");
      let day = days[d.day()];
      if (day !== currentDay) {
        sectionIDs.push(day);
        dataBlob[day] = d;
        rowIDs.push([]);
        currentDay = day;
      }
      rowIDs[rowIDs.length-1].push(""+index);
      dataBlob[day+':'+index] = e;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });
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
    return <GamingItem key={ rowData } event={ rowData } />;
  }

  render() {
    return (
      <ListView
        style={ styles.scroll }
        dataSource={ this.state.dataSource }
        renderRow={ this.renderRow }
        renderSectionHeader={ this.renderSectionHeader }
      />
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  section: {
    backgroundColor: globalStyles.COLORS.highlight,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.85
  }
});