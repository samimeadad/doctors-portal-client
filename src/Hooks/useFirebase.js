import { useEffect, useState } from "react";
import initializeFirebaseAuthentication from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";

initializeFirebaseAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState( {} );
    const auth = getAuth();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ authError, setAuthError ] = useState( '' );
    const googleProvider = new GoogleAuthProvider();

    const registerUser = ( email, password, name, history ) => {
        setIsLoading( true );
        createUserWithEmailAndPassword( auth, email, password )
            .then( ( userCredential ) => {
                setAuthError( '' );
                const newUser = { email, displayName: name };
                setUser( newUser );

                //Send name to firebase after registration
                updateProfile( auth.currentUser, {
                    displayName: name
                } ).then( () => {
                    history.replace( '/' );
                } ).catch( ( error ) => {
                    setAuthError( error.message );
                } );

                history.replace( '/' );
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

    const signInWithGoogle = ( location, history ) => {
        setIsLoading( true );
        signInWithPopup( auth, googleProvider )
            .then( ( result ) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult( result );
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            } ).catch( ( error ) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError( error );
                // ...
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
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;