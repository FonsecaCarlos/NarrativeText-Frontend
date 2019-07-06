import { toastr } from 'react-redux-toastr'

import api from '../../services/api'

export function setCreated(op) {
    return {
        type: 'SET_CREATED',
        payload: op
    }
}

export function getPublicHistorys(page = 1, idAuthor) {
    return dispatch => {
        api.get(`/narrativeText/indexPublic?page=${page}&idAuthor=${idAuthor}`)
            .then(data => {
                dispatch([
                    {
                        type: 'PUBLIC_HISTORYS_FETCHED',
                        payload: data
                    }, setCreated(false)
                ])
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function getMyHistorys(page = 1, idAuthor) {
    return dispatch => {
        api.get(`/narrativeText/index?page=${page}&idAuthor=${idAuthor}`)
            .then(data => {
                dispatch([
                    {
                        type: 'MY_HISTORYS_FETCHED',
                        payload: data
                    }, setCreated(false)
                ])
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }

}

export function getHistory(idHistory, idAuthor) {
    const request = api.get(`/narrativeText/indexHistory?idHistory=${idHistory}&idAuthor=${idAuthor}`)
    return {
        type: 'HISTORY_FETCHED',
        payload: request
    }

}

export function putHistory(idAuthor, narrativeText) {
    return dispatch => {
        api.put(`/narrativeText/putHistory`, { narrativeText, idAuthor })
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                const { _id, author } = resp.data
                dispatch([
                    setCreated(false),
                    getHistory(_id, author)
                ])
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function postAlternativeText(idHistory, narrativeText) {
    return dispatch => {
        api.post(`/narrativeText/addAlternativeText`, { narrativeText, idHistory })
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                const { _id, author } = resp.data
                getHistory(_id, author).payload.then((resp) => {
                    dispatch({
                        type: 'HISTORY_FETCHED',
                        payload: resp
                    })
                    dispatch(setCreated(true))
                })
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function postHistory(narrativeText) {
    return dispatch => {
        api.post(`/narrativeText`, narrativeText)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                const { _id, author } = resp.data
                getHistory(_id, author).payload.then((resp) => {
                    dispatch({
                        type: 'HISTORY_FETCHED',
                        payload: resp
                    })
                    dispatch(setCreated(true))
                })
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function searchHistory(page = 1, idAuthor, title) {
    const request = api.get(`/narrativeText/searchHistory?page=${page}&idAuthor=${idAuthor}&title=${title}`)
    return {
        type: 'HISTORYS_SEARCHED',
        payload: request
    }
}

export function setSearch(title) {
    return {
        type: 'SEARCH',
        payload: title
    }
}

export function addLike(idHistory, idAuthor) {
    return dispatch => {
        api.put(`/narrativeText/addLike?idAuthor=${idAuthor}&idHistory=${idHistory}`)
            .then(resp => {
                dispatch({
                    type: 'SET_LIKE',
                    payload: resp.data
                })
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function removeLike(idHistory, idAuthor) {
    return dispatch => {
        api.put(`/narrativeText/removeLike?idAuthor=${idAuthor}&idHistory=${idHistory}`)
            .then(resp => {
                dispatch({
                    type: 'SET_LIKE',
                    payload: resp.data
                })
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function deleteHistory(idHistory, idAuthor) {
    return dispatch => {
        api.delete(`/narrativeText/deleteHistory?idAuthor=${idAuthor}&idHistory=${idHistory}`)
            .then(resp => {
                toastr.success('Sucesso', resp.data.success)
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}