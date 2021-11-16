import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,Redirect} from 'react-router-dom'
import { unHeroeDetalleAccion } from '../../redux/heroeDucks';

export const HeroScreen = ({history}:any) => {

    const { heroeId } = useParams<{heroeId?: string}>();

    const dispatch = useDispatch()

    //useMemo(() => dispatch( unHeroeDetalleAccion(heroeId || '') ), [dispatch, heroeId]);

    useEffect(() => {
        dispatch( unHeroeDetalleAccion(heroeId || '') );
    }, [dispatch, heroeId])

    const {hero} = useSelector((state:any) => state.heroes)

    if ( !hero ) {
        return <Redirect to="/" />;
    }

    const handleReturn = () => {

        if( history.length <=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }

    }

    const {
        id,
        name,
        publisher,
        alter_ego,
    } = hero;

    return (
        <div>
            <h1>HeroScreen</h1>
            <h1>{id}</h1>
            <h1>{name}</h1>
            <h1>{publisher}</h1>
            <h1>{alter_ego}</h1>
        </div>
    )
}
