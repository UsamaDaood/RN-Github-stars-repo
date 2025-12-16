import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/theme';

const Header = ({ selected, onChange, search, onSearch }: any) => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>🔥 Trending Repositories</Text>

      <TextInput
        placeholder="Search repositories..."
        placeholderTextColor="#EEE"
        value={search}
        onChangeText={onSearch}
        style={styles.search}
      />

      <View style={styles.tabs}>
        {[1, 7].map(days => (
          <TouchableOpacity
            key={days}
            onPress={() => onChange(days)}
            style={[styles.tab, selected === days && styles.activeTab]}
          >
            <Text style={styles.tabText}>
              {days === 1 ? 'Today' : 'Last 7 Days'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  search: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    color: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 12,
  },
  tab: {
    padding: 8,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeTab: {
    backgroundColor: Colors.white,
  },
  tabText: {
    color: '#000',
    fontSize: 13,
  },
});
