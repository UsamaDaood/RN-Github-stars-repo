import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme/theme';

const { width } = Dimensions.get('window');

const RepoModal = ({ visible, repo, onClose }: any) => {
  if (!repo) return null;

  // Function to share repo URL
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this GitHub repository: ${repo.html_url}`,
        url: repo.html_url,
        title: repo.name,
      });
    } catch (error) {
      console.error('Error sharing repository:', error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Modal Header with Gradient */}
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.header}
          >
            <Text style={styles.title}>{repo.name}</Text>

            {/* Share Button */}
            <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
              <Icon name="share" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Modal Content */}
          <View style={styles.content}>
            <Image
              source={{ uri: repo.owner.avatar_url }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{repo.owner.login}</Text>
            {repo.description && (
              <Text style={styles.desc}>{repo.description}</Text>
            )}
            <View style={styles.row}>
              <Icon name="star" size={20} color={Colors.star} />
              <Text style={styles.meta}> {repo.stargazers_count} Stars</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RepoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.85,
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  shareBtn: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  desc: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 14,
    marginLeft: 4,
  },
});
