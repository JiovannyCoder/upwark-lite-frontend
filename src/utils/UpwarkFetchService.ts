
const UpwarkFetchService = (URI : string, OPTIONS : object) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    return fetch(API_BASE_URL + URI, {...OPTIONS})
}

export default UpwarkFetchService