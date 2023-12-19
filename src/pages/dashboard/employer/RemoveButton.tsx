import { useState } from "react"
import useAuthContext from "../../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UpwarkFetchService from "../../../utils/UpwarkFetchService"

type props = {
    id: string
}

export default function RemoveButton({ id }: props) {
    const { user } = useAuthContext()
    const router = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleClick = async () => {
        setLoading(true)
        setError('')

        const response = await UpwarkFetchService('proposals/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        })

        if (!response.ok) {
            setError('Failed to remove your proposal')
            setLoading(false)
        }
        if (response.ok) {
            setLoading(false)
            router('/dashboard/proposals')
        }

    }
    return (
        <div className="my-3">
            <button
                className="px-4 py-2 bg-red-100 text-sm text-red-500 rounded-md inline-flex justify-center items-center disabled:bg-red-200"
                onClick={() => handleClick()}
                disabled={loading}
            >
                {loading ? 'Removing...' : 'Remove'}
            </button>
           {error &&  <p className="text-sm text-red-500 mt-3">{error}</p>}
        </div>
    )
}
