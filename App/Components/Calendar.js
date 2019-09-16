import React, { Component } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import styles from './Styles/CalendarStyles';
import { Colors } from '../Themes';

export default class Calendar extends Component {
  render() {
    return (
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 300 }}
        style={styles.calendarStyle}
        calendarHeaderStyle={styles.calendarHeaderStyle}
        calendarColor={Colors.snow}
        dateNumberStyle={styles.dateNumberStyle}
        dateNameStyle={styles.dateNameStyle}
        highlightDateNumberStyle={styles.highlightDateNumberStyle}
        highlightDateNameStyle={styles.highlightDateNameStyle}
        iconContainer={{ flex: 0.1 }}
        onDateSelected={this.props.onDateSelected}
      />
    );
  }
}
