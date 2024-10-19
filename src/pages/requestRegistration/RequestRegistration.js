import React, { useEffect, useState } from 'react'
import Filter from '../../components/filter/Filter';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { deleteRequestRegister, getRequestRegister } from '../../api';

export default function RequestRegistration() {

    const location = useLocation()
    const navigate = useNavigate()
    const [filteredRequestRegister, setFilteredRequestRegister] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
        fetchRequestsRegister();
    }, [location])

    const fetchRequestsRegister = async () => {
        try {
            await getRequestRegister(setFilteredRequestRegister)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch vacancies');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteRequestRegister(id)
            if (response.status === 200 || response.status === 204) {
                fetchRequestsRegister();
            } else {
                console.error('Failed to delete resume:', response);
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    return (
        <div className='all__content'>
            <div className='title'>Requests registration</div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredRequestRegister(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchRequestsRegister}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No resume found.</p>}
                {!loading && !error && !noResults && (
                    <table className='requests__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>First name</th>
                                <th className='list__title'>Last name</th>
                                <th className='list__title'>Created at</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequestRegister.map(requestRegister => (
                                <tr className='request__item' key={requestRegister.id}>
                                    <td>{requestRegister.firstName}</td>
                                    <td>{requestRegister.lastName}</td>
                                    <td>
                                        {new Date(requestRegister.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false,
                                        })}
                                    </td>
                                    <td className='request__actions'>
                                        <button className='edit__btn' onClick={() => navigate(`/requestRegister/details/${requestRegister.id}`, { state: { requestRegister } })}>Show</button>
                                        <button className='delete__btn' onClick={() => deleteData(requestRegister.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}