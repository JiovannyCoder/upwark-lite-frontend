import useAuthContext from '../../../hooks/useAuthContext'

export default function Profil() {
  const { user } = useAuthContext()

  return (
    <div className="bg-white py-5 px-4">
      <h2 className="text-xl my-4">Welcome to your profil page {user?.name} </h2>
      <p>Username : {user?.name}</p>
      <p>Account type : {user?.type}</p>
    </div>
  )
}
