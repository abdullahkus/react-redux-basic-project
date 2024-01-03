import { http } from '../utils/http';

const getAll = (start, limit) => {
    return http.get('/users', {
        params: {
            _start: start,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
        },
    });
};

const getById = (id) => {
    return http.get(`/users/${id}`);
};

export default {
    getAll,
    getById,
};
