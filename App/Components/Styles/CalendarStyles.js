import { Colors, Metrics, Fonts } from '../../Themes/';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  calendarStyle: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
  },
  calendarHeaderStyle: {
    color: Colors.bloodOrange,
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: '800',
  },
  dateNumberStyle: {
    color: Colors.bloodOrange,
    fontSize: 15,
    paddingTop: 5,
  },
  dateNameStyle: {
    color: Colors.bloodOrange,
    fontSize: 12,
  },
  highlightDateNumberStyle: {
    color: Colors.snow,
    fontSize: 15,
    backgroundColor: Colors.bloodOrange,
    width: 40,
    height: 30,
    paddingTop: 5,
  },
  highlightDateNameStyle: {
    color: Colors.snow,
    fontSize: 12,
    backgroundColor: Colors.bloodOrange,
    width: 40,
    height: 20,
    paddingTop: 5,
  },
});
