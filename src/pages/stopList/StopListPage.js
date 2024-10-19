import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'
import Filter from '../../components/filter/Filter'
import AddModal from '../../components/addModal/AddModal'
import EditModal from '../../components/editModal/EditModal'
import { deleteStopList, getStopList } from '../../api'

export default function StopListPage() {

    const location = useLocation()
    const [filteredStopList, setFilteredStopList] = useState([]);
    const [selectedStopList, setSelectedStopList] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
        fetchStopList();
    }, [location])

    const fetchStopList = async () => {
        try {
            await getStopList(setFilteredStopList)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch coefficients');
            setLoading(false);
        }
    }

    const deleteData = async (id) => {
        try {
            const response = await deleteStopList(id)
            if (response.status === 200 || response.status === 204) {
                fetchStopList();
            } else {
                console.error('Failed to delete stop list:', response);
            }
        } catch (error) {
            console.error('Error deleting stop list:', error);
        }
    };

    const editData = (stopList) => {
        setSelectedStopList(stopList);
        setIsEditModalOpen(true);
    };

    return (
        <div className='all__content'>
            <div className='title'>Stop list</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => setIsAddModalOpen(true)}>+ Add</button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredStopList(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchStopList}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No stop list found.</p>}
                {!loading && !error && !noResults && (
                    <table className='stopList__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Sales ID</th>
                                <th className='list__title'>Username</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStopList.map(stopList => (
                                <tr className='stopList__item' key={stopList.id}>
                                    <td>{stopList.salesId}</td>
                                    <td>{stopList.username}</td>
                                    <td className='stopList__actions'>
                                        <button className='edit__btn' onClick={() => editData(stopList)}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(stopList.id)}>Delete</button>
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
                    refreshItems={fetchStopList}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedStopList}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchStopList}
                />
            )}
        </div>
    )
}