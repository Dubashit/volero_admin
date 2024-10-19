import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'

export default function GlobalSettingPage() {

    const location = useLocation()

    const [globalPercent, setGlobalPercent] = useState(1)
    const [globalDays, setGlobalDays] = useState(1)

    useEffect(() => {
        setGlobalPercent(localStorage.getItem('globalPercent'))
        setGlobalDays(localStorage.getItem('globalDays'))
        document.querySelector('.main__content').scrollTo(0, 0)
    }, [location])

    const sendFormData = async (e) => {
        e.preventDefault()
        if (globalPercent !== null && globalDays) {
            localStorage.setItem('globalPercent', globalPercent === null ? 1 : globalPercent)
            localStorage.setItem('globalDays', globalDays === null ? 1 : globalDays)
            alert("Saved")
        } else {
            alert('Please enter all fields')
        }
    }

    return (
        <div className='all__content'>
            <div className='title'>Global setting</div>
            <div className='content__block'>
                <div className="form__container">
                    <form onSubmit={sendFormData}>
                        <div className="form__group">
                            <label>Default %</label>
                            <input
                                type="number"
                                value={globalPercent}
                                onChange={(e) => setGlobalPercent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form__group">
                            <label>Points validity (days)</label>
                            <input
                                type="number"
                                value={globalDays}
                                onChange={(e) => setGlobalDays(e.target.value)}
                                required
                            />
                        </div>

                        <button className="submit__btn" type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}