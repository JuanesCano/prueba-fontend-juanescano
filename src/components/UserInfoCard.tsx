import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { User } from '../../types/user'

type UserInfoCardProps = {
  user: User
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoValue}>{user.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Website:</Text>
        <Text style={styles.infoValue}>{user.website}</Text>
      </View>

      <Text style={styles.sectionTitle}>Address</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Street:</Text>
        <Text style={styles.infoValue}>{user.address.street}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Suite:</Text>
        <Text style={styles.infoValue}>{user.address.suite}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>City:</Text>
        <Text style={styles.infoValue}>{user.address.city}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Zipcode:</Text>
        <Text style={styles.infoValue}>{user.address.zipcode}</Text>
      </View>

      <Text style={styles.sectionTitle}>Company</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Name:</Text>
        <Text style={styles.infoValue}>{user.company.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Motto:</Text>
        <Text style={styles.infoValue}>"{user.company.catchPhrase}"</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>BS:</Text>
        <Text style={styles.infoValue}>{user.company.bs}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
})
