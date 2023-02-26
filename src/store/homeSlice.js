import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    setUrl: (state, action) => {
        state.url = action.payload
    },
    setGenres: (state, action) => {
        state.genres = action.payload
    },
    }
})

// Action creators are generated for each case reducer function
export const { setUrl, setGenres } = homeSlice.actions

export default homeSlice.reducer