import { createContext, useReducer, useEffect } from 'react'

// auth context
export const AuthContext = createContext({} as AuthContextType)

// auth reducer function
const AuthReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case "LOGIN" :
            return { user : action.payload as User} 
        case "LOGOUT": 
            return  { user: null }
        default :
        return state
    }
}

// auth provider
export function AuthContextProvider ({children} : ProviderProps) {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) {
            dispatch({type: 'LOGIN', payload: JSON.parse(user)})
        }

    }, [dispatch])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}