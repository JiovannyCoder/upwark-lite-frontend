import { useState } from 'react'
import useAuthContext from './useAuthContext'
import UpwarkFetchService from '../utils/UpwarkFetchService'

export default function useSignup() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { dispatch } = useAuthContext()

    const signup = async (name: string, email: string, type: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await UpwarkFetchService('user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, type, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            // update the authContext
            dispatch({ type: 'LOGIN', payload: json })

            // save the user in the storage
            localStorage.setItem('user', JSON.stringify(json))

            setIsLoading(false)
        }

        return json
    }

    return { isLoading, error, signup }

}
