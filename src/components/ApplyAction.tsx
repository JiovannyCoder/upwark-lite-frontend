import { useRef, useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UpwarkFetchService from "../utils/UpwarkFetchService"

type props = {
    job: job
}

export default function ApplyAction({ job }: props) {
    const { user } = useAuthContext()
    const router = useNavigate()

    const [applied, setApplied] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement | null>(null)

    const handleClick = () => {
        setApplied(true)
        console.log(inputRef.current)
    }

    const handleApply = async () => {
        // send the proposal
        console.log(message)
        setErrorMessage('')
        setIsLoading(true)

        if(!message || message.trim().length == 0) {
            setErrorMessage("Make your motivation letter with more attractive !")
            setIsLoading(false)
            return 
        }
        
        const response = await UpwarkFetchService('proposals/apply/'+ job._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify({message})
        })
        const json = await response.json()
        if(!response.ok) {
            if(json.error) setErrorMessage(json.error)
            else setErrorMessage('Your candidature cannot be sended properly. Please, try again later.')
        }
        if(response.ok) {
            setApplied(true)
            router('/dashboard/jobs')
        }
        setIsLoading(false)        
    }

    return (
        <div>
            <button 
                className="px-4 py-2 bg-primary text-sm text-white rounded-md inline-flex justify-center items-center disabled:bg-gray-200 disabled:text-green-400"
                onClick={() => handleClick()}
                disabled={applied}
            >
                {applied ? 'Applying...' : 'Apply'}
            </button>

            {applied && (

                <div className="mt-5">
                    <label htmlFor="LMInput">What are your motivations ? </label>
                    <textarea
                        id="LMInput"
                        ref={inputRef}
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        rows={5}
                        className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                        placeholder="Write them here ..."
                    ></textarea>
                    <p className="text-gray-500 italic mb-3 text-sm">{message.length} / 2000 chars</p>
                    {errorMessage && <p className="mb-3 text-red-500 text-sm">{errorMessage}</p>}
                    <button
                        className="px-4 py-2 text-primary text-sm rounded-md inline-flex justify-center items-center border-primary border-2 hover:bg-green-100 duration-300 transition-all disabled:bg-green-300"
                        onClick={handleApply}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending your candidature...' : 'Send my candidature'}
                    </button>

                    <button
                        className="px-4 py-2 text-gray-500 text-sm font-semibold rounded-md inline-flex justify-center items-center hover:bg-green-100 duration-300 transition-all ml-5"
                        onClick={() => setApplied(false)}
                    >
                        Cancel
                    </button>
                </div>

            )}
        </div>
    )
}
