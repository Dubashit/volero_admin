import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Filter from '../../components/filter/Filter'
import { deleteArticle, getArticles, getPicture } from '../../api'

export default function ArticlesPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0)
        fetchArticles();
    }, [location])

    const fetchArticles = async () => {
        try {
            await getArticles(setFilteredArticles)
            setLoading(false);
            setNoResults(false);
        } catch (error) {
            setError('Failed to fetch articles!');
            setLoading(false);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteArticle(id)
            if (response.status === 200 || response.status === 204) {
                fetchArticles();
            } else {
                console.error('Failed to delete article:', response);
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    return (
        <div className='all__content'>
            <div className='title'>Articles</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => navigate('/articles/add')}>+ Add</button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredArticles(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchArticles}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && !loading && <p>No articles found.</p>}
                {!loading && !error && !noResults && (
                    <table className='articles__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Preview</th>
                                <th className='list__title'>Title</th>
                                <th className='list__title'>Status</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArticles.map(article => (
                                <tr className='article__item' key={article.id}>
                                    <td>
                                        {getPicture(article.preview)}
                                    </td>
                                    <td>{article.title}</td>
                                    <td>{article.status}</td>
                                    <td className='article__actions'>
                                        <button className='edit__btn' onClick={() => navigate(`/articles/edit/${article.id}`, { state: { article } })}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(article.id)}>Delete</button>
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
