import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import useAuthContext from "../../hooks/useAuthContext";

export default function Dashboard() {
    const { user } = useAuthContext()

    const router = useNavigate()
    useEffect(() => {
        router('profil')
    }, [])

    return (
        <div>
            {user?.type == 'freelancer' && (
                <div className="grid grid-cols-3">
                    <NavLink className="dashboard-link" to="jobs">Jobs</NavLink>
                    <NavLink className="dashboard-link" to="applied-jobs">Applied Jobs</NavLink>
                    <NavLink className="dashboard-link" to="profil">Profil</NavLink>
                </div>
            )}
            {user?.type == 'employer' && (
                <div className="grid grid-cols-3">
                    <NavLink className="dashboard-link" to="create-proposal">Make a proposal</NavLink>
                    <NavLink className="dashboard-link" to="proposals">My proposals</NavLink>
                    <NavLink className="dashboard-link" to="profil">Profil</NavLink>
                </div>
            )}
            <div className="my-5">
                <Outlet />
            </div>
        </div>
    )
}
