import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      const notification = ''
      return notification
    }
  }
})

export const setNotificationAction = (text, ms) => {
  return async dispatch => {
    dispatch(setNotification(text))
    setTimeout(() => dispatch(removeNotification()), ms)

  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer