const dotenv = require("dotenv");
const firebase = require("firebase-admin");

dotenv.config()

// initialize firebase app
const firebaseCredentials = {
    type: process.env.firebase_type,
    project_id: process.env.firebase_project_id,
    private_key_id: process.env.firebase_private_key_id,
    private_key: process.env.firebase_private_key
        ? process.env.firebase_private_key.replace(/\\n/gm, "\n")
        : undefined,
    client_email: process.env.firebase_client_email,
    client_id: process.env.firebase_client_id,
    auth_uri: process.env.firebase_auth_uri,
    token_uri: process.env.firebase_token_uri,
    auth_provider_x509_cert_url: process.env.firebase_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.firebase_client_x509_cert_url,
}

for (const [key, value] of Object.entries(firebaseCredentials)) {
    if (value === undefined) {
        console.error(`${key} environment variable is undefined `)
        process.exit(1)
    }
}

firebase.initializeApp({
    credential: firebase.credential.cert(firebaseCredentials),
})

// from arguments get id of user to promote to admin
const arguments = process.argv;

if (arguments && arguments.length >= 3) {
    const admin_uid = arguments[2];
    firebase.auth().setCustomUserClaims(admin_uid, {admin: true})
        .then(() => {
            console.log('Successfully promoted user to admin, ID:', admin_uid);
        }).catch((error) => {
            console.error('Unable to promote user to admin', error);
        });
} else {
    console.error("Please provide ID of user to promote to admin");
    process.exit(1);
}
