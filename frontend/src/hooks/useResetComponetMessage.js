//  Redux
 import { resetMessage } from "../slice/photoSlice";



 export const useResetComponetMessage = (dispatch) => {
    return () => {
        setTimeout(()=> {
           dispatch(resetMessage()) 
        }, 2000)
    }
 }