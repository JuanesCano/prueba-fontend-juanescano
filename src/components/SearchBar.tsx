import React, { useRef } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'

type SearchBarProps = {
  value: string
  onChange: (text: string) => void
  onClear: () => void
  placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null)

  const dismissKeyboard = () => {
    Keyboard.dismiss()
    inputRef.current?.blur()
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChange}
        clearButtonMode="while-editing"
        returnKeyType="search"
        onSubmitEditing={dismissKeyboard}
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            onClear()
            dismissKeyboard()
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
})