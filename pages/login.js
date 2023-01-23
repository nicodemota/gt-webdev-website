import React, {Component, useEffect} from "react";
import AdminNavBar from "../components/AdminNavBar";
import Head from 'next/head'
import {Box, Button, TextField} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from "../helpers/firebase";
import {useRouter} from 'next/router'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const auth = getAuth(firebaseApp);
    const router = useRouter();

    // redirect to admin dashboard if user is already logged in as admin
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    user.getIdTokenResult()
                        .then((idTokenResult) => {
                            const isAdmin = idTokenResult?.claims?.admin === true;
                            if (isAdmin) {
                                router.push('/admin-dashboard');
                            }
                        })
                        .catch((error) => {
                            console.log('Error verifying user information', error);
                            alert('Error verifying user information');
                        });
                }
            });
        }
    }, []);

    function signIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential?.user;
                if (user) {
                    router.push('/admin-dashboard');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('error creating account');
                console.error(errorCode, errorMessage);
                if (errorCode === 'auth/wrong-password') {
                    alert('Unable to login. Incorrect password provided.');
                } else if (errorCode === 'auth/user-not-found') {
                    alert('Unable to login. User does not exist with this email.');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Unable to login. Invalid email provided.');
                } else {
                    alert(`Unable to login. ${errorMessage ? errorMessage : 'Unknown server error.'}`);
                }
            });
    }

    return (
        <div>
            <Head>
                <title>Contact | GT WebDev</title>
            </Head>
            <AdminNavBar/>
            <div className="main" style={{display: "flex", width: "100%", justifyContent: "center"}}>
                <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '500px', rowGap: '10px'}}>
                    <h2 style={{textAlign: "center"}}>Login</h2>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="email"
                               name="email" onChange={(event) => {
                        setEmail(event.target.value)
                    }}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                               name="password" onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                    <Button onClick={() => {
                        signIn();
                    }} variant="contained">Login</Button>
                </Box>
            </div>
        </div>
    );
}

export default Login;
