export const STORE_IDENTIFIER ="STORE_IDENTIFIER"
export const STORE_SLOTDETAILS ="STORE_SLOTDETAILS"
export const STORE_SLOTCOUNT ="STORE_SLOTCOUNT"


export function  storeIdentifier(payload){
    console.log('action', payload)
    return{
        type: STORE_IDENTIFIER,
         payload:payload
    }
}

export function  storeSlotdetails(payload){
    console.log('action', payload)
    return{
        type: STORE_SLOTDETAILS,
         payload:payload
    }
}
export function  storeSlotCount(payload){
    console.log('action', payload)
    return{
        type: STORE_SLOTCOUNT,
         payload:payload
    }
}
