import { SyntheticEvent, useState } from "react"
import useAuthContext from "../../../hooks/useAuthContext"
import UpwarkFetchService from "../../../utils/UpwarkFetchService"

export default function CreateProposal() {
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        setLoading(true)
        setError('')
        setSuccess('')

        // frontend validation
        if(
            (!title || title.trim().length == 0) ||
            (!details || details.trim().length == 0)||
            (!price )
        ) {
            setError("All field are required !")
            setLoading(false)
            return 
        }

        if(parseInt(price) < 0) {
            setError("Invalid price ! Negative values are forbiden !")
            setLoading(false)
            return
        }

        const response = await UpwarkFetchService('proposals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify({ title, details, price })
        })
        if (!response.ok) {
            if(response.status === 404) setError('Failed to publish the proposal !')
            else {
                const json = await response.json()
                if (json.error) setError(json.error)
                else setError('Failed to publish the proposal !')
            }
        }
        if (response.ok) {
            setSuccess('Your proposal has been published successfully !')
            // reset the form
            setTitle('')
            setPrice('')
            setDetails('')
        }
        setLoading(false)

    }

    return (
        <div className="bg-white px-4 py-5 mb-5">
            <h2 className="text-gray-700 text-xl mb-3">Create a proposal</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <label htmlFor="title">Proposal title </label>
                    <input
                        id="title"
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                        placeholder="ex : web developper"
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="price">What's your price ? </label>
                    <input
                        id="price"
                        type="number"
                        min={10}
                        step={50}
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                        placeholder="10$ - 500$"
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="details">Give more informations about it </label>
                    <textarea
                        id="details"
                        rows={5}
                        onChange={e => setDetails(e.target.value)}
                        value={details}
                        className="block my-3 p-2 w-full focus:outline-none border-2 rounded focus:border-primary"
                        placeholder="Proposal details here..."
                    ></textarea>
                </div>
                <div className="mt-3">
                    <button disabled={loading} type="submit" className="text-sm px-4 py-2 text-primary rounded-md inline-flex justify-center items-center border-primary border-2 hover:bg-green-100 duration-300 transition-all disabled:bg-green-300">
                        {loading ? 'Publishing the proposal...' : 'Publish the proposal'}
                    </button>
                </div>
                {success && <div className="bg-green-100 text-primary mt-3 px-4 py-5 mb-5">{success}</div>}
                {error && <p className="my-5 text-red-500">{error}</p>}
            </form>
        </div>
    )
}
