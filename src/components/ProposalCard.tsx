import { Link } from "react-router-dom"

type props = {
    proposal : job
}

export default function ProposalCard({ proposal }: props) {
  return (
    <div className="bg-white px-4 py-5 mb-5 relative">
        <h2 className="text-primary text-lg mb-2">
            <Link to={proposal._id}>{proposal.title}</Link>
            {proposal.candidates.length > 0 && <span className="text-sm italic border-2 px-1 py-0.5 ml-2 rounded inline-flex items-center text-gray-500"> {proposal.candidates.length} Canditate{proposal.candidates.length > 1 ? 's' : ''}</span>}
        </h2>
        <h4 className="text-sm italic text-gray-500">{proposal.createdAt}</h4>
        <p className="truncate mt-3">{proposal.details}</p>
        <span className="absolute top-5 right-4 font-semibold text-gray-600">{proposal.price} $</span>
    </div>
  )
}
