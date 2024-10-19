import React, { useEffect, useState } from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import EditModal from '../../components/editModal/EditModal';
import AddModal from '../../components/addModal/AddModal';
import { deleteTags, getTags } from '../../api';

export default function TagsPage() {
    const location = useLocation();

    const [filteredTags, setFilteredTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0);
        fetchTags();
    }, [location]);

    const fetchTags = async () => {
        try {
            await getTags(setFilteredTags)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            console.error('Error fetching tags:', error);
            setError('Failed to load tags');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteTags(id)
            console.log(response);
            fetchTags();
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    const editData = (tag) => {
        setSelectedTag(tag);
        setIsEditModalOpen(true);
    };

    return (
        <div className='all__content'>
            <div className='title'>Tags</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => setIsAddModalOpen(true)}>+ Add</button>
            </div>
            <Filter 
                setFilteredItems={(filtered) => {
                    setFilteredTags(filtered);
                    setNoResults(filtered.length === 0);
                }} 
                refreshData={fetchTags}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && <p>Tags not found</p>}
                {!loading && !error && !noResults && (
                    <table className='tags__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Title</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTags.map(tag => (
                                <tr key={tag.id}>
                                    <td>{tag.title}</td>
                                    <td className='coefficient__actions'>
                                        <button className='edit__btn' onClick={() => editData(tag)}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(tag.id)}>Delete</button>
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
                    refreshItems={fetchTags}
                />
            )}

            {isEditModalOpen && (
                <EditModal 
                    item={selectedTag} 
                    closeModal={() => setIsEditModalOpen(false)} 
                    refreshItems={fetchTags}
                />
            )}
        </div>
    );
}
