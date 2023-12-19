import { useEffect, useState } from "react"
import useAuthContext from "./useAuthContext"
import UpwarkFetchService from "../utils/UpwarkFetchService"


export default function useEmployerJProposals() {
    const { user } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [proposals, setProposal] = useState<job[]>([] as job[])

    const fetchJobs = async () => {
        setIsLoading(true)
        setError(null)

        const response = await UpwarkFetchService('proposals/employers', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        })

        if (!response.ok) {
            setIsLoading(false)
            setError('Failed to fetch the proposals')
        }

        if (response.ok) {
            const json = await response.json()
            setProposal(json)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        // fetch the jobs
        fetchJobs()
    }, [])

    return {
        proposals,
        isLoading,
        error
    }
}
