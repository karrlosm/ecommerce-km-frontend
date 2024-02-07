import { SyntheticEvent, useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop-context";

import './styles.css'

export const AuthPage = () => {
    return (
        <div className="auth">
            <Register />
            <Login />
        </div>
    )
}

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const response: any = await axios.post('http://localhost:3001/user/register', {
                username, password,
            });

            if (response?.data?.message) {
                alert(response.data.message)
            }
            
        } catch (error: any) {
            if (error?.response?.status === 400) {
                if (error?.response?.data?.type) {
                    alert(error.response.data.type)
                } else {
                    alert('Não foi possível criar o usuário')
                }
            } else {
                alert(error?.response?.data?.type?._message)
            }
        }

    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [_, setCookies] = useCookies(['access_token'])

    const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const response: any = await axios.post('http://localhost:3001/user/login', {
                username, password,
            });

            setCookies('access_token', response.data.token)
            localStorage.setItem('userID', response.data.userID)
            setIsAuthenticated(true)
            navigate('/');
        } catch (error: any) {
            if (error?.response?.status === 400) {
                if (error?.response?.data?.type) {
                    alert(error.response.data.type)
                } else {
                    alert('Não foi possível fazer login')
                }
            } else {
                alert(error?.response?.data?.type?._message)
            }
        }

    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}