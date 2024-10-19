import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../../components/filter/Filter'
import { deleteVacancy, getVacancies } from '../../api'

export default function VacanciesPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const [filteredVacancies, setFilteredVacancies] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
        fetchVacancies();
    }, [location])

    const fetchVacancies = async () => {
        try {
            await getVacancies(setFilteredVacancies)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch vacancies');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteVacancy(id)
            if (response.status === 200 || response.status === 204) {
                fetchVacancies();
            } else {
                console.error('Failed to delete vacancie:', response);
            }
        } catch (error) {
            console.error('Error deleting vacancie:', error);
        }
    };

    return (
        <div className='all__content'>
            <div className='title'>Vacancies</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => navigate('/vacancies/add')}>+ Add</button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredVacancies(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchVacancies}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No vacancies found.</p>}
                {!loading && !error && !noResults && (
                    <table className='vacancies__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Title</th>
                                <th className='list__title'>Status</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVacancies.map(vacancy => (
                                <tr className='vacancy__item' key={vacancy.id}>
                                    <td>{vacancy.title}</td>
                                    <td>{vacancy.status}</td>
                                    <td className='vacancy__actions'>
                                        <button className='edit__btn' onClick={() => navigate(`/vacancies/edit/${vacancy.id}`, { state: { vacancy } })}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(vacancy.id)}>Delete</button>
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
