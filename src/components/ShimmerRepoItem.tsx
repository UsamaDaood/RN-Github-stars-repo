import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/theme';

const ShimmerRepoItem = () => {
  return (
    <LinearGradient
      colors={[Colors.gradient_1, Colors.gradient_2, Colors.gradient_3]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.lineLarge} />
        <View style={styles.lineSmall} />
        <View style={styles.lineMedium} />
      </View>
    </LinearGradient>
  );
};

export default ShimmerRepoItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 12,
    borderRadius: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.bgColor,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  lineLarge: {
    height: 14,
    width: '70%',
    backgroundColor: Colors.bgColor,
    borderRadius: 6,
  },
  lineMedium: {
    height: 12,
    width: '50%',
    backgroundColor: Colors.bgColor,
    borderRadius: 6,
    marginTop: 8,
  },
  lineSmall: {
    height: 10,
    width: '90%',
    backgroundColor: Colors.bgColor,
    borderRadius: 6,
    marginTop: 8,
  },
});
