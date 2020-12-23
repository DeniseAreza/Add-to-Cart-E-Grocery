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
export function getSnapShot (path) {
  return new Promise(function (resolve, reject) {
    FirebaseUsers.checkActiveUser().then(function (value) {
      firebase
        .database()
        .ref(`${path}/${value.uid}`)
        .child('profile')
        .once('value')
        .then(function (snapshot) {
          resolve(snapshot.val())
        })
    })
  })
}
// *

// * Retrieval of all users from the database
export function retrieveDBUsers() {
  // Create reference
  var rootReference = firebase.database().ref().child('users');

  //get records from the database
  rootReference.on('child_added', snapshot =>{
      //get the attributes from the database
      var name = snapshot.child('profile').child('name').val();
      var state = snapshot.child('profile').child('state').val();

       //Show the records to the html table
       $('#table_body_users').prepend("<tr><td>"+ name +"</td><td>"+ state +"</td></tr>")
    })
}   
// !

// ! For handling input in database
// * Handling event that uploads new details from the user
export function editProfile (path) {
  FirebaseUsers.checkActiveUser().then(function (value) {
    // get values from the form
    let customerName = $('#input_customerName').val()
    let customerMobileNumber = $('#input_customerMobileNumber').val()
    let customerEmail = $('#input_customerEmail').val()
    let customerAddress = $('#input_AddAddress').val()

    // set database reference
    var storageref = firebase
      .database()
      .ref(`${path}/${value.uid}`)
      .child('profile')

    // set the details to the database
    storageref.set({
      name: customerName,
      mobileNumber: customerMobileNumber,
      email: customerEmail,
      address: customerAddress,
      state: 'customer'
    })

     // notification that the editing of profile is successful
    alert('successful')
    window.location.href = '_customerViewProfile.html'
  }, function () {
      alert('Error: Please retry.')
  })
}
// *
// !
