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

import HtmlView from 'react-native-htmlview';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';


let aboutText = `
<p>The original MystiCon, which took place over July 4th weekend in 1980 was considered a big party by most, but has recently been revived to take place in our favorite Roanoke, VA location, the Tanglewood Holiday Inn. The location and time of year that MystiCon takes place is one that fans, family and friends alike have come to rely on for an awesome weekend of SciFi, Fantasy and Pop Culture.</p>
<p>This convention was resurrected in 2010 by a collection of cool zany and passionate people that wanted to keep the family-friendly traditions of open gaming, enjoyment of different literature, arts, imaginations and camaraderie any Con-goer will surely enjoy!</p>
<p>We look forward to seeing you there!</p>
<p><em>MystiCon is a 501(c)(3) Non Profit Corporation.</em></p>
`;

export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H1>About This App</H1>
        <HtmlView style={{ fontSize: 16 }} value={ aboutText } />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  }
});