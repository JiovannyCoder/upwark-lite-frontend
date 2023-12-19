import JobCard from "../../../components/JobCard"
import useFreelancerJobs from "../../../hooks/useFreelancerJobs"

export default function FreelancerJobs() {
  const { jobs, error, isLoading } = useFreelancerJobs()

  if(isLoading) {
    return <p>Jobs are loading...</p>
  }
  if(error) {
    return <p className="text-red-500">{error}</p>
  }
  return (
    <div>
        <div>
            { jobs && jobs.map(job => <JobCard key={job._id} job={job} />)}
        </div>
    </div>

  )
}
