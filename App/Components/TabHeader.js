import React from 'react'
import { Text } from 'react-native'
import styles from './Styles/TabHeaderStyles'

export const TabHeader = ({ header }) => {
  return (
    <Text style={styles.header}>
      {header}
    </Text>
  );
}