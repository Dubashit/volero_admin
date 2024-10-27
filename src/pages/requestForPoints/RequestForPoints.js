import React, { useEffect, useState } from 'react';
// import Filter from '../../components/filter/Filter';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteRequestForPoints, getRequestForPoints } from '../../api';
import './index.css';

export default function RequestForPoints() {

    const location = useLocation();
    const navigate = useNavigate();
    const [filteredRequestsForPoints, setFilteredRequestsForPoints] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('NotCompleted');

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0);
        fetchRequestsForPoints();
    }, [location]);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchRequestsForPoints();
        }
    }, [location.state]);

    const fetchRequestsForPoints = async () => {
        try {
            await getRequestForPoints(setFilteredRequestsForPoints);
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteRequestForPoints(id);
            if (response.status === 200 || response.status === 204) {
                fetchRequestsForPoints();
            } else {
                console.error('Failed to delete request:', response);
            }
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    const filteredData = filteredRequestsForPoints.filter(request =>
        activeTab === 'Completed' ? request.isDone === 'Completed' : request.isDone !== 'Completed'
    );

    return (
        <div className='all__content'>
            <div className='title'>Requests for points</div>

            {/* <Filter
                setFilteredItems={(filtered) => {
                    setFilteredRequestsForPoints(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchRequestsForPoints}
            /> */}

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'NotCompleted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('NotCompleted')}
                >
                    Not completed
                </button>
                <button
                    className={`tab ${activeTab === 'Completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Completed')}
                >
                    Completed
                </button>
            </div>

            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No requests found.</p>}
                {!loading && !error && !noResults && (
                    <table className='requests__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Username</th>
                                <th className='list__title'>Email</th>
                                <th className='list__title'>Created at</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(requestForPoints => (
                                <tr className='request__item' key={requestForPoints.id}>
                                    <td>{requestForPoints.username}</td>
                                    <td>{requestForPoints.email}</td>
                                    <td>
                                        {new Date(requestForPoints.createdAt).toLocaleString('en-US', {
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
                                        <button
                                            className='edit__btn'
                                            onClick={() => navigate(`/requestForPoints/details/${requestForPoints.id}`, { state: { requestForPoints, isCompletedTab: activeTab === 'Completed' } })}
                                        >
                                            Show
                                        </button>
                                        <button
                                            className='delete__btn'
                                            onClick={() => deleteData(requestForPoints.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
