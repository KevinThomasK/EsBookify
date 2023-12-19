export const STORE_IDENTIFIER ="STORE_IDENTIFIER"
export const STORE_SLOTDETAILS ="STORE_SLOTDETAILS"
export const STORE_SLOTCOUNT ="STORE_SLOTCOUNT"
export const STORE_NOTIFICATION ="STORE_NOTIFICATION"


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
export function storeNotification(payload){
    return{
        type: STORE_NOTIFICATION,
        payload: payload
    }
}
