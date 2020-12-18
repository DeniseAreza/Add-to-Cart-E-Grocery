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
                                .ref(`${path}/${value.uid}`).child('profile')
                                .once('value')
                                .then(function (snapshot) {
                                    resolve(snapshot.val())
                                })
                    })
    })
}
// *

// * Handling event that uploads new details from the user
export function editProfile(path) {
    FirebaseUsers.checkActiveUser()
                .then(function (value) {
                    let customerName = $('#input_customerName').val()
                    let customerMobileNumber = $('#input_customerMobileNumber').val()
                    let customerEmail = $('#input_customerEmail').val()
                    var storageref = firebase.database().ref(`${path}/${value.uid}`).child('profile')
                             
                    storageref.set({
                        name: customerName,
                        mobileNumber: customerMobileNumber,
                        email: customerEmail,
                        state: 'customer'
                    })

                    alert('success')
                    location.reload()
                })
}
// *
