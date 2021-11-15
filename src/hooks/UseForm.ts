import { ChangeEvent,useState } from 'react';

export const useForm = ( initialState: any = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ( event: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [ event.target.name ]: event.target.value
        });
        
    }

    return [ values, handleInputChange, reset ];

}