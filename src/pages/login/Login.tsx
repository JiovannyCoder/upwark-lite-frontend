import {SyntheticEvent, useState} from "react";
import useLogin from "../../hooks/useLogin";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="bg-white max-w-md p-8 shadow rounded my-8 mx-auto">
            <h2 className="text-primary text-2xl font-semibold mb-5 text-center">Log in</h2>
            <form className="w-full" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"
                           className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                           className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                    />
                </div>
                <div className="my-4">
                    <button type="submit" disabled={isLoading} className="bg-primary block hover:bg-emerald-600 duration-500 text-white py-2 px-5 rounded my-3">
                        Log in
                    </button>
                </div>
                {error && <div className="bg-red-200 p-5 text-red-500 rounded">{error}</div>}
            </form>
        </div>
    )
}
