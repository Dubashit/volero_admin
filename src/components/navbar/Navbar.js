import React from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'nav__item active' : 'nav__item';
    }

    return (
        <nav>
            <div className='nav__block'>
                <div className='nav__category'>LOYALTY</div>
                <div className={isActive('/agents')} onClick={()=>navigate('/agents')}>
                    <img src='/profile.png' alt='icon' />
                    <p>Agents</p>
                </div>
                <div className={isActive('/coefficients')} onClick={()=>navigate('/coefficients')}>
                    <img src='/percent.png' alt='icon' />
                    <p>Coefficients</p>
                </div>
                <div className={isActive('/stopList')} onClick={()=>navigate('/stopList')}>
                    <img src='/stopList.png' alt='icon' />
                    <p>Stop list</p>
                </div>
                <div className={isActive('/globalSetting')} onClick={()=>navigate('/globalSetting')}>
                    <img src='/globalSetting.png' alt='icon' />
                    <p>Global setting</p>
                </div>
                <div className={isActive('/requestRegister')} onClick={()=>navigate('/requestRegister')}>
                    <img src='/vacancies.png' alt='icon' />
                    <p>Request registration</p>
                </div>
            </div>
            <div className='nav__block'>
                <div className='nav__category'>VOLERO</div>
                <div className={isActive('/testimonials')} onClick={()=>navigate('/testimonials')}>
                    <img src='/content.png' alt='icon' />
                    <p>Testimonials</p>
                </div>
            </div>
            <div className='nav__block'>
                <div className='nav__category'>RESOURCE</div>
                <div className={isActive('/languages')} onClick={()=>navigate('/languages')}>
                    <img src='/language.png' alt='icon' />
                    <p>Preferable language</p>
                </div>
            </div>
            <div className='nav__block'>
                <div className='nav__category'>BLOG</div>
                <div className={isActive('/articles')} onClick={()=>navigate('/articles')}>
                    <img src='/articles.png' alt='icon' />
                    <p>Articles</p>
                </div>
                <div className={isActive('/tags')} onClick={()=>navigate('/tags')}>
                    <img src='/tags.png' alt='icon' />
                    <p>Tags</p>
                </div>
            </div>
            <div className='nav__block'>
                <div className='nav__category'>VACANCIES</div>
                <div className={isActive('/vacancies')} onClick={()=>navigate('/vacancies')}>
                    <img src='/vacancies.png' alt='icon' />
                    <p>Vacancies</p>
                </div>
                <div className={isActive('/resume')} onClick={()=>navigate('/resume')}>
                    <img src='/resume.png' alt='icon' />
                    <p>Resume</p>
                </div>
            </div>
            <div className='nav__block'>
                <div className='nav__category'>SETTING</div>
                <div className={isActive('/changePassword')} onClick={()=>navigate('/changePassword')}>
                    <img src='/password.png' alt='icon' />
                    <p>Change password</p>
                </div>
            </div>
        </nav>
    )
}