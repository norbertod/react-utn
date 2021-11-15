import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HeroCard } from '../../components/HeroCard';
//import { useHistory } from 'react-router';
import { obtenerHeroesAction, obtenerAnteriorHeroeAction, obtenerSiguienteHeroeAction } from '../../redux/heroeDucks';
import { obtenerLogout } from '../../redux/loginDucks';
import { HeroList } from '../../components/HeroList';





export const HomePage = ({history}:any) => {
    
    const dispatch = useDispatch()
    //const history = useHistory ();
    console.log(history)

    
    useEffect(() => {
        dispatch(obtenerHeroesAction());
    }, []);

    useSelector((state:any) => console.log(state))

    // console.log(heroes)
    
    const handleLogout = () =>{
        dispatch(obtenerLogout());
    }
    
    const handleGetHeroes = ()=>{
        dispatch(obtenerSiguienteHeroeAction());
    }
    const handleGetHeroesAnterior = ()=>{
        dispatch(obtenerAnteriorHeroeAction());
    }

    const handleClick = () => {
       history.push ('/about');
    }    

    return (
        <>

            {/* <h1>HomePage</h1>
            <h1>HomePage</h1>
            <h1>HomePage</h1>
            <h1>HomePage</h1> */}

            <button onClick={handleGetHeroes}>Siguiente</button>
            <button onClick={handleGetHeroesAnterior}>Anterior</button>
            <button onClick={handleClick}>About</button>


                    <br/>
                    <br/>
                    <HeroList/>
                    <br/>
                    <br/>
                    </>
    )
}
