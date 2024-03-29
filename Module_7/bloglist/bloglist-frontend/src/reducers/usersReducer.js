import { createSlice } from "@reduxjs/toolkit"
import usersServices from "../services/users"

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const getUsersAction = () => {
  return async dispatch => {
    const users = await usersServices.getUsers()
    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer