import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'
import Filter from '../../components/filter/Filter'
import AddModal from '../../components/addModal/AddModal'
import EditModal from '../../components/editModal/EditModal'
import { deleteLanguage, getLanguages } from '../../api'

export default function LanguagePage() {

    const location = useLocation()
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguages] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
        fetchLanguages();
    }, [location])

    const fetchLanguages = async () => {
        try {
            await getLanguages(setFilteredLanguages)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch coefficients');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteLanguage(id)
            if (response.status === 200 || response.status === 204) {
                fetchLanguages();
            } else {
                console.error('Failed to delete language:', response);
            }
        } catch (error) {
            console.error('Error deleting language:', error);
        }
    };

    const editData = (language) => {
        setSelectedLanguages(language);
        setIsEditModalOpen(true);
    };

    return (
        <div className='all__content'>
            <div className='title'>Preferable languages</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => setIsAddModalOpen(true)}>+ Add</button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredLanguages(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchLanguages}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No languages found.</p>}
                {!loading && !error && !noResults && (
                    <table className='languages__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Code</th>
                                <th className='list__title'>Title</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLanguages.map(language => (
                                <tr className='language__item' key={language.id}>
                                    <td>{language.code}</td>
                                    <td>{language.title}</td>
                                    <td className='language__actions'>
                                        <button className='edit__btn' onClick={() => editData(language)}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(language.id)}>Delete</button>
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
                    refreshItems={fetchLanguages}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    item={selectedLanguage}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshItems={fetchLanguages}
                />
            )}
        </div>
    )
}
