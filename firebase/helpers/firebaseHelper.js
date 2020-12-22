// ! this Js will handle all queries

// * Imports
import * as FirebaseUsers from './firebaseUsers.js'

// * Dictionary
// path == address
// getSnapShot == value from the database
// *

// ! Retrieval of data
// * Handling event that retrieves the active user of this website
// used for all retrieval of profile details
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
// ! 

// ! For handling input in database
// * Handling event that uploads new details from the user
export function editProfile(path) {
    FirebaseUsers.checkActiveUser()
                .then(function (value) {
                    // get values from the form
                    let customerName = $('#input_customerName').val()
                    let customerMobileNumber = $('#input_customerMobileNumber').val()
                    let customerEmail = $('#input_customerEmail').val()
                    let customerAddress = $('#input_AddAddress').val()

                    // set database reference
                    var storageref = firebase.database().ref(`${path}/${value.uid}`).child('profile')
                        
                    // set the details to the database
                    storageref.update({
                        name: customerName,
                        mobileNumber: customerMobileNumber,
                        email: customerEmail,
                        address: customerAddress,
                        state: 'customer'
                    })

                    // notification that the editing of profile is successful
                    alert('success')
                    location.reload()
                })
}
// *

// * Handling event that adds address to the current user's address book
export function addAddress(path) {
    FirebaseUsers.checkActiveUser()
                .then(function (value) {
                    // get data
                    let customerAddress = $('#input_AddAddress').val()

                    // set database reference
                    var storageref = firebase.database().ref(`${path}/${value.uid}`).child('profile')

                    // set the address to the profile database
                    storageref.set({
                        address: customerAddress
                    })

                    // notification that the editing of profile is successful
                    alert('success')
                    location.reload()
                })
}
// ! 
