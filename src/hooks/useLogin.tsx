import { useState } from 'react'
import useAuthContext from './useAuthContext'
import UpwarkFetchService from '../utils/UpwarkFetchService'

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await UpwarkFetchService('user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if(response.ok) {
            // update the authContext
            dispatch({ type: 'LOGIN', payload: json })

            // save the user in the storage
            localStorage.setItem('user', JSON.stringify(json))

            setIsLoading(false)
        }

        return json
    }

    return { isLoading, error, login }

}
