import { Colors, Metrics, Fonts } from '../../Themes/'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  containerStyle: {
    shadowOffset:{  width: 2,  height: 2,  }, 
    shadowOpacity: 1.0,  
    shadowColor: 'rgba(237,237,253, 0.3)', 
    elevation: 5, 
    shadowRadius: 4, 
    borderRadius: 10,
    marginBottom: 8,
    padding: 2,
  }
});