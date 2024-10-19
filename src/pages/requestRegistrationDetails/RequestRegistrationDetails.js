import React from 'react'
import { useLocation } from 'react-router-dom';
import './index.css'

export default function RequestRegistrationDetails() {

    const location = useLocation();
    const requestRegister = location.state?.requestRegister;

    return (
        <div className='all__content'>
            <div className='title'>Request registration</div>
            <div className='content__block'>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Fisrt name :</div>
                    <div className='resume__field'>{requestRegister.firstName}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Last name :</div>
                    <div className='resume__field'>{requestRegister.lastName}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Email :</div>
                    <div className='resume__field'>{requestRegister.email}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Phone :</div>
                    <div className='resume__field'>Country code : +{requestRegister.countryCode}<br />National Number : {requestRegister.phone}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Company name :</div>
                    <div className='resume__field'>{requestRegister.companyName}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Company type :</div>
                    <div className='resume__field'>{requestRegister.companyType}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Role in company :</div>
                    <div className='resume__field'>{requestRegister.role}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Country :</div>
                    <div className='resume__field'>{requestRegister.country}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Source :</div>
                    <div className='resume__field'>{requestRegister.source}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle request__title'>Reason of contacting :</div>
                    <div className='resume__field'>{requestRegister.reason}</div>
                </div>
            </div>
        </div>
    )
}