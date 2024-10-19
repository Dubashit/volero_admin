import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'
import { putPassword } from '../../api'

export default function ChangePasswordpage() {

    const location = useLocation()

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
    }, [location])

    const sendFormData = async (e) => {
        e.preventDefault()
        const username = localStorage.getItem('username')
        if (newPassword === repeatNewPassword) {
            await putPassword(username, password, newPassword)
        } else {
            console.log("pass not maches");
        }
    }

    return (
        <div className='all__content'>
            <div className='title'>Change password</div>
            <div className='content__block'>
                <div className="form__container">
                    <form>
                        <div className="form__group">
                            <label>Current password</label>
                            <input
                                type="password"
                                id="current-password"
                                name="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form__group">
                            <label>New password</label>
                            <input
                                type="password"
                                id="new-password"
                                name="new-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="form__group">
                            <label>Repeat password</label>
                            <input
                                type="password"
                                id="repeat-password"
                                name="repeat-password"
                                onChange={(e) => setRepeatNewPassword(e.target.value)}
                            />
                        </div>

                        <button className="submit__btn" onClick={sendFormData}>Change</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
