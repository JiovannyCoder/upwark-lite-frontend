type User = {
    name: string,
    type: string,
    token: string
}

type AuthContextType = {
    user: null | User,
    dispatch: React.Dispatch<AuthAction>
}

type ProviderProps = {
    children: React.ReactNode
}

type AuthState = {
    user: null | User
}

type ActionType = 'LOGOUT' | 'LOGIN'

type LoginAction = {
    type: ActionType,
    payload: User
}

type LogoutAction = {
    type: ActionType,
    payload?: User
}

type AuthAction = LoginAction | LogoutAction