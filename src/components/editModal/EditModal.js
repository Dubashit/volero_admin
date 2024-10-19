import React, { useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import { putCoefficient, putLanguages, putStopList, putTags } from '../../api';

export default function EditModal({ item, closeModal, refreshItems }) {

    const location = useLocation()

    const [titleTag, setTitleTag] = useState(item.title);
    const [salesIdCoef, setSalesIdCoef] = useState(item.salesId)
    const [percentage, setPercentage] = useState(item.percentage)
    const [code, setCode] = useState(item.code)
    const [titleLanguage, setTitleLanguage] = useState(item.title)
    const [salesIdStopList, setSalesIdStopList] = useState(item.salesId)
    const [usernameStopList, setUsernameStopList] = useState(item.username)

    const handleSave = async () => {
        try {
            if (location.pathname === '/coefficients') {
                if (salesIdCoef === '') { return alert('Sales ID is null') }
                if (percentage === '') { return alert('Percentage is null') }
                await putCoefficient(item, salesIdCoef, percentage);
                refreshItems();
                closeModal();
            } else if (location.pathname === '/tags') {
                if (titleTag === '') { return alert('Title is null') }
                await putTags(item, titleTag);
                refreshItems();
                closeModal();
            } else if (location.pathname === '/languages') {
                if (code === '') { return alert('Code is null') }
                if (titleLanguage === '') { return alert('Title is null') }
                await putLanguages(code, titleLanguage);
                refreshItems();
                closeModal();
            } else if (location.pathname === '/stopList') {
                if (salesIdStopList === '') { return alert('Sales ID is null') }
                if (usernameStopList === '') { return alert('Username is null') }
                await putStopList(item, salesIdStopList, usernameStopList)
                refreshItems();
                closeModal();
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const renderForm = () => {
        if (location.pathname === '/coefficients') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title'>Edit coefficient</div>
                    <form>
                        <div className="form__group">
                            <label>Sales ID</label>
                            <input
                                type="text"
                                value={salesIdCoef}
                                onChange={(e) => setSalesIdCoef(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Percentage</label>
                            <input
                                type="number"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="button" className="save__button" onClick={handleSave}>Save</button>
                    </form>
                </div>
            )
        } else if (location.pathname === '/tags') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title'>Edit tag</div>
                    <form>
                        <div className="form__group">
                            <label>Tag Name</label>
                            <input
                                type="text"
                                value={titleTag}
                                onChange={(e) => setTitleTag(e.target.value)}
                                required
                            />
                        </div>
                        <button type="button" className="save__button" onClick={handleSave}>Save</button>
                    </form>
                </div>
            )
        } else if (location.pathname === '/languages') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title'>Edit language</div>
                    <form>
                        <div className="form__group">
                            <label>Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={titleLanguage}
                                onChange={(e) => setTitleLanguage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="button" className="save__button" onClick={handleSave}>Save</button>
                    </form>
                </div>
            )
        } else if (location.pathname === '/stopList') {
            return (
                <div className="modal__content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className='title'>Edit stop list</div>
                    <form>
                        <div className="form__group">
                            <label>Sales ID</label>
                            <input
                                type="text"
                                value={salesIdStopList}
                                onChange={(e) => setSalesIdStopList(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={usernameStopList}
                                onChange={(e) => setUsernameStopList(e.target.value)}
                                required
                            />
                        </div>
                        <button type="button" className="save__button" onClick={handleSave}>Save</button>
                    </form>
                </div>
            )
        }
    }

    return (
        <div className="modal">
            {renderForm()}
        </div>
    );
}
