import ProposalCard from "../../../components/ProposalCard"
import useEmployerJProposals from "../../../hooks/useEmployerJProposals"

export default function EmployerProposal() {
  const { proposals, error, isLoading } = useEmployerJProposals()

  if(isLoading) {
    return <p>Jobs are loading...</p>
  }
  if(error) {
    return <p className="text-red-500">{error}</p>
  }
  return (
    <div>
        <div>
            { proposals && proposals.map(job => <ProposalCard key={job._id} proposal={job} />)}
        </div>
    </div>

  )
}
