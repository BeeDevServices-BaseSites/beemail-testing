
import { useEffect, useState } from 'react';

export default function useFormValidation({ userName, subject, message, contact }) {
    
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
        const nameValid = userName.length >= 3;
        const subjectValid = subject.length >= 3;
        const messageValid = message.length >= 5;
        const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contact);
        
        setIsFormValid(nameValid && subjectValid && messageValid && emailValid);
    }, [userName, subject, message, contact]);
    
    return isFormValid;
}
