import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './Styles/FloatingButtonStyle';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FloatingButton extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    const { color, addAction, noteAction } = this.props;
    return (
      <ActionButton buttonColor={color}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          textStyle={{ color: '#9b59b6' }}
          title="New Task"
          onPress={() => addAction(true)}
        >
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          textStyle={{ color: '#3498db' }}
          title="Today's Journal"
          onPress={() => noteAction(true)}
        >
          <Icon name="md-journal" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
