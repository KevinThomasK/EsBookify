import { STORE_IDENTIFIER } from "./Action";



const initialState = {
    IdentifiedItem: ""
}
const HomeReducer = (state = initialState, action) => {
    console.log('reducer', action.payload)
    switch (action.type)  {
    case STORE_IDENTIFIER:
        
        return {
            ...state,
            IdentifiedItem: action.payload,
        };
    default:
        return state;
}
}
export default HomeReducer;

