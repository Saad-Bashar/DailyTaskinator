import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts } from '../Themes';
import Input from '../Components/Input';
import { Formik } from 'formik';
import * as yup from 'yup';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';

const validationSchema = yup.object().shape({
  taskName: yup.string().label('Task Name').required(),
  category: yup.string().label('Category').required()
});

class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
    };
  }

  _showStartDateTimePicker = (formikProps) => { 
    Keyboard.dismiss(); 
    this.setState({ isStartDateTimePickerVisible: true, formikProps });
  }

  _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible : false });

  _handleStartDatePicked = (date) => {
    let cusdate = date;
    let startTime = cusdate.getHours() + ":" + cusdate.getMinutes();
    
    this.state.formikProps.setFieldValue('startTime', startTime);
    this._hideStartDateTimePicker();
  };

  _showEndDateTimePicker = (formikProps) => { 
    Keyboard.dismiss(); 
    this.setState({ isEndDateTimePickerVisible: true, formikProps });
  }

  _hideEndDateTimePicker = () => this.setState({ 
    isEndDateTimePickerVisible: false 
  });

  _handleEndDatePicked = (date) => {
    let cusdate = date;
    const hours = date.getHours()
    const mins = ('0' + cusdate.getMinutes()).slice(-2);
    let endTime = hours + ":" + mins;
    
    this.state.formikProps.setFieldValue('endTime', endTime);
    this._hideEndDateTimePicker();
  };

  onChangeCategory = (cat) => {
    this.setState({
      taskCategory: cat
    });
  }

  render() {
    let data = [{
        value: 'Islam',
      }, {
        value: 'Family',
      }, {
        value: 'Work',
    }, {
        value: 'Personal'
    }];

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 40, paddingHorizontal: 25 }}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.bloodOrange, fontSize: Fonts.size.h6 }}>
                Create Task
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.setModalVisible(!this.props.visible);
                }}
              >
                <Icon 
                  name="close"
                  size={20}
                  color={Colors.bloodOrange}
                />
              </TouchableOpacity>
            </View>
            <Formik
              initialValues={{ category: '', taskName: '', taskContent: '', startTime: '', endTime: '' }}
              onSubmit={(values) => {
                console.log('Form Values ', values);
                const { firebase, auth } = this.props;
                const uid = auth.uid;
                firebase.database().ref(`/Users/${uid}/${this.props.selectedDate}`).push(values, function(error) {
                  console.log(error)
                });
              }}
              validationSchema={validationSchema}
            >

              {formikProps => (
                <React.Fragment>  
                  <Dropdown
                    label='Select Categories *'
                    data={data}
                    baseColor={ Colors.bloodOrange }
                    onChangeText={(value) => {formikProps.setFieldValue('category', value);}}
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
                  <Input
                    label={'Start Time'}
                    onFocus={() => this._showStartDateTimePicker(formikProps)}
                    value={formikProps.values['startTime']}
                  />
                  <Input
                    label={'End Time'}
                    onFocus={() => this._showEndDateTimePicker(formikProps)}
                    value={formikProps.values['endTime']}
                  />
                  <TouchableOpacity
                    style={{ width: 150, borderRadius: 5, backgroundColor: Colors.bloodOrange, padding: 10, alignSelf: 'center', marginTop: 60 }}
                    onPress={formikProps.handleSubmit}
                  >
                    <Text style={{ fontSize: Fonts.size.h6, color: Colors.snow, textAlign: 'center', fontWeight: '600' }}>Save</Text>
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
        </View>
      </Modal>
    );
  }
}

export default compose(
  firebaseConnect(() => {}),
  connect(
    (state) => {
      return {
        auth: state.firebase.auth
      }
    } 
  )
)(AddTaskModal);