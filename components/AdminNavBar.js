import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    Toolbar
} from "@mui/material";
import {getAuth} from "firebase/auth";
import firebaseApp from "../helpers/firebase";
import {useRouter} from "next/router";

const AdminNavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const auth = getAuth(firebaseApp);
    const router = useRouter();

    // check if user is admin - if they are not, then kick them out from this page
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setIsLoggedIn(true);
                } else if (!user) {
                    setIsLoggedIn(false);
                }
            });
        }
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img src="gt-webdev-logo.png" alt="GT WebDev" height="35" />
                    {
                        isLoggedIn &&
                        <Button variant="text" style={{color: "white", marginLeft: "auto"}} onClick={() => {
                            if (auth) {
                                auth.signOut()
                                    .then(response => {
                                        router.push("/login");
                                    })
                                    .catch((error) => {
                                        alert('Unable to sign out.');
                                    });
                            }
                        }}>Sign Out</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AdminNavBar;
