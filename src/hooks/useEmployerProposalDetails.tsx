import { useEffect, useState } from "react"
import useAuthContext from "./useAuthContext"
import UpwarkFetchService from "../utils/UpwarkFetchService"

export default function useEmployerProposalDetails(id : string) {
    const { user } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [proposal, setProposal] = useState<job>({} as job)

    const fetchProposalDetails = async () => {
        setIsLoading(true)
        setError(null)

        const response = await UpwarkFetchService('proposals/employers/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        })

        if (!response.ok) {
            setIsLoading(false)
            setError('Failed to fetch the proposal details')
        }

        if (response.ok) {
            const json = await response.json()
            setProposal(json)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        // fetch the jobs
        fetchProposalDetails()
    }, [])

    return {
        proposal,
        isLoading,
        error
    }
}
