import { Link } from "react-router-dom"

type props = {
    job : job
}

export default function JobCard({ job }: props) {
  return (
    <div className="bg-white px-4 py-5 mb-5 relative">
        <h2 className="text-primary text-lg mb-2">
            <Link to={job._id}>{job.title}</Link>
            {job.candidates.length > 0 && <span className="text-sm italic border-2 px-1 py-0.5 ml-2 rounded inline-flex items-center text-gray-500"> {job.candidates.length} Canditate{job.candidates.length > 1 ? 's' : ''}</span>}
        </h2>
        <h4 className="text-sm italic text-gray-500">{job.createdAt}</h4>
        <h4 className="text-gray-800">@{job.user_id.name}</h4>
        <p className="truncate">{job.details}</p>
        <span className="absolute top-5 right-4 font-semibold text-gray-600">{job.price} $</span>
    </div>
  )
}
