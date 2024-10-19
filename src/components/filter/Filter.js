import React, { useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { searchArticles, searchCoefficients, searchLanguages, searchRequestRegister, searchResume, searchStopList, searchTags, searchTestimonials, searchVacancies } from '../../api';

export default function Filter({ setFilteredItems, refreshData }) {

    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false);
    const [titleTag, setTitleTag] = useState('');
    const [salesIdCoef, setSalesIdCoef] = useState('');
    const [percentage, setPercentage] = useState('');
    const [code, setCode] = useState('')
    const [titleLanguage, setTitleLanguage] = useState('')
    const [salesIdStopList, setSalesIdStopList] = useState('')
    const [usernameStopList, setUsernameStopList] = useState('')
    const [titleVacancy, setTitleVacancy] = useState('')
    const [statusVacancy, setStatusVacancy] = useState('')
    const [nameResume, setNameResume] = useState('')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [titleArticle, setTitleArticle] = useState('')
    const [statusArticle, setStatusArticle] = useState('')
    const [author, setAuthor] = useState('')
    const [position, setPosition] = useState('')
    const [countOfStars, setCountOfStars] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    const resetData = () => {
        setTitleTag('');
        setCode('');
        setTitleLanguage('');
        setSalesIdCoef('');
        setPercentage('');
        setSalesIdStopList('')
        setUsernameStopList('')
        setTitleVacancy('')
        setStatusVacancy('')
        setNameResume('')
        setTitleArticle('')
        setStatusArticle('')
        setAuthor('')
        setPosition('')
        setCountOfStars('')
        setFirstName('')
        setLastName('')
        setStartDate(null)
        setEndDate(null)
        setFilteredItems([]);
        refreshData();
    };

    const searchData = async () => {
        if(location.pathname.includes('/tags')){
            await searchTags(titleTag, setFilteredItems);
        }if(location.pathname.includes('/coefficients')){
            await searchCoefficients(salesIdCoef, percentage, setFilteredItems);
        }if(location.pathname.includes('/languages')){
            await searchLanguages(code, titleLanguage, setFilteredItems);
        }if(location.pathname.includes('/stopList')){
            await searchStopList(salesIdStopList, usernameStopList, setFilteredItems);
        }if(location.pathname.includes('/vacancies')){
            await searchVacancies(titleVacancy, statusVacancy, setFilteredItems);
        }if(location.pathname.includes('/resume')){
            await searchResume(nameResume, startDate, endDate, setFilteredItems);
        }if(location.pathname.includes('/articles')){
            await searchArticles(titleArticle, statusArticle, setFilteredItems);
        }if(location.pathname.includes('/testimonials')){
            await searchTestimonials(author, position, countOfStars, setFilteredItems);
        }if(location.pathname.includes('/requestRegister')){
            await searchRequestRegister(firstName, lastName, startDate, endDate, setFilteredItems);
        }
    }

    const renderFilterForm = () => {
        if (location.pathname === '/coefficients') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Sales ID</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={salesIdCoef}
                                onChange={(e) => setSalesIdCoef(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Percentage</label>
                            <input
                                className='input__coefficient'
                                type="number"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                required
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            );
        } else if (location.pathname === '/tags') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Title</label>
                            <input
                                className='input__tag'
                                type="text"
                                value={titleTag}
                                onChange={(e) => setTitleTag(e.target.value)}
                                required
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            );
        } else if (location.pathname === '/languages') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Code</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Title</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={titleLanguage}
                                onChange={(e) => setTitleLanguage(e.target.value)}
                                required
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else if (location.pathname === '/stopList') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Sales ID</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={salesIdStopList}
                                onChange={(e) => setSalesIdStopList(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Username</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={usernameStopList}
                                onChange={(e) => setUsernameStopList(e.target.value)}
                                required
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else if (location.pathname === '/vacancies') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Title</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={titleVacancy}
                                onChange={(e) => setTitleVacancy(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Status</label>
                            <select
                                className='select__coefficient'
                                type="text"
                                value={statusVacancy}
                                onChange={(e) => setStatusVacancy(e.target.value)}
                                required
                            >
                                <option value=''></option>
                                <option value='active'>active</option>
                                <option value='draft'>draft</option>
                            </select>
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else if (location.pathname === '/resume') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Name</label>
                            <input
                                className='input__resume'
                                type="text"
                                value={nameResume}
                                onChange={(e) => { setNameResume(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Created from</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Created to</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn reset__btn__resume" onClick={resetData}>Reset</button>
                            <button className="search__btn search__btn__resume" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else if (location.pathname === '/articles') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Title</label>
                            <input
                                className='input__coefficient'
                                type="text"
                                value={titleArticle}
                                onChange={(e) => setTitleArticle(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Status</label>
                            <select
                                className='select__coefficient'
                                type="text"
                                value={statusArticle}
                                onChange={(e) => setStatusArticle(e.target.value)}
                                required
                            >
                                <option value=''></option>
                                <option value='active'>active</option>
                                <option value='draft'>draft</option>
                            </select>
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else if (location.pathname === '/testimonials') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>Author</label>
                            <input
                                className='input__testimonial'
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Position</label>
                            <input
                                className='input__testimonial'
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Count of Stars</label>
                            <input
                                className='input__testimonial'
                                type="number"
                                value={countOfStars}
                                onChange={(e) => setCountOfStars(e.target.value)}
                                min='1'
                                max='5'
                                required
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn" onClick={resetData}>Reset</button>
                            <button className="search__btn" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else if (location.pathname === '/requestRegister') {
            return (
                <div className="filter__body">
                    <div className="filter__row">
                        <div className='filter__item'>
                            <label>First name</label>
                            <input
                                className='input__request__register'
                                type="text"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Last name</label>
                            <input
                                className='input__request__register'
                                type="text"
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                                required
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Created from</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy"
                                className='input__request__register'
                            />
                        </div>
                        <div className='filter__item'>
                            <label>Created to</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy"
                                className='input__request__register'
                            />
                        </div>
                        <div className='btn__actions'>
                            <button className="reset__btn reset__btn__resume" onClick={resetData}>Reset</button>
                            <button className="search__btn search__btn__resume" onClick={searchData}>Search</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <p>No filter available for this page</p>;
        }
    };

    return (
        <div className="filter__container">
            <div className="filter__header" onClick={toggleFilter}>
                <div className='filter__title'>Filter</div>
                <span>{isOpen ? '▾' : '▸'}</span>
            </div>

            {isOpen && renderFilterForm()}
        </div>
    );
}
