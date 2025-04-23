import React from 'react'
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { User } from '~/types/user'

interface UserListProps {
  users: User[]
  loading: boolean
  hasMore: boolean
  refreshing: boolean
  searchQuery: string
  onRefresh: () => void
  onLoadMore: () => void
  onUserPress: (user: User) => void
}

export const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  hasMore,
  refreshing,
  searchQuery,
  onRefresh,
  onLoadMore,
  onUserPress,
}) => {
  const renderUserItem = ({ item }: { item: User }) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&size=128&color=fff`
    return (
      <TouchableOpacity onPress={() => onUserPress(item)} style={styles.userItem}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderFooter = () => {
    if (!loading || refreshing || searchQuery.trim() !== '') return null
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  const renderEmpty = () => {
    if (loading && users.length === 0) return null
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery.trim() !== '' ? 'No users found matching your search' : 'No users found'}
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderUserItem}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
    />
  )
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#3b82f6',
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
  listContent: {
    padding: 16,
  },
})
