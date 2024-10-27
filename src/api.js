import axios from "axios";
import { API_URL, PUBLIC_URL } from "./config";

export const getTagsFromArticlesAdd = async () => {
    try {
        const tagsResponse = await axios.get(`${API_URL}/tags`);
        return tagsResponse.data.map(tag => ({ value: tag.title, label: tag.title }));
    } catch (error) {
        console.error("Error while fetching tags: ", error);
    }
};
export const getRelatedArticles = async () => {
    try {
        const articles = await axios.get(`${API_URL}/articles`);
        return articles.data.map(article => ({ value: article.title, label: article.title }));
    } catch (error) {
        console.error("Error : " + error);
    }
};

export const getTagsFromArticlesEdit = async () => {
    try {
        const tagsResponse = await axios.get(`${API_URL}/tags`);
        const filteredTags = tagsResponse?.data.filter(tag => tag.title && tag.title.trim() !== "").map(tag => ({ label: tag.title, value: tag.title }));
        return filteredTags
    } catch (error) {
        console.error("Error while fetching tags: ", error);
    }
};

export const getRelatedArticlesExceptSelected = async (id) => {
    try {
        const articlesResponse = await axios.get(`${API_URL}/articles/except/${id}`);
        const filteredArticles = articlesResponse?.data.filter(article => article.title && article.title.trim() !== "").map(article => ({ label: article.title, value: article.title }));
        return filteredArticles
    } catch (error) {
        console.error("Error : " + error);
    }
}

export const getPicture = (item) => {
    return (<img src={`${PUBLIC_URL}${item}`} alt={item} />)
}

export const getArticles = async (setFilteredArticles) => {
    const response = await axios.get(`${API_URL}/articles`);
    setFilteredArticles(response.data);
}

export const getCoefficients = async (setFilteredCoefficients) => {
    const response = await axios.get(`${API_URL}/coefficients`);
    setFilteredCoefficients(response.data);
}

export const getLanguages = async (setFilteredLanguages) => {
    const response = await axios.get(`${API_URL}/languages`);
    setFilteredLanguages(response.data);
}

export const getRequestRegister = async (setFilteredRequestRegister) => {
    const response = await axios.get(`${API_URL}/requestRegister`);
    setFilteredRequestRegister(response.data);
}

export const getRequestForPoints = async (setFilteredRequestsForPoints) => {
    const response = await axios.get(`${API_URL}/requestForPoints`);
    setFilteredRequestsForPoints(response.data)
}

export const getResume = async (setFilteredResume) => {
    const response = await axios.get(`${API_URL}/resume`);
    setFilteredResume(response.data);
}

export const getStopList = async (setFilteredStopList) => {
    const response = await axios.get(`${API_URL}/stopList`);
    setFilteredStopList(response.data);
}

export const getTags = async (setFilteredTags) => {
    const response = await axios.get(`${API_URL}/tags`);
    setFilteredTags(response.data);
}

export const getTestimonials = async (setFilteredTestimonials) => {
    const response = await axios.get(`${API_URL}/testimonials`);
    setFilteredTestimonials(response.data);
}

export const getVacancies = async (setFilteredVacancies) => {
    const response = await axios.get(`${API_URL}/vacancies`);
    setFilteredVacancies(response.data);
}












export const postVacancy = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/vacancies`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/vacancies');
    } else {
        alert('Error!');
    }
}

export const postArticle = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/articles`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/articles');
    } else {
        alert('Error!');
    }
}

export const postTestimonial = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/testimonials`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/testimonials');
    } else {
        alert('Error!');
    }
}

export const postStopList = async (salesId, username) => {
    return await axios.post(`${API_URL}/stopList`, {
        salesId,
        username
    });
}

export const postLanguage = async (code, title) => {
    return await axios.post(`${API_URL}/languages`, {
        code,
        title
    });
}

export const postTag = async (title) => {
    return await axios.post(`${API_URL}/tags`, { title });
}

export const postCoefficient = async (salesId, percentage) => {
    await axios.post(`${API_URL}/coefficients`, {
        salesId,
        percentage
    });
}

export const postAuth = async (username, password) => {
    const responce = await axios.post(`${API_URL}/auth/token`, {
        username: username,
        password: password
    })
    localStorage.setItem('token', JSON.stringify(responce.data.access_token))
    localStorage.setItem('username', username)
}














export const putVacancy = async (formData, navigate, vacancy) => {
    try {
        const responce = await axios.put(`${API_URL}/vacancies/${vacancy.id}`, formData)
        if (responce.status === 200) {
            navigate('/vacancies')
        } else {
            alert('Error!')
        }
    } catch (error) {
        console.error('Error updating vacancy:', error);
    }
}

export const putArticle = async (formData, navigate, article) => {
    const response = await axios.put(`${API_URL}/articles/${article.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status === 200) {
        console.log('Article saved successfully:', response.data);
        navigate('/articles');
    } else {
        console.error('Error saving article:', response);
        alert('Error saving article!');
    }
}

export const putTestimonial = async (formData, navigate, testimonial) => {
    const response = await axios.put(`${API_URL}/testimonials/${testimonial.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status === 200) {
        console.log('Testimonisl saved successfully:', response.data);
        navigate('/testimonials');
    } else {
        console.error('Error saving testimonial:', response);
        alert('Error saving testimonial!');
    }
}

export const putCoefficient = async (item, salesIdCoef, percentage) => {
    return await axios.put(`${API_URL}/coefficients/${item.id}`, { salesId: salesIdCoef, percentage });
}

export const putTags = async (item, titleTag) => {
    return await axios.put(`${API_URL}/tags/${item.id}`, { title: titleTag });
}

export const putLanguages = async (item, code, titleLanguage) => {
    return await axios.put(`${API_URL}/languages/${item.id}`, { code, title: titleLanguage });
}

export const putStopList = async (item, salesIdStopList, usernameStopList) => {
    return await axios.put(`${API_URL}/stopList/${item.id}`, { salesId: salesIdStopList, username: usernameStopList });
}

export const putPassword = async (username, password, newPassword) => {
    try {
        const responce = await axios.put(`${API_URL}/users/${username}`, {
            password: password,
            newPassword: newPassword
        })
        alert(responce.data.message)
    } catch (error) {
        console.error('Error', error);
    }
}

export const putRequestForPoints = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/requestForPoints/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error', error);
    }
};
















export const searchTags = async (titleTag, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/tags?title=${titleTag}`);
        setFilteredItems(responce.data);
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};

export const searchCoefficients = async (salesIdCoef, percentage, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/coefficients/search?salesId=${salesIdCoef}&percentage=${percentage}`);
        setFilteredItems(responce.data);
    } catch (error) {
        console.error('Error fetching coefficients:', error);
    }
};

export const searchLanguages = async (code, titleLanguage, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/languages/search?code=${code}&title=${titleLanguage}`)
        setFilteredItems(responce.data);
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
};

export const searchStopList = async (salesIdStopList, usernameStopList, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/stopList/search?salesId=${salesIdStopList}&username=${usernameStopList}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching stop list:', error);
    }
};

export const searchVacancies = async (titleVacancy, statusVacancy, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/vacancies/search?title=${titleVacancy}&status=${statusVacancy}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching vacancies:', error);
    }
};

export const searchResume = async (nameResume, startDate, endDate, setFilteredItems) => {
    try {
        let url = `${API_URL}/resume/search?name=${nameResume}`;

        if (startDate) {
            url += `&startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
            url += `&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setFilteredItems(response.data);
    } catch (error) {
        console.error('Error fetching resume:', error);
    }
};

export const searchArticles = async (titleArticle, statusArticle, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/articles/search?title=${titleArticle || ''}&status=${statusArticle || ''}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

export const searchTestimonials = async (author, position, countOfStars, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/testimonials/search?author=${author}&position=${position}&countOfStars=${countOfStars}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching testimonisls:', error);
    }
}

export const searchRequestRegister = async (firstName, lastName, startDate, endDate, setFilteredItems) => {
    try {
        let url = `${API_URL}/requestRegister/search?firstName=${firstName}&lastName=${lastName}`;

        if (startDate) {
            url += `&startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
            url += `&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setFilteredItems(response.data);
    } catch (error) {
        console.error('Error fetching requests registration:', error);
    }
};

export const searchRequestForPoints = async (usernameRequestForPoints, email, startDate, endDate, setFilteredItems) => {
    try {
        let url = `${API_URL}/requestRegister/search?username=${usernameRequestForPoints}&email=${email}`;

        if (startDate) {
            url += `&startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
            url += `&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setFilteredItems(response.data);
    } catch (error) {
        console.error('Error fetching requests registration:', error);
    }
};




















export const deleteArticle = async (id) => {
    return await axios.delete(`${API_URL}/articles/${id}`);
}

export const deleteCoefficient = async (id) => {
    return await axios.delete(`${API_URL}/coefficients/${id}`);
}

export const deleteLanguage = async (id) => {
    return await axios.delete(`${API_URL}/languages/${id}`);
}

export const deleteRequestRegister = async (id) => {
    return await axios.delete(`${API_URL}/requestRegister/${id}`);
}

export const deleteRequestForPoints = async (id) => {
    return await axios.delete(`${API_URL}/requestForPoints/${id}`);
}

export const deleteResume = async (id) => {
    return await axios.delete(`${API_URL}/resume/${id}`);
}

export const deleteStopList = async (id) => {
    return await axios.delete(`${API_URL}/stopList/${id}`)
}

export const deleteTags = async (id) => {
    return await axios.delete(`${API_URL}/tags/${id}`);
}

export const deleteTestimonials = async (id) => {
    return await axios.delete(`${API_URL}/testimonials/${id}`);
}

export const deleteVacancy = async (id) => {
    return await axios.delete(`${API_URL}/vacancies/${id}`);
}