export const STORE_IDENTIFIER ="STORE_IDENTIFIER"


export function  storeIdentifier(payload){
    console.log('action', payload)
    return{
        type: STORE_IDENTIFIER,
         payload:payload
    }
}