import { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { getUserById } from '../../store/slices/usersSlice'
import { RootStackParamList } from '~/types/navigation'
import { UserInfoCard } from '~/components/UserInfoCard'

import { lightTheme, darkTheme } from '~/hooks/useColorScheme'
import { useTheme } from '~/context/ThemeContext'

type UserDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetails'>

export const UserDetailsScreen = ({ route }: UserDetailsScreenProps) => {
  const { userId } = route.params
  const dispatch = useAppDispatch()

  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState(lightTheme)
  const scheme = useColorScheme()

  const { selectedUser: user, loading, error } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUserById(Number(userId)))
  }, [dispatch, userId])

  useEffect(() => {
    if (scheme === 'dark') {
      setCurrentTheme(darkTheme)
    } else {
      setCurrentTheme(lightTheme)
    }
  }, [scheme])

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme)
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(getUserById(Number(userId)))}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.notFoundText}>User not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
      {/* <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={[styles.toggleButtonText, { color: currentTheme.text }]}>
          Switch to {currentTheme === lightTheme ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity> */}

    <View style={styles.profileHeader}>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${user.name}&size=200&background=random`,
        }}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userHandle}>@{user.username}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
    <UserInfoCard user={user} />
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notFoundText: {
    fontSize: 16,
    color: '#6b7280',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#3b82f6',
  },
})
