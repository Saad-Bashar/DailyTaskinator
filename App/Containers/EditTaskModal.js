import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts, Metrics } from '../Themes';
import Input from '../Components/Input';
import { Formik } from 'formik';
import * as yup from 'yup';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
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

class EditTaskModal extends Component {
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

  delete = () => {
    const { firebase, selectedDate, setModalVisible, visible, item, deviceId } = this.props;
    firebase
      .database()
      .ref(`/Users/${deviceId.id}/${selectedDate}/${item[0]}`)
      .remove();
    setModalVisible(!visible);
    showMessage({
      message: 'Deleted Successfully!',
      type: 'danger',
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

    const { taskName, taskContent, startTime, endTime, category } = this.props.item[1];
    const { selectedDate, item } = this.props;
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
        <View style={{ marginTop: Metrics.navBarHeight, paddingHorizontal: 25 }}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.bloodOrange, fontSize: Fonts.size.h6 }}>Edit Task</Text>
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
                category: category,
                taskName: taskName,
                taskContent: taskContent,
                startTime: startTime,
                endTime: endTime,
              }}
              onSubmit={values => {
                console.log('Form Values ', values);
                const { firebase, deviceId } = this.props;

                firebase
                  .database()
                  .ref(`/Users/${deviceId.id}/${selectedDate}/${item[0]}`)
                  .update({
                    taskName: values.taskName,
                    category: values.category,
                    taskContent: values.taskContent,
                    startTime: values.startTime,
                    endTime: values.endTime,
                  });
                this.props.setModalVisible(!this.props.visible);
                showMessage({
                  message: 'Updated Successfully!',
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
                    value={formikProps.values['category']}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched['category'] && formikProps.errors['category']}
                  </Text>
                  <Input
                    label={'Task Name *'}
                    onChangeText={formikProps.handleChange('taskName')}
                    onBlur={formikProps.handleBlur('taskName')}
                    value={formikProps.values['taskName']}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched['taskName'] && formikProps.errors['taskName']}
                  </Text>
                  <Input
                    label={'Task Content'}
                    multiline={true}
                    onChangeText={formikProps.handleChange('taskContent')}
                    value={formikProps.values['taskContent']}
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

                  <View style={{ flexDirection: 'row', marginTop: 60, justifyContent: 'center' }}>
                    <TouchableOpacity
                      style={{ width: 150, borderRadius: 5, backgroundColor: Colors.bloodOrange, padding: 10 }}
                      onPress={formikProps.handleSubmit}
                    >
                      <Text
                        style={{ fontSize: Fonts.size.h6, color: Colors.snow, textAlign: 'center', fontWeight: '600' }}
                      >
                        Update
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ width: 150, borderRadius: 5, backgroundColor: Colors.fire, padding: 10, marginLeft: 10 }}
                      onPress={this.delete}
                    >
                      <Text
                        style={{ fontSize: Fonts.size.h6, color: Colors.snow, textAlign: 'center', fontWeight: '600' }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
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
        </View>
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
)(EditTaskModal);
