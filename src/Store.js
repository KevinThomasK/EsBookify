import { combineReducers, createStore } from "redux";
import HomeReducer from "./Redux/HomeReducer";


const rootReducer = combineReducers({
    selectedItems: HomeReducer, // Make sure the key matches the reducer
    // other reducers...
  });
const store = createStore(rootReducer);

export default store;