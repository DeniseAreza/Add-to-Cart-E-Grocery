// ! this Js will handle all queries

// * Imports
import * as FirebaseUsers from './firebaseUsers.js'

// * Dictionary
// path == address
// getSnapShot == value from the database
// *

// * Handling event that retrieves the active user of this website
// yung path kukunin sa firebase signin
// so kukunin niya  yung 'users'
// name and state as value galing sa firebase signin js
export function getSnapShot(path) {
    return new Promise (function (resolve, reject) {
        FirebaseUsers.checkActiveUser()
                    .then(function (value) {
                        firebase.database()
                                .ref(`${path}/${value.uid}`)
                                .once('value')
                                .then(function (snapshot) {
                                    resolve(snapshot.val())
                                })
                    })
    })
}