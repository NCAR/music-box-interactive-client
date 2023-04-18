import { createStore as reduxCreateStore } from "redux"
import combinedReducer from "../reducers"

const createStore = () => reduxCreateStore(combinedReducer)
export default createStore
