import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

export default function useAuthContext() {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("useAuthContext hook must be used in a AuthContextProvider")
    }
    return context
}
