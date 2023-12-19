import { useEffect, useState } from "react"
import useAuthContext from "./useAuthContext"
import UpwarkFetchService from "../utils/UpwarkFetchService"


export default function useFreelancerJobs() {
    const { user } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [jobs, setJobs] = useState<job[]>([] as job[])

    const fetchJobs = async () => {
        setIsLoading(true)
        setError(null)

        const response = await UpwarkFetchService('proposals/freelancers', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        })

        if (!response.ok) {
            setIsLoading(false)
            setError('Failed to fetch the jobs')
        }

        if (response.ok) {
            const json = await response.json()
            setJobs(json)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        // fetch the jobs
        fetchJobs()
    }, [])

    return {
        jobs,
        isLoading,
        error
    }
}
