import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate()

    return (
        <header>
            <div className='logo'>
                <img src='/logoWhite.png' alt='logo' onClick={() => navigate('/agents')} />
            </div>
            <div className='header__btns'>
                <button onClick={() => navigate('/changePassword')}><img src='/blackKey.png' alt='change password' /></button>
                <button onClick={() => {
                    navigate('/')
                    localStorage.removeItem('token')
                }}><img src='/exit.png' alt='log out' /></button>
            </div>
        </header>
    )
}