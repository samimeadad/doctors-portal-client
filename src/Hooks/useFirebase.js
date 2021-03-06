import { useEffect, useState } from "react";
import initializeFirebaseAuthentication from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile, getIdToken, signOut } from "firebase/auth";

initializeFirebaseAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState( {} );
    const auth = getAuth();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ authError, setAuthError ] = useState( '' );
    const [ admin, setAdmin ] = useState( false );
    const [ token, setToken ] = useState( '' );

    const googleProvider = new GoogleAuthProvider();

    const registerUser = ( email, password, name, navigate ) => {
        setIsLoading( true );
        createUserWithEmailAndPassword( auth, email, password )
            .then( ( userCredential ) => {
                setAuthError( '' );
                const newUser = { email, displayName: name };
                setUser( newUser );

                //save user information to the database
                saveUserToDb( email, name, 'POST' );

                //Send name to firebase after registration
                updateProfile( auth.currentUser, {
                    displayName: name
                } ).then( () => {
                    navigate( '/home' );
                } ).catch( ( error ) => {
                    setAuthError( error.message );
                } );

                navigate( '/home' );
            } )
            .catch( ( error ) => {
                setAuthError( error.message );
            } )
            .finally( () => {
                setIsLoading( false );
            } );
    }

    const loginUser = ( email, password, location, navigate ) => {
        setIsLoading( true );
        signInWithEmailAndPassword( auth, email, password )
            .then( ( userCredential ) => {
                const destination = location?.state?.from || '/';
                navigate( destination );
                setAuthError( '' );
            } )
            .catch( ( error ) => {
                setAuthError( error.message );
            } )
            .finally( () => {
                setIsLoading( false );
            } );
    }

    const signInWithGoogle = ( location, navigate ) => {
        setIsLoading( true );
        signInWithPopup( auth, googleProvider )
            .then( ( result ) => {
                const user = result.user;
                saveUserToDb( user.email, user.displayName, 'PUT' );
                const destination = location?.state?.from || '/';
                navigate( destination );
                setAuthError( '' );
            } ).catch( ( error ) => {
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
                getIdToken( user )
                    .then( idToken => {
                        setToken( idToken )
                    } )
            } else {
                setUser( {} )
            }
            setIsLoading( false );
        } );
        return () => unsubscribe;
    }, [ auth ] )

    useEffect( () => {
        fetch( `https://salty-reef-03503.herokuapp.com/users/${ user.email }` )
            .then( res => res.json() )
            .then( data => setAdmin( data.admin ) )
    }, [ user.email ] )

    const logOut = () => {
        setIsLoading( true );
        signOut( auth ).then( () => {
            // Sign-out successful.
        } ).catch( ( error ) => {
            // An error happened.
        } )
            .finally( () => setIsLoading( false ) );
    }

    const saveUserToDb = ( email, displayName, method ) => {
        const user = { email, displayName };
        console.log( user );
        fetch( 'https://salty-reef-03503.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( user )
        } )
            .then()
    }

    return {
        user,
        admin,
        token,
        isLoading,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;