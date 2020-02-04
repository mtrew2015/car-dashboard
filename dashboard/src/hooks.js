import {useState} from 'react';

export const useFormInput = function useFormInput(placeHolder, initialValue){
    const [value, setValue] = useState(initialValue);
    function handleChange (e){
        setValue(e.target.value)
    }
    return {
        value, placeholder: placeHolder, onChange: handleChange
    }
}