import { STORE_IDENTIFIER, STORE_SLOTDETAILS } from "./Action";

const initialState = {
    IdentifiedItem: "user" , 
    slotdetails: []
}
const HomeReducer = (state = initialState, action) => {
  // console.log('reducer', action.payload)
  switch (action.type) {
    case STORE_IDENTIFIER:
        return Object.assign ({},state,{IdentifiedItem:action.payload})


        case STORE_SLOTDETAILS:
            return Object.assign ({},state,{slotdetails:action.payload})    
      
    default:
        return state;
}
}
export default HomeReducer;

   