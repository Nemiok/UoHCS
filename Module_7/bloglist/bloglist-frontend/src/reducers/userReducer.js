import { createSlice } from "@reduxjs/toolkit"
import services from "../services/blogs"

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const setUserAction = (user) => {
  return dispatch => {
    services.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer