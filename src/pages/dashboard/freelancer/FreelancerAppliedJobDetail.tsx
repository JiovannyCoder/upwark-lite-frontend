import { Link, useParams } from 'react-router-dom'
import useFreelancerJobDetails from '../../../hooks/useFreelancerJobDetails'

export default function FreelancerAppliedJobDetail() {
  const { id } = useParams()
  const { job, error, isLoading } = useFreelancerJobDetails(id as string)
  
  if (isLoading) {
    return <p>Job is loading...</p>
  }
  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div>
      <div className="bg-white px-4 py-5 mb-5 relative">
        <h2 className="text-primary text-xl mb-3">
          {job.title}
          {job.candidates?.length > 0 && <span className="text-sm italic border-2 px-1 py-0.5 ml-2 rounded inline-flex items-center text-gray-500"> {job.candidates.length} Canditate{job.candidates.length > 1 ? 's' : ''}</span>}
        </h2>
        <h4 className="text-sm italic mb-2 text-gray-500">{job.createdAt}</h4>
        <h4 className="text-gray-800 mb-2">Proposed by {job.user_id?.name} : </h4>
        <p className="mb-5">{job.details}</p>
        <span className="absolute top-5 right-4 font-semibold text-gray-600">{job.price} $</span>
        
      </div>
      <Link to="/dashboard/jobs" className="hover:text-primary"> {'<-'} Return to jobs</Link>
    </div>
  )
}
