import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    // marginTop: Metrics.doubleSection,
    height: Metrics.images.large,
    width: Metrics.images.large,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
