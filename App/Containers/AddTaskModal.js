import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts, Metrics } from '../Themes';
import Input from '../Components/Input';
import { Formik } from 'formik';
import * as yup from 'yup';
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Timeline from 'react-native-timeline-listview';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

const validationSchema = yup.object().shape({
  taskName: yup
    .string()
    .label('Task Name')
    .required(),
  category: yup
    .string()
    .label('Category')
    .required(),
});

class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
    };
  }

  getAmPmValue = value => {
    let hours = parseInt(value[0]);
    let minutes = parseInt(value[1]);

    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
  };

  _showStartDateTimePicker = formikProps => {
    Keyboard.dismiss();
    this.setState({ isStartDateTimePickerVisible: true, formikProps });
  };

  _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: false });

  _handleStartDatePicked = date => {
    let cusdate = date;
    const hours = date.getHours();
    const mins = ('0' + cusdate.getMinutes()).slice(-2);

    let startTime = hours + ':' + mins;
    startTime = this.getAmPmValue(startTime.split(':'));

    console.log('startTime ', startTime);

    this.state.formikProps.setFieldValue('startTime', startTime);
    this._hideStartDateTimePicker();
  };

  _showEndDateTimePicker = formikProps => {
    Keyboard.dismiss();
    this.setState({ isEndDateTimePickerVisible: true, formikProps });
  };

  _hideEndDateTimePicker = () =>
    this.setState({
      isEndDateTimePickerVisible: false,
    });

  _handleEndDatePicked = date => {
    let cusdate = date;
    const hours = date.getHours();
    const mins = ('0' + cusdate.getMinutes()).slice(-2);
    let endTime = hours + ':' + mins;

    endTime = this.getAmPmValue(endTime.split(':'));

    this.state.formikProps.setFieldValue('endTime', endTime);
    this._hideEndDateTimePicker();
  };

  onChangeCategory = cat => {
    this.setState({
      taskCategory: cat,
    });
  };

  render() {
    let data = [
      {
        value: 'Islam',
      },
      {
        value: 'Family',
      },
      {
        value: 'Work',
      },
      {
        value: 'Personal',
      },
    ];

    const { selectedDate } = this.props;
    let formattedDate = selectedDate && moment.utc(selectedDate).format('dddd DD MMM YY');

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.setModalVisible(!this.props.visible);
        }}
      >
        <ScrollView style={{ marginTop: Metrics.navBarHeight, paddingHorizontal: 25 }}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.bloodOrange, fontSize: Fonts.size.h6 }}>Create Task</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.setModalVisible(!this.props.visible);
                }}
              >
                <Icon name="close" size={20} color={Colors.bloodOrange} />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 16, marginTop: 12, fontWeight: 'bold', color: '#000' }}>{formattedDate}</Text>
            <Formik
              initialValues={{
                category: '',
                taskName: '',
                taskContent: '',
                startTime: '',
                endTime: '',
                isComplete: false,
              }}
              onSubmit={values => {
                const { firebase } = this.props;
                const { deviceId, selectedDate } = this.props;

                firebase
                  .database()
                  .ref(`/Users/${deviceId.id}/${selectedDate}`)
                  .push(values, function(error) {
                    console.log(error);
                  });

                this.props.setModalVisible(!this.props.visible);

                showMessage({
                  message: 'Task Added Successfully',
                  type: 'success',
                });
              }}
              validationSchema={validationSchema}
            >
              {formikProps => (
                <React.Fragment>
                  <Dropdown
                    label="Select Categories *"
                    data={data}
                    baseColor={Colors.bloodOrange}
                    onChangeText={value => {
                      formikProps.setFieldValue('category', value);
                    }}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched['category'] && formikProps.errors['category']}
                  </Text>

                  <Input
                    label={'Task Name *'}
                    onChangeText={formikProps.handleChange('taskName')}
                    onBlur={formikProps.handleBlur('taskName')}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched['taskName'] && formikProps.errors['taskName']}
                  </Text>

                  <Input
                    label={'Task Content'}
                    multiline={true}
                    onChangeText={formikProps.handleChange('taskContent')}
                  />

                  <TouchableOpacity
                    style={{ borderBottomColor: Colors.bloodOrange, borderBottomWidth: 1, marginVertical: 25 }}
                    onPress={() => this._showStartDateTimePicker(formikProps)}
                  >
                    <Text style={{ color: Colors.bloodOrange, fontSize: 16, paddingVertical: 10 }}>
                      {formikProps.values['startTime'] ? formikProps.values['startTime'] : 'Start Time'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ borderBottomColor: Colors.bloodOrange, borderBottomWidth: 1 }}
                    onPress={() => this._showEndDateTimePicker(formikProps)}
                  >
                    <Text style={{ color: Colors.bloodOrange, fontSize: 16, paddingVertical: 10 }}>
                      {formikProps.values['endTime'] ? formikProps.values['endTime'] : 'End Time'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: 150,
                      borderRadius: 5,
                      backgroundColor: Colors.bloodOrange,
                      padding: 10,
                      alignSelf: 'center',
                      marginTop: 60,
                      marginBottom: 25,
                    }}
                    onPress={formikProps.handleSubmit}
                  >
                    <Text
                      style={{ fontSize: Fonts.size.h6, color: Colors.snow, textAlign: 'center', fontWeight: '600' }}
                    >
                      Add
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              )}
            </Formik>
            <DateTimePicker
              isVisible={this.state.isStartDateTimePickerVisible}
              mode="time"
              onConfirm={this._handleStartDatePicked}
              onCancel={this._hideStartDateTimePicker}
            />
            <DateTimePicker
              isVisible={this.state.isEndDateTimePickerVisible}
              mode="time"
              onConfirm={this._handleEndDatePicked}
              onCancel={this._hideEndDateTimePicker}
            />
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

export default compose(
  firebaseConnect(() => {}),
  connect(state => {
    return {
      auth: state.firebase.auth,
      deviceId: state.deviceId,
    };
  })
)(AddTaskModal);
