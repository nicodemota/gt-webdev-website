import React, {Component} from "react";
import NavBar from "../components/NavBar";
import Head from 'next/head'
import {Box, Button, TextField} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from "../helpers/firebase";
import { useRouter } from 'next/router'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const auth = getAuth(firebaseApp);
    const router = useRouter();

    function signIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential?.user;
                if (user) {
                    router.push('/join');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('error creating account');
                console.error(errorCode, errorMessage);
                if (errorCode === 'auth/wrong-password') {
                    alert('Unable to login. Incorrect password provided.');
                } else if(errorCode === 'auth/user-not-found') {
                    alert('Unable to login. User does not exist with this email.');
                } else if(errorCode === 'auth/invalid-email') {
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
            <NavBar />
            <div className="main" style={{display: "flex", width: "100%", justifyContent: "center"}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', rowGap: '10px' }}>
                    <h2 style={{textAlign: "center"}}>Login</h2>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="email"
                               name="email" onChange={(event) => {setEmail(event.target.value)}} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                               name="password" onChange={(event) => {setPassword(event.target.value)}} />
                    <Button onClick={() => {signIn();}} variant="contained">Login</Button>
                </Box>
            </div>
        </div>
    );
}

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             "email": "",
//             "password": ""
//         };
//     }
//
//     signIn = (event) => {
//         const auth = getAuth(firebaseApp);
//         const router = useRouter();
//         signInWithEmailAndPassword(auth, this.state.email, this.state.password)
//             .then((userCredential) => {
//                 const user = userCredential?.user;
//                 if (user) {
//                     // navigate(k_root_page_route);
//                     router.push('/join');
//                 }
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.error('error creating account');
//                 console.error(errorCode, errorMessage);
//                 if (errorCode === 'auth/wrong-password') {
//                     alert('Unable to login. Incorrect password provided.');
//                 } else if(errorCode === 'auth/user-not-found') {
//                     alert('Unable to login. User does not exist with this email.');
//                 } else if(errorCode === 'auth/invalid-email') {
//                     alert('Unable to login. Invalid email provided.');
//                 } else {
//                     alert(`Unable to login. ${errorMessage ? errorMessage : 'Unknown server error.'}`);
//                 }
//             });
//     }
//
//     handleChange = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }
//
//     render() {
//         return (
//             <div>
//                 <Head>
//                     <title>Contact | GT WebDev</title>
//                 </Head>
//                 <NavBar />
//                 <div className="main" style={{display: "flex", width: "100%", justifyContent: "center"}}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', rowGap: '10px' }}>
//                         <h2 style={{textAlign: "center"}}>Login</h2>
//                         <TextField id="outlined-basic" label="Email" variant="outlined"
//                                    name="email" onChange={this.handleChange} />
//                         <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
//                                    name="password" onChange={this.handleChange} />
//                         <Button onClick={this.signIn} variant="contained">Login</Button>
//                     </Box>
//                 </div>
//             </div>
//         );
//     }
// }

export default Login;
