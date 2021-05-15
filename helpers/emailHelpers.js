/*
    Checks if an email is valid.
    Valid email = something@gatech.edu
*/
function emailIsValid(email) {
    let regex = /[a-zA-Z0-9+_.-]+@gatech.edu$/;
    return regex.test(email);
}

export {emailIsValid};