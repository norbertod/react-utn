import React, { useMemo } from 'react'
import { useParams,Redirect} from 'react-router-dom'

export const HeroScreen = ({history}:any) => {

    const { heroeId } = useParams<{heroeId?: string}>();

    //const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]);

    // if ( !hero ) {
    //     return <Redirect to="/" />;
    // }

    const handleReturn = () => {

        if( history.length <=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }

    }

    // const {
    //     superhero,
    //     publisher,
    //     alter_ego,
    //     first_appearance,
    //     characters,
    // } = hero;

    return (
        <div>
            <h1>HeroScreen</h1>
        </div>
    )
}
