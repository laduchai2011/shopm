import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { initFirebase } from "config/firebase";

initFirebase();
const auth = getAuth();


export const renderCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('Signup-recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            console.log('renderCaptcha', response)
        }
    }, auth);
}

export const clearCaptcha = () => {
    window.recaptchaVerifier = null;
}

export const phoneAuth = (phoneNumber, callback) => {
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        console.log('phoneAuth', confirmationResult)
        window.confirmationResult = confirmationResult;
        callback();
    }).catch((error) => {
        console.error('err', error);
    });
}

export const verifyCode = (code, callback) => {
    const confirmationResult = window.confirmationResult;
    confirmationResult.confirm(code).then((result) => {
        callback(result);
    }).catch((error) => {
        console.error('err', error);
    });
}