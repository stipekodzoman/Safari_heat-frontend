import { ReactNode, createContext, useEffect, useReducer } from 'react'

const initial_state = {
   user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")): null,
   accessToken:localStorage.getItem("accessToken") !== null ? JSON.parse(localStorage.getItem("accessToken")) : null,
}

export const AuthContext = createContext(initial_state)

const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            user: action.username,
            accessToken:action.token,
         }
      case 'LOGOUT':
         return {
            ...state,
            user: null,
            accessToken:null,
         }
      default:
         return state
   }
}


export const AuthProvider = ({ children }) => {

   const [state, dispatch] = useReducer(AuthReducer, initial_state)

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user))
      localStorage.setItem("accessToken", JSON.stringify(state.accessToken))
      
   }, [state.user,state.accessToken])

   return <AuthContext.Provider value={{
      user: state.user,
      accessToken:state.accessToken,
      dispatch,
   }}>
      {children}
   </AuthContext.Provider>
}