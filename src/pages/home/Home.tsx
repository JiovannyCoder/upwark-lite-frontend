
export default function Home() {
    return (
        <div className="bg-white p-10 rounded">
            <h3 className="text-2xl font-bold my-5">Welcome to <span className="text-primary">Upwark</span></h3>
            <h2 className="text-xl text-gray-700 mb-3">This is the upwark project react light version</h2>
            <p className="mb-2">What can you do here : </p>
            <ul>
                <li className="mb-1 hover:text-primary duration-300 cursor-default"> - Create an account as freelancer or employer</li>
                <li className="mb-1 hover:text-primary duration-300 cursor-default"> - Apply for some proposals as freelancer</li>
                <li className="mb-1 hover:text-primary duration-300 cursor-default"> - Create proposals as employer</li>
                <li className="mb-1 hover:text-primary duration-300 cursor-default"> - Log in your account</li>
                <li className="mb-1 hover:text-primary duration-300 cursor-default"> - Look at your profil</li>
            </ul>
        </div>
    )
}
