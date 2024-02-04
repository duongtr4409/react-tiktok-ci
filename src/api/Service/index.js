import configs from '~/assets/configs';
import axios from 'axios';
import REQUEST from '~/utils/request';

//_sort=views&_order=asc
const userAPI = '/users';
const suggestedUserAPI = '/suggested';
function APISearchUser_bak(keySearch = '', page = 0, limit = 5, sort = [{ fieldName: 'id', order: 'asc' }]) {
    return (
        configs.API_URL +
        userAPI +
        `?q=${encodeURIComponent(keySearch)}&_page=${page}&_limit=${limit}` +
        `&_sort=${sort.map((ele) => encodeURIComponent(ele.fieldName)).join(',')}&_order=${sort
            .map((ele) => encodeURIComponent(ele.order))
            .join(',')}`
    );
}

function APISearchUser() {
    return userAPI;
}

function APIGetSuggetedUser() {
    return suggestedUserAPI;
}

// function
function GET(url, param = {}) {
    const params = {
        _page: 0,
        _limit: 5,
        // sort: [{ fieldName: 'id', orderType: 'asc' }],
        _sort: 'id',
        _order: 'asc',
        ...param,
    };
    return REQUEST.get(url, { params });
}

const GET_ASYNC = async (url, param = {}) => {
    const params = {
        _page: 0,
        _limit: 5,
        // sort: [{ fieldName: 'id', orderType: 'asc' }],
        _sort: 'id',
        _order: 'asc',
        ...param,
    };
    let response;
    try {
        response = await REQUEST.get(url, { params });
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

function GET_CALBACK(url, param = {}, callBack = () => {}, callBackError = () => {}) {
    const params = {
        _page: 0,
        _limit: 5,
        // sort: [{ fieldName: 'id', orderType: 'asc' }],
        _sort: 'id',
        _order: 'asc',
        ...param,
    };

    REQUEST.get(url, { params })
        .then((res) => {
            callBack(res);
        })
        .catch((error) => {
            callBackError(error);
        });
}

export { GET, GET_ASYNC, GET_CALBACK, APISearchUser, APIGetSuggetedUser };
