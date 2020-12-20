// * Main manager for customer store page

// Import
import * as FirebaseUsers from '../helpers/firebaseUsers.js'
import * as FirebaseHelper from '../helpers/firebaseHelper.js'

// * Function that uses checkActiveUser() promise
FirebaseUsers.checkActiveUser()
            .then(() => {
                console.log('user exists');
            }, function () {
                console.log('no user exists');
                window.location.href = '/'
            });

// * Function that sign outs user
$('#logoutBtn').click(signOutClicked)
function signOutClicked() {
    FirebaseUsers.signOutUser()
                .then(() => {
                    window.location.href = '/';
                    console.log('sign out');
                }, function () {
                    console.log('still logged in')
                });
}

// *Function that add address to the address book
$('#addAddressBtn').click(editAddressBook)
function editAddressBook() {
    FirebaseHelper.addAddress('users')
}

// * Function that will retrieve current user's data
FirebaseHelper
        .getSnapShot('users')
        .then(function(value) {
            let {name} = value;
            document.getElementById('currentUserName').innerHTML = name;
        })