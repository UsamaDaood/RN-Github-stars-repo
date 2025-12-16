import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme/theme';

const RepoItem = ({ repo, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {repo.description}
        </Text>

        <View style={styles.row}>
          <Icon name="star" size={16} color={Colors.star} />
          <Text style={styles.meta}> {repo.stargazers_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RepoItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    margin: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  desc: {
    color: Colors.textSecondary,
    marginVertical: 6,
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
  },
});
