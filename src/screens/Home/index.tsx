import { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { getUsers, incrementPage, resetPage, setSearchQuery } from '../../store/slices/usersSlice'
import { User } from '../../types/user'
import { RootStackParamList } from '~/types/navigation'
import { SearchBar } from '~/components/SearchBar'
import { UserList } from '~/components/UserList'
import { lightTheme, darkTheme } from '~/hooks/useColorScheme'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from '~/context/ThemeContext'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useAppDispatch()

  const {
    filteredUsers: users,
    loading,
    error,
    hasMore,
    searchQuery,
  } = useAppSelector((state) => state.users)

  const [refreshing, setRefreshing] = useState(false)

  const {theme, toggleTheme} = useTheme();

  useEffect(() => {
    dispatch(resetPage())
    dispatch(getUsers())
  }, [dispatch])

  const handleUserPress = (user: User) => {
    navigation.navigate('UserDetails', { userId: user.id.toFixed(0) })
  }

  const handleLoadMore = () => {
    if (!loading && hasMore && searchQuery.trim() === '') {
      dispatch(incrementPage())
      dispatch(getUsers())
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await dispatch(resetPage())
    await dispatch(getUsers())
    setRefreshing(false)
  }

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text))
  }
  if (error && !loading && users.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(resetPage())
            dispatch(getUsers())
          }}
          style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback>
       <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}></View>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
            <Icon
              name={theme === lightTheme ? 'sun' : 'moon'}
              size={24}
              color={theme === lightTheme ? '#FFAB00' : '#4C4C4C'} 
            />
            <Text style={[styles.toggleButtonText, { color: theme.text }]}>
              Switch to {theme === lightTheme ? 'Dark' : 'Light'} Mode
            </Text>
          </TouchableOpacity>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          onClear={() => handleSearch('')}
          placeholder="Search with name or email"
        />
        <UserList
          users={users}
          loading={loading}
          hasMore={hasMore}
          refreshing={refreshing}
          searchQuery={searchQuery}
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
          onUserPress={handleUserPress}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  clearButton: {
    position: 'absolute',
    right: 28,
    top: 12,
    padding: 4,
  },
  clearButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
