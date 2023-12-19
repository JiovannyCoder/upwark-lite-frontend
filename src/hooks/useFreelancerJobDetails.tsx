import { useEffect, useState } from "react"
import useAuthContext from "./useAuthContext"
import UpwarkFetchService from "../utils/UpwarkFetchService"

export default function useFreelancerJobDetails(id : string) {
    const { user } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [job, setJob] = useState<job>({} as job)

    const fetchJobDetails = async () => {
        setIsLoading(true)
        setError(null)

        const response = await UpwarkFetchService('proposals/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        })

        if (!response.ok) {
            setIsLoading(false)
            setError('Failed to fetch the job details')
        }

        if (response.ok) {
            const json = await response.json()
            setJob(json)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        // fetch the jobs
        fetchJobDetails()
    }, [])

    return {
        job,
        isLoading,
        error
    }
}
