import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'
import Filter from '../../components/filter/Filter'
import EditModal from '../../components/editModal/EditModal';
import AddModal from '../../components/addModal/AddModal'
import { deleteCoefficient, getCoefficients } from '../../api'

export default function CoefficientsPage() {

    const location = useLocation()
    const [filteredCoefficients, setFilteredCoefficients] = useState([]);
    const [selectedCoefficient, setSelectedCoefficient] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
        fetchCoefficients();
    }, [location])

    const fetchCoefficients = async () => {
        try {
            await getCoefficients(setFilteredCoefficients)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch coefficients');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteCoefficient(id)
            if (response.status === 200 || response.status === 204) {
                fetchCoefficients();
            } else {
                console.error('Failed to delete coefficient:', response);
            }
        } catch (error) {
            console.error('Error deleting coefficient:', error);
        }
    };

    const editData = (coefficient) => {
        setSelectedCoefficient(coefficient);
        setIsEditModalOpen(true);
    };

    return (
        <div className='all__content'>
            <div className='title'>Coefficients</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => setIsAddModalOpen(true)}>+ Add</button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredCoefficients(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchCoefficients}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No coefficients found.</p>}
                {!loading && !error && !noResults && (
                    <table className='coefficients__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Sales ID</th>
                                <th className='list__title'>Percentage</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoefficients.map(coefficient => (
                                <tr className='coefficient__item' key={coefficient.id}>
                                    <td>{coefficient.salesId}</td>
                                    <td>{coefficient.percentage}</td>
                                    <td className='coefficient__actions'>
                                        <button className='edit__btn' onClick={() => editData(coefficient)}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(coefficient.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isAddModalOpen && (
                <AddModal
                    closeModal={() => setIsAddModalOpen(false)}
                    refreshItems={fetchCoefficients}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedCoefficient}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchCoefficients}
                />
            )}
        </div>
    )
}