import api from '../routes/api'
import axios  from 'axios';

const baseUrl = 'https://www.superheroapi.com/api.php/5780878265286755/';

// constantes
const dataInicial = {
    array: [],
    count: 0,
    begin: 0,
    next: 'begin=20',
    previous: null,
    take: 20,
    total: 731
}

// types
const GET_HEROE_SUCCESS = 'GET_HEROE_SUCCESS'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'
const GET_HEROES_SUCCESS = 'GET_HEROES_SUCCESS'
const GET_HEROE_NEXT_SUCCESS = 'GET_HEROE_NEXT_SUCCESS'
const GET_HEROE_PREV_SUCCESS = 'GET_HEROE_PREV_SUCCESS'

// reducer
// Reducer
export default function heroeReducer (state = dataInicial, action:any) {
    switch(action.type){
        case GET_HEROE_SUCCESS:
            return {...state, array: action.payload.array }
        case POKE_INFO_EXITO:
            return {...state, hero: action.payload.hero }
        case GET_HEROES_SUCCESS:
            return {
                ...state, 
                array: action.payload.array,
                next : action.payload.next,
            }
        case GET_HEROE_NEXT_SUCCESS:
            return {...state,
                 array: action.payload.array,
                  begin: action.payload.begin,
                  next : action.payload.next,
                  previous: action.payload.previous
                }
        case GET_HEROE_PREV_SUCCESS:
            return {...state, 
                array: action.payload.array,
                begin: action.payload.begin,
                next : action.payload.next,
                previous: action.payload.previous
              }
        default: 
            return state
    }
}

// actions
export const unHeroeDetalleAccion = (id: string) => async (dispatch: any,getState: any) => {

    if(localStorage.getItem(`${baseUrl}${id}`)){

        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(`${baseUrl}${id}`) || '{}')
        })
        console.log('desde localstorage')

        return
    }

    try {
        console.log('desde api')
       const res = await api.get(`${baseUrl}${id}`) 
    //    console.log(res.data)
       dispatch({
           type: POKE_INFO_EXITO,
           payload: {
            hero : res.data
           }
       })
       localStorage.setItem('url', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }

}

export const obtenerHeroesAction = () => async (dispatch: any,getState: any) => {

    let listaHeroes: any[] = []
    let resp: any[] = []

    const {take, begin,next,previous} = getState().heroes

    if(localStorage.getItem('begin=0')){
        console.log('From obtenerHeroeAction localstorage Home')
        dispatch({
            type: GET_HEROES_SUCCESS,
            payload: {
                array : JSON.parse(localStorage.getItem('begin=0') || '{}'),
                begin: 0,
                next : 'begin=20'
            } 
        })
        return
    }

    try {
        console.log('From obtenerHeroeAction try catch Home')

        for (let i = 0; i < 20; i++) {
            resp.push(api.get(`${baseUrl}${i+1}`))  
        }

        await axios
                .all([...resp])
                .then(axios.spread((...responses) => {
                    responses.map(res => {

                        const {id, 
                               name, 
                               biography: {publisher}, 
                               image:{url},biography : {'alter-egos': alter_ego}
                            } = res.data

                        listaHeroes.push({id, name, publisher,url,alter_ego})
                    })
                }))
        console.log(listaHeroes)
        dispatch({
            type: GET_HEROES_SUCCESS,
            payload: {
                array : listaHeroes,
                begin: 0,
                next : 'begin=20'
            }
        })
        localStorage.setItem('begin=0', JSON.stringify(listaHeroes))
    } catch (error) {
        console.log(error)
    }
}
export const obtenerSiguienteHeroeAction = () => async (dispatch: any,getState: any) => {

    const {take, begin,total,next,previous} = getState().heroes

    const siguiente = begin + take
    const anterior = `begin=${begin}`

    let listaHeroes: any[] = []
    let resp: any[] = []

    if(begin >= total) return

    if(localStorage.getItem(next)){
        console.log('From obtenerSiguienteHeroeAction localstorage')
        console.log('begin',begin)
        console.log('take',take)
        console.log('take + begin',(take + begin))
        console.log('siguiente',next)
        console.log('previous',previous)
        dispatch({
            type: GET_HEROE_NEXT_SUCCESS,
            payload: {
                array: JSON.parse(localStorage.getItem(next) || '{}'),
                begin : siguiente,
                next : `begin=${siguiente + take}`,
                previous: anterior
            } 
        })
        return
    }

    try {
        console.log('From obtenerSiguienteHeroeAction try catch')
        console.log('begin',begin)
        console.log('take',take)
        console.log('take + begin',(take + begin))
        console.log('siguiente',next)
        console.log('previous',previous)
        for (let i = siguiente; i < (take + siguiente); i++) {
            resp.push(api.get(`${baseUrl}${i+1}`))  
        }

        await axios
                .all([...resp])
                .then(axios.spread((...responses) => {
                    responses.map(res => {

                        const {id, 
                               name, 
                               biography: {publisher}, 
                               image:{url},biography : {'alter-egos': alter_ego}
                            } = res.data

                        listaHeroes.push({id, name, publisher,url,alter_ego})
                    })
                }))
        console.log(listaHeroes)
        dispatch({
            type: GET_HEROE_NEXT_SUCCESS,
            payload: {
                array : listaHeroes,
                begin : siguiente,
                next : `begin=${siguiente + take}`,
                previous: anterior
            }
        })
        localStorage.setItem(`begin=${siguiente}`, JSON.stringify(listaHeroes))
    } catch (error) {
        console.log(error)
    }
}

export const obtenerAnteriorHeroeAction = () => async (dispatch: any,getState: any) => {

    const {take, begin,total,previous} = getState().heroes

    // const newBegin = begin === 0 ? 0 :  begin === 20 ? 0 : begin - (take * 2) 
    if(begin === 0) {
        alert('no registros anteriores')    
        return
    };

    const anterior = begin - take

    // console.log('newBegin', newBegin)

    let listaHeroes: any[] = []
    let resp: any[] = []

    if(begin >= total) return

    if(localStorage.getItem(previous)){
        console.log('From obtenerAnteriorHeroeAction localstorage')
        console.log('begin',begin)
        console.log('take',take)
        console.log('take + begin',(take + begin))
        console.log('anterior',anterior)
        console.log('anterior',previous)
        dispatch({
            type: GET_HEROE_PREV_SUCCESS,
            payload: {
                array : JSON.parse(localStorage.getItem(previous) || '{}'),
                begin : anterior,
                next: `begin=${begin}`,
                previous: anterior !== 0 ? `begin=${anterior - take}` : null ,
            }
        })
        return
    }

    try {
        console.log('From obtenerAnteriorHeroeAction try catch')
        console.log('begin',begin)
        console.log('take',take)
        console.log('take + begin',(take + begin))
        console.log('anterior',anterior)
        console.log('anterior',previous)

    for (let i = anterior; i < (take + anterior); i++) {
        resp.push(api.get(`${baseUrl}${i+1}`))  
    }
    console.log('resp',resp)
        await axios
                .all([...resp])
                .then(axios.spread((...responses) => {
                    responses.map(res => {

                        const {id, 
                               name, 
                               biography: {publisher}, 
                               image:{url},biography : {'alter-egos': alter_ego}
                            } = res.data

                        listaHeroes.push({id, name, publisher,url,alter_ego})
                    })
                }))
        console.log(listaHeroes)
        dispatch({
            type: GET_HEROE_PREV_SUCCESS,
            payload: {
                array : listaHeroes,
                begin : anterior,
                next: `begin=${begin}`,
                previous: anterior !== 0 ? `begin=${anterior - take}` : null ,
            }
        })
    } catch (error) {
        console.log(error)
    }
}
