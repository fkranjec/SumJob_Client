import { useState, createContext, Context, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import jwt from "jwt-decode";

export const AuthContext: Context<any> = createContext({
    token: '',
    user: {},
    isLoggedIn: false,
    login: (token: string) => { },
    logout: () => { }
})

export const AuthContextProvider = (props: any): ReactElement => {
    let tok: string | null = localStorage.getItem('token');

    const [token, setToken] = useState<string | null>(tok ? tok : '')
    const [user, setUser] = useState<any>(tok ? jwt(tok) : {})
    console.log(user);
    const navigate = useNavigate();

    const userIsLogedIn = !!token;

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
        navigate("/dashboard/home");
    }

    const logout = () => {
        setToken("")
    }

    const authProvider = {
        token: token,
        user: user,
        isLoggedIn: userIsLogedIn,
        login: login,
        logout: logout
    }

    return <AuthContext.Provider value={authProvider}>{props.children}</AuthContext.Provider>
}

export const AuthConsumer = AuthContext.Consumer;