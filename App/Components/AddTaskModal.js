import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

export default class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.setModalVisible(!this.props.visible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
