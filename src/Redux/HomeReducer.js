import { STORE_IDENTIFIER, STORE_SLOTCOUNT, STORE_SLOTDETAILS } from "./Action";

const initialState = {
    IdentifiedItem: "user" , 
    slotdetails: [],
    SlotCount:""
}
const HomeReducer = (state = initialState, action) => {
  // console.log('reducer', action.payload)
  switch (action.type) {
    case STORE_IDENTIFIER:
        return Object.assign ({},state,{IdentifiedItem:action.payload})


        case STORE_SLOTDETAILS:
            return Object.assign ({},state,{slotdetails:action.payload})    
      
            case STORE_SLOTCOUNT:
                return Object.assign ({},state,{SlotCount:action.payload})
    default:
        return state;
}
}
export default HomeReducer;

   