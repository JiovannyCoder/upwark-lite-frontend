import useAuthContext from './useAuthContext'

export default function useLogout() {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove user in the storage
        localStorage.removeItem('user')

        // update state
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}
