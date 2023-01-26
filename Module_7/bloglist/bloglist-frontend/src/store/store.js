import { configureStore } from "@reduxjs/toolkit"
import blogsReducer from "../reducers/blogsReducer"
import notificationReducer from "../reducers/notificationReducer"
import passwordReducer from "../reducers/passwordReducer"
import usernameReducer from "../reducers/usernameReducer"
import userReducer from "../reducers/userReducer"
import usersReducer from "../reducers/usersReducer"

const store = configureStore({
  reducer: {
    username: usernameReducer,
    password: passwordReducer,
    user: userReducer,
    blogs: blogsReducer,
    users: usersReducer,
    notification: notificationReducer
  }
})

export default store