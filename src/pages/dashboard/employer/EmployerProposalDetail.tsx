import { Link, useParams } from 'react-router-dom'
import useEmployerProposalDetails from '../../../hooks/useEmployerProposalDetails'
import { useState } from 'react'
import RemoveButton from './RemoveButton'

export default function EmployerProposalDetail() {
  const { id } = useParams()
  const { proposal, error, isLoading } = useEmployerProposalDetails(id as string)

  if (isLoading) {
    return <p>Job is loading...</p>
  }
  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div>
      <div className="bg-white px-4 py-5 mb-5 relative">
        <h2 className="text-primary text-2xl mb-3">
          {proposal.title}
        </h2>
        <h4 className="text-sm italic mb-2 text-gray-500">{proposal.createdAt}</h4>
        <RemoveButton id={proposal._id} />
        <p className="my-4">{proposal.details}</p>
        <span className="absolute top-5 right-4 font-semibold text-gray-600">{proposal.price} $</span>
      </div>

      {proposal.candidates?.length == 0 && <div className="bg-green-100 px-4 py-5 mb-5 relative">This proposal has no candidates for the moment</div>}
      {proposal.candidates?.length > 0 && (
        <div className="bg-white px-4 py-5 mb-5 relative border-t-4 border-primary">
          <h2 className="text-primary text-xl mb-3">Proposal's candidatures</h2>

          {proposal.candidates.map(candiature => <CandidatureCard key={candiature._id} candidature={candiature} />)}
        </div>
      )}
      <Link to="/dashboard/proposals" className="hover:text-primary"> {'<-'} Return to proposal</Link>
    </div>
  )
}

type candidatureProps = {
  candidature: {
    message: string,
    freelancer_id: {
      name: string,
      email: string
    },
    _id: string,
    createdAt: string,
    updatedAt: string
  }
}

const CandidatureCard = ({ candidature }: candidatureProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className="bg-green-50 px-4 py-5 mb-5 relative">
      <h3 className="text-lg">{candidature.freelancer_id.name}</h3>
      <h4 className="font-semibold text-gray-600">{candidature.freelancer_id.email}</h4>
      <span className="absolute top-5 right-4 text-sm text-gray-700">{candidature.createdAt}</span>
      <p className="italic">Motivation letter : </p>
      <p className={show ? 'text-justify' : 'text-justify truncate'}>{candidature.message}</p>
      <button className="mt-3 text-primary" onClick={() => setShow(!show)}>
        {show ? 'Show less' : 'Read more'}
      </button>
    </div>
  )
}