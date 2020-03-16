import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8080/api/';
const httpClient = fetchUtils.fetchJson;


export default {

    getList: (ressource, params) => {
        const {page, perPage} = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter)
        };

        const url = `${apiUrl}/${ressource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => {
            return {
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10)
            };
        });
    },

    getOne: (ressource, params) => {
        return httpClient(`${apiUrl}/${ressource}/${params.id}`).then(({ json }) => ({ data: json }))
    },

    getMany: (ressource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids })
        };

        const url = `${apiUrl}/${ressource}?${stringify(query)}`;

        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (ressource, params) => {
        const {page, perPage} = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id
            })
        };

        const url = `${apiUrl}/${ressource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => {
            return {
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10)
            };
        })
    },

    update: (ressource, params) => {
        return httpClient(`${apiUrl}/${ressource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(({ json }) => ({ data: json }));
    },

    updateMany: (ressource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids })
        }

        return httpClient(`${apiUrl}/${ressource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(({json}) => ({ data: json }));
    },

    create: (ressource, params) => {
        return httpClient(`${apiUrl}/${ressource}/`, {
            method: 'POST',
            body: JSON.stringify(params.data)
        }).then(({ json }) => ({ data: { ...params.data, id: json.id }}));
    },

    delete: (ressource, params) => {
        return httpClient(`${apiUrl}/${ressource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },

    deleteMany: (ressource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids })
        };
        return httpClient(`${apiUrl}/${ressource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data)
        }).then(({ json }) => ({ data: json }));
    },
};