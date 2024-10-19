import React from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

export default function ResumeDetails() {

    const location = useLocation();
    const resume = location.state?.resume;    

    return (
        <div className='all__content'>
            <div className='title'>Resume</div>
            <div className='content__block'>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>Full name :</div>
                    <div className='resume__field'>{resume.name}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>Vacancy :</div>
                    <div className='resume__field'>{resume.vacancy}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>Phone :</div>
                    <div className='resume__field'>Country code : +{resume.countryCode}<br />National Number : {resume.phone}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>City :</div>
                    <div className='resume__field'>{resume.city}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>Linkedin profile :</div>
                    <div className='resume__field'>{resume.linkedIn}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>From source :</div>
                    <div className='resume__field'>{resume.source}</div>
                </div>
                <div className='resume__detail__item'>
                    <div className='subtitle resume__title'>Resume :</div>
                    <div className='resume__field'>
                        <a href={`http://localhost:3001${resume.cv}`} target="_blank" rel="noopener noreferrer">Open resume</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
