import { combineReducers } from "redux";
import authReducer from "./slices/auth/authSlice";

export default function createRootReducer() {
  return combineReducers({
    auth: authReducer,
  });
}