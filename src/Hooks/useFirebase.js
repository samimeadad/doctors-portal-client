import { useEffect, useState } from "react";
import initializeFirebaseAuthentication from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

initializeFirebaseAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState( {} );
    const auth = getAuth();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ authError, setAuthError ] = useState( '' );

    const registerUser = ( email, password ) => {
        setIsLoading( true );
        createUserWithEmailAndPassword( auth, email, password )
            .then( ( userCredential ) => {
                setAuthError( '' );
            } )
            .catch( ( error ) => {
                setAuthError( error.message );
            } )
            .finally( () => {
                setIsLoading( false );
            } );
    }

    const loginUser = ( email, password, location, history ) => {
        setIsLoading( true );
        signInWithEmailAndPassword( auth, email, password )
            .then( ( userCredential ) => {
                const destination = location?.state?.from || '/';
                history.replace( destination );
                setAuthError( '' );
            } )
            .catch( ( error ) => {
                setAuthError( error.message );
            } )
            .finally( () => {
                setIsLoading( false );
            } );
    }

    //observe user state
    useEffect( () => {
        const unsubscribe = onAuthStateChanged( auth, ( user ) => {
            if ( user ) {
                setUser( user );
            } else {
                setUser( {} )
            }
            setIsLoading( false );
        } );
        return () => unsubscribe;
    }, [ auth ] )

    const logOut = () => {
        setIsLoading( true );
        signOut( auth ).then( () => {
            // Sign-out successful.
        } ).catch( ( error ) => {
            // An error happened.
        } )
            .finally( () => setIsLoading( false ) );
    }

    return {
        user,
        isLoading,
        authError,
        registerUser,
        loginUser,
        logOut
    }
}

export default useFirebase;