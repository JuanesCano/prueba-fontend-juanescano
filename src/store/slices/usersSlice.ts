import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user'

const API_URL = 'https://jsonplaceholder.typicode.com'

interface UsersState {
  users: User[]
  filteredUsers: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
  searchQuery: string
  page: number
  limit: number
  hasMore: boolean
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchQuery: '',
  page: 1,
  limit: 8,
  hasMore: true,
}

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        users: { page, limit },
      } = getState() as { users: UsersState }
      const response = await fetch(`${API_URL}/users?_page=${page}&_limit=${limit}`)

      if (!response.ok) {
        throw new Error('Failed to get users')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
    }
  }
)

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch user with ID: ${userId}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload

      if (action.payload.trim() === '') {
        state.filteredUsers = state.users
      } else {
        const query = action.payload.toLowerCase()
        state.filteredUsers = state.users.filter(
          (user) =>
            user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
        )
      }
    },
    resetSearch: (state) => {
      state.searchQuery = ''
      state.filteredUsers = state.users
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
    incrementPage: (state) => {
      state.page += 1
    },
    resetPage: (state) => {
      state.page = 1
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false

        if (state.page === 1) {
          state.users = action.payload
        } else {
          const newUsers = action.payload.filter(
            (newUser) => !state.users.some((existingUser) => existingUser.id === newUser.id)
          )
          state.users = [...state.users, ...newUsers]
        }

        if (state.searchQuery.trim() === '') {
          state.filteredUsers = state.users
        } else {
          const query = state.searchQuery.toLowerCase()
          state.filteredUsers = state.users.filter(
            (user) =>
              user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
          )
        }

        state.hasMore = action.payload.length === state.limit
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(getUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.selectedUser = action.payload

        const index = state.users.findIndex((user) => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
          const filteredIndex = state.filteredUsers.findIndex(
            (user) => user.id === action.payload.id
          )
          if (filteredIndex !== -1) {
            state.filteredUsers[filteredIndex] = action.payload
          }
        }
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSearchQuery,
  resetSearch,
  setSelectedUser,
  clearSelectedUser,
  incrementPage,
  resetPage,
} = usersSlice.actions

export default usersSlice.reducer
