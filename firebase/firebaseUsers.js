// * Function that checks the active user
export function checkActiveUser() {
    return new Promise(function (resolve, reject) {
        firebase.auth().onAuthStateChanged(user =>{
            if (user) 
            {
            // when promise claimed
              resolve(user); 
            } else 
            {
            // when promise failed
             reject();   
            }
        });
    })
}
// * 

// * Function that sign outs the user
export function signOutUser() {
    return new Promise (function (resolve, reject) {
        firebase.auth()
                .signOut()
                .then(() => {
                    resolve();
                }).catch((error) => {
                    reject()
                });
    })   
}
// *

// * Function that configures the email and password for log in
export function signInUser(email, password) {
    return new Promise (function (resolve, reject) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(function()
                    {
                        resolve();       
                    });
        })
        .catch(function(error) {
            // Handle Errors here.
            reject();
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })
}
// *

// * Function that create new users
export function createUser(email, password) {
    return new Promise (function (resolve, reject) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
            return firebase.auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(function () {
                            resolve();
                        })
        })
        .catch(function (error) {
            // Handle Errors here.
            reject();
            var errorCode = error.code;
            var errorMessage = error.message;
        })
    })
}

