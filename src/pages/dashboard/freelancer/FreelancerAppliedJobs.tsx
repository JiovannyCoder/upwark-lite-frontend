import JobCard from "../../../components/JobCard"
import useFreelancerAppliedJobs from "../../../hooks/useFreelancerAppliedJobs"


export default function FreelancerAppliedJobs() {
  const { jobs, error, isLoading } = useFreelancerAppliedJobs()

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
