import { http } from '../utils/http';

const getAll = (start, limit) => {
    return http.get('/posts', {
        params: {
            _start: start,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
        },
    });
};

const getById = (id) => {
    return http.get(`/posts/${id}`);
};

const post = (post) => {
    return http.post('/posts/', post);
};

const put = (id, post) => {
    return http.put(`/posts/${id}`, post);
};

const deleteById = (id) => {
    return http.delete(`/posts/${id}`);
};

export default {
    getAll,
    getById,
    post,
    deleteById,
    put,
};
