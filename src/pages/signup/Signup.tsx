import {SyntheticEvent, useState} from "react";
import useSignup from "../../hooks/useSignup";

export default function Signup() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState<'employer' | 'freelancer'>('freelancer')
    const [password, setPassword] = useState('')

    const {error, signup, isLoading } = useSignup()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await signup(name, email, type, password)
    }

    return (
        <div className="bg-white max-w-md p-8 shadow rounded my-8 mx-auto">
            <h2 className="text-primary text-2xl font-semibold mb-5 text-center">Sign up</h2>
            <form className="w-full" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name"
                           className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                           onChange={e => setName(e.target.value)}
                           value={name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"
                           className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                    />
                </div>
                <div>
                    <label htmlFor="type">Account type</label>
                    <select name="type" id="type" 
                        className="block my-3 p-2.5 w-full focus:outline-none border-2 rounded focus:border-primary"
                        onChange={e => setType(e.target.value as 'employer' | 'freelancer')}
                        value={type}
                    >
                        <option value="freelancer">Freelancer</option>
                        <option value="employer">Employer</option>
                    </select>
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
                    <button type="submit" disabled={isLoading} className="bg-primary block hover:bg-emerald-600 duration-500 text-white py-2 px-5 rounded my-3">Sign
                        up
                    </button>
                </div>
                {error && <div className="bg-red-200 p-5 text-red-500 rounded">{error}</div>}
            </form>
        </div>
    )
}
