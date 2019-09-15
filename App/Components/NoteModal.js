import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './Styles/NoteModalStyle';
import Textarea from 'react-native-textarea';

import Modal, {
  ModalTitle,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import { Colors } from '../Themes';

export default class NoteModal extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      text: props.reflection ? props.reflection : '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reflection !== this.props.reflection) {
      this.setState({
        text: this.props.reflection && this.props.reflection[0][1],
      });
    }
  }

  onChange = text => {
    this.props.save(text);
  };

  render() {
    const { visible, closeModal } = this.props;
    const { text } = this.state;

    return (
      <Modal
        visible={visible}
        modalTitle={<ModalTitle title="Today's Journal" />}
        swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
        swipeThreshold={100} // default 100
        onSwipeOut={event => {
          closeModal(false);
        }}
        width={0.9}
        height={0.5}
        modalAnimation={
          new SlideAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
            animationDuration: 350,
          })
        }
      >
        <ModalContent style={styles.container}>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={this.onChange}
            maxLength={500}
            placeholder={'Write your reflection here....'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
            autoFocus={true}
            defaultValue={text}
          />
        </ModalContent>
      </Modal>
    );
  }
}
