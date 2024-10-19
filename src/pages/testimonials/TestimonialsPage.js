import React, { useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { deleteTestimonials, getTestimonials } from '../../api';

export default function TestimonialsPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [filteredTestimonials, setFilteredTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0);
        fetchTestimonials();
    }, [location]);

    const fetchTestimonials = async () => {
        try {
            await getTestimonials(setFilteredTestimonials)
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
            const response = await deleteTestimonials(id)
            console.log(response);
            fetchTestimonials();
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    return (
        <div className='all__content'>
            <div className='title'>Testimonials</div>
            <div className='add__btn__block'>
                <button className='add__btn' onClick={() => navigate('/testimonials/add')}>+ Add</button>
            </div>
            <Filter
                setFilteredItems={(filtered) => {
                    setFilteredTestimonials(filtered);
                    setNoResults(filtered.length === 0);
                }}
                refreshData={fetchTestimonials}
            />
            <div className='content__block'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {noResults && <p>Tags not found</p>}
                {!loading && !error && !noResults && (
                    <table className='testimonials__list'>
                        <thead>
                            <tr>
                                <th className='list__title'>Author</th>
                                <th className='list__title'>Position</th>
                                <th className='list__title'>Comment</th>
                                <th className='list__title'>Count of Stars</th>
                                <th className='list__title'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTestimonials.map(testimonial => (
                                <tr key={testimonial.id}>
                                    <td>{testimonial.author}</td>
                                    <td>{testimonial.position}</td>
                                    <td>{testimonial.comment}</td>
                                    <td>{testimonial.countOfStars}</td>
                                    <td className='testimonials__actions'>
                                        <button className='edit__btn' onClick={() => navigate(`/testimonials/edit/${testimonial.id}`, { state: { testimonial } })}>Edit</button>
                                        <button className='delete__btn' onClick={() => deleteData(testimonial.id)}>Delete</button>
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