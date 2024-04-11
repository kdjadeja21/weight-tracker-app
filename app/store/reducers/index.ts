import { combineReducers } from "redux";
import authReducer from "./authSlice";
import weightReducer from "./weightSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  weight: weightReducer,
});

export default rootReducer;
