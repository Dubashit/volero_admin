import React, { useEffect } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'

export default function AgentsPage() {

    const location = useLocation()

    useEffect(()=>{
        document.querySelector('.main__content').scrollTo(0,0)
    },[location])

    return (
        <div className='all__content'>
            
        </div>
    )
}