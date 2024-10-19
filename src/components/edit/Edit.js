import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextEditor from '../textEditor/TextEditor'
import './index.css'
import Select from 'react-select';
import FileUpload from '../fileUpload/FileUpload';
import { getRelatedArticlesExceptSelected, getTagsFromArticlesEdit, putArticle, putTestimonial, putVacancy } from '../../api'

export default function Edit() {

    const location = useLocation()
    const navigate = useNavigate()

    const vacancy = location.state?.vacancy;
    const article = location.state?.article;
    const testimonial = location.state?.testimonial;

    const formattedTags = article?.tags?.map(tag => ({
        label: tag,
        value: tag
    })) || [];

    const formattedRelatedArticles = article?.relatedArticles?.map(article => ({
        label: article,
        value: article
    })) || [];

    const [titleVacancy, setTitleVacancy] = useState(vacancy?.title)
    const [statusVacancy, setStatusVacancy] = useState(vacancy?.status)
    const [seoUrlVacancy, setSeoUrlVacancy] = useState(vacancy?.seoUrl)
    const [seoTitleVacancy, setSeoTitleVacancy] = useState(vacancy?.seoTitle)
    const [seoDescriptionVacancy, setSeoDescriptionVacancy] = useState(vacancy?.seoDescription)
    const [locationVacancy, setLocationVacancy] = useState(vacancy?.location)
    const [employmentType, setEmploymentType] = useState(vacancy?.employmentType)
    const [bodyVacancy, setBodyVacancy] = useState(vacancy?.body)
    const [titleArticle, setTitleArticle] = useState(article?.title)
    const [statusArticle, setStatusArticle] = useState(article?.status)
    const [seoUrlArticle, setSeoUrlArticle] = useState(article?.seoUrl)
    const [seoTitleArticle, setSeoTitleArticle] = useState(article?.seoTitle)
    const [seoDescriptionArticle, setSeoDescriptionArticle] = useState(article?.seoDescription)
    const [bodyArticle, setBodyArticle] = useState(article?.body)
    const [author, setAuthor] = useState(article?.author)
    const [readTime, setReadTime] = useState(article?.readTime)
    const [selectedTags, setSelectedTags] = useState(formattedTags)
    const [selectedRelatedArticles, setSelectedRelatedArticles] = useState(formattedRelatedArticles)
    const [preview, setPreview] = useState(article?.preview)
    const [tags, setTags] = useState([])
    const [relatedArticles, setRelatedArticles] = useState([])
    const [authorTestimonial, setAuthorTestimonial] = useState(testimonial?.author)
    const [position, setPosition] = useState(testimonial?.position)
    const [comment, setComment] = useState(testimonial?.comment)
    const [countOfStars, setCountOfStars] = useState(testimonial?.countOfStars)
    const [image, setImage] = useState(testimonial?.image)

    const getTagsAndRelatedArticles = useCallback(async () => {
        try {
            const fetchTags = await getTagsFromArticlesEdit();
            setTags(fetchTags);

            const fetchRelatedArticles = await getRelatedArticlesExceptSelected(article.id);
            setRelatedArticles(fetchRelatedArticles);
        } catch (error) {
            console.error("Error while fetching tags and related articles:", error);
        }
    }, [article]);

    useEffect(() => {
        document.querySelector('.main__content').scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (location.pathname.includes('/articles')) {
            getTagsAndRelatedArticles()
        }
    }, [location.pathname, getTagsAndRelatedArticles])

    const handleChangeTags = (selected) => {
        const filteredSelected = selected.filter(tag => tag.value && tag.value.trim() !== "");
        setSelectedTags(filteredSelected);
    };

    const handleChangeArticles = (selected) => {
        const filteredSelected = selected.filter(article => article.value && article.value.trim() !== "");
        setSelectedRelatedArticles(filteredSelected);
    };

    const handleSave = async () => {
        if (location.pathname.includes('/vacancies/edit')) {
            if (titleVacancy && statusVacancy && seoTitleVacancy && seoDescriptionVacancy && bodyVacancy && locationVacancy && employmentType) {
                const formData = new FormData()

                formData.append('title', titleVacancy)
                formData.append('status', statusVacancy)
                formData.append('seoUrl', seoUrlVacancy)
                formData.append('seoTitle', seoTitleArticle)
                formData.append('seoDescription', seoDescriptionVacancy)
                formData.append('body', bodyVacancy)
                formData.append('location', locationVacancy)
                formData.append('employmentType', employmentType)

                await putVacancy(formData, navigate, vacancy);
            }
        } else if (location.pathname.includes('/articles/edit')) {
            if (titleArticle && statusArticle && seoTitleArticle && seoDescriptionArticle && bodyArticle && readTime) {
                try {
                    const formData = new FormData();

                    formData.append('title', titleArticle);
                    formData.append('author', author);
                    formData.append('seoUrl', seoUrlArticle);
                    formData.append('seoTitle', seoTitleArticle);
                    formData.append('seoDescription', seoDescriptionArticle);
                    formData.append('tags', JSON.stringify(selectedTags.map(tag => tag.value)));
                    formData.append('relatedArticles', JSON.stringify(selectedRelatedArticles.map(article => article.value)));
                    formData.append('body', bodyArticle);
                    formData.append('status', statusArticle);
                    formData.append('readTime', readTime);

                    if (preview && preview !== article.preview) {
                        formData.append('preview', preview);
                        formData.append('oldPreview', article.preview);
                    }

                    await putArticle(formData, navigate, article)
                } catch (error) {
                    console.error('Error updating article:', error);
                }
            }
        } else if (location.pathname.includes('/testimonials/edit')) {
            if (authorTestimonial && position && comment && countOfStars && image) {
                try {
                    const formData = new FormData();

                    formData.append('author', authorTestimonial);
                    formData.append('position', position);
                    formData.append('comment', comment);
                    formData.append('countOfStars', countOfStars);

                    if (image && image !== testimonial.image) {
                        formData.append('image', image);
                        formData.append('oldImage', testimonial.image);
                    }

                    await putTestimonial(formData, navigate, testimonial);
                } catch (error) {
                    console.error('Error updating testimonial:', error);
                }
            }
        }
    }

    const renderForm = () => {
        if (location.pathname.includes('/vacancies/edit')) {
            return (
                <div className='margin__bottom'>
                    <div className='title'>Vacancies</div>
                    <div className='edit__form'>
                        <div className='subtitle'>Title</div>
                        <input
                            type='text'
                            value={titleVacancy}
                            onChange={(e) => setTitleVacancy(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional'>SEO Url</div>
                        <input
                            type='text'
                            value={seoUrlVacancy}
                            onChange={(e) => setSeoUrlVacancy(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>SEO Title</div>
                        <input
                            type='text'
                            value={seoTitleVacancy}
                            onChange={(e) => setSeoTitleVacancy(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>SEO Description</div>
                        <input
                            type='text'
                            value={seoDescriptionVacancy}
                            onChange={(e) => setSeoDescriptionVacancy(e.target.value)}
                            required
                        />
                    </div>
                    <TextEditor
                        body={vacancy.body}
                        setBody={setBodyVacancy}
                    />
                    <div className='edit__form'>
                        <div className='subtitle'>Location</div>
                        <input
                            type='text'
                            value={locationVacancy}
                            onChange={(e) => setLocationVacancy(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Employment type</div>
                        <select
                            type='text'
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'Full-time'}>Full-time</option>
                            <option value={'Part-time'}>Part-time</option>
                            <option value={'Temporary'}>Temporary</option>
                            <option value={'Flexible'}>Flexible</option>
                        </select>
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Status</div>
                        <select
                            type='text'
                            value={statusVacancy}
                            onChange={(e) => setStatusVacancy(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'Active'}>Active</option>
                            <option value={'Draft'}>Draft</option>
                        </select>
                    </div>
                    <button className='save__btn' onClick={handleSave}>Save</button>
                </div>
            )
        } else if (location.pathname.includes('/articles/edit')) {
            return (
                <div className='margin__bottom'>
                    <div className='title'>Articles</div>
                    <div className='edit__form'>
                        <div className='subtitle'>Title</div>
                        <input
                            type='text'
                            value={titleArticle}
                            onChange={(e) => setTitleArticle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional'>Author</div>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional'>SEO Url</div>
                        <input
                            type='text'
                            value={seoUrlArticle}
                            onChange={(e) => setSeoUrlArticle(e.target.value)}
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>SEO Title</div>
                        <input
                            type='text'
                            value={seoTitleArticle}
                            onChange={(e) => setSeoTitleArticle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>SEO Description</div>
                        <input
                            type='text'
                            value={seoDescriptionArticle}
                            onChange={(e) => setSeoDescriptionArticle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional'>Tags</div>
                        <Select
                            isMulti
                            value={selectedTags}
                            onChange={handleChangeTags}
                            options={tags}
                            className='Select'
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            key={tags.map((tag, index) => `${tag.value}-${index}`).join('-')}
                        />
                    </div>
                    <TextEditor
                        body={article.body}
                        setBody={setBodyArticle}
                    />
                    <div className='edit__form'>
                        <div className='subtitle__optional'>Related Articles</div>
                        <Select
                            isMulti
                            value={selectedRelatedArticles}
                            onChange={handleChangeArticles}
                            options={relatedArticles.filter(article => article.value && article.value.trim() !== "")}
                            className='Select'
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            key={relatedArticles.map(article => article.value).join('-')}
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Preview</div>
                        <FileUpload onFileSelect={setPreview} isEditPage={true} item={article} />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Status</div>
                        <select
                            type='text'
                            value={statusArticle}
                            onChange={(e) => setStatusArticle(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'active'}>Active</option>
                            <option value={'draft'}>Draft</option>
                        </select>
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Read time</div>
                        <input
                            type='number'
                            value={readTime}
                            onChange={(e) => setReadTime(e.target.value)}
                        />
                    </div>
                    <button className='save__btn' onClick={handleSave}>Save</button>
                </div>
            )
        } else if (location.pathname.includes('/testimonials/edit')) {
            return (
                <div className='margin__bottom'>
                    <div className='title'>Testimonials</div>
                    <div className='edit__form'>
                        <div className='subtitle'>Author</div>
                        <input
                            type='text'
                            value={authorTestimonial}
                            onChange={(e) => setAuthorTestimonial(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Position</div>
                        <input
                            type='text'
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Comment</div>
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Count of Stars</div>
                        <input
                            type='number'
                            value={countOfStars}
                            onChange={(e) => setCountOfStars(e.target.value)}
                            min='1'
                            max='5'
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle'>Author image</div>
                        <FileUpload onFileSelect={setImage} isEditPage={true} item={testimonial} />
                    </div>
                    <button className='save__btn' onClick={handleSave}>Save</button>
                </div>
            );
        } else {
            return <p>No edit available for this page</p>;
        }
    }

    return (
        <div className='all__content'>
            {renderForm()}
        </div>
    )
}