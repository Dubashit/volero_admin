import React, { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { postAuth } from '../../api'

export default function LoginPage() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const authUser = async () => {
        try {
            await postAuth(username, password)

            navigate('/agents')
            setErrorMessage('')
        } catch (error) {
            setErrorMessage('Incorrect username or password!')
            console.error("Error!!!!!!!" + error);
        }
    }

    return (
        <div className='login'>
            <div className='login__content'>
                <div className='login__title'>Authorization</div>
                <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder='Username or email'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errorMessage && <p className='login__error'>{errorMessage}</p>}
                <button className='login__btn' type='submit' onClick={authUser}>Login</button>
            </div>
        </div>
    )
}