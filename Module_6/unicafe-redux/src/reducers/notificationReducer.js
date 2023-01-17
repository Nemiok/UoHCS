import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotificationAction(state, action) {
      const notification = ''
      return notification
    }
  }
})

export const setNotificationAction = (text, ms) => {
  return async dispatch => {
    dispatch(setNotification(text))
    setTimeout(() => dispatch(removeNotificationAction()), ms)

  }
}

export const { setNotification, removeNotificationAction } = notificationSlice.actions
export default notificationSlice.reducer