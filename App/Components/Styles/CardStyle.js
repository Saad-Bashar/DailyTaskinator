import { Colors, Metrics, Fonts } from '../../Themes/'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  containerStyle: {
    shadowOffset:{  width: 0,  height: 2,  }, 
    shadowOpacity: 0.4,  
    shadowColor: 'rgba(0,0,0, 0.3)', 
    elevation: 5, 
    shadowRadius: 4, 
    borderRadius: 4,
    marginBottom: 8,
    padding: 2,
  }
});