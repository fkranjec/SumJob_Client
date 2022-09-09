import { useState, createContext, Context, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import jwt from "jwt-decode";

export const AuthContext: Context<any> = createContext({
    token: '',
    user: {},
    isLoggedIn: false,
    login: (token: string) => { },
    logout: () => { },
    register: () => { }
})

export const AuthContextProvider = (props: any): ReactElement => {
    let tok: string | null = localStorage.getItem('token');

    const [token, setToken] = useState<string | null>(tok ? tok : '')
    const [user, setUser] = useState<any>(tok ? jwt(tok) : {})
    const navigate = useNavigate();

    const userIsLogedIn = !!token;

    const login = (token: string, refreshToken: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken)
        setToken(token);
        setUser(jwt(token));
        navigate("/dashboard");
    }

    const register = () => {
        navigate("/login");
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken("");
    }

    const authProvider = {
        token: token,
        user: user,
        isLoggedIn: userIsLogedIn,
        login: login,
        logout: logout,
        register: register
    }


    return <AuthContext.Provider value={authProvider}>{props.children}</AuthContext.Provider>
}

export const AuthConsumer = AuthContext.Consumer;