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

FirebaseHelper
        .getSnapShot('users')
        .then(function(value) {
            let {name, mobileNumber, email} = value;
            document.getElementById('currentFullName').innerHTML = name;
            document.getElementById('currentUserMobile').innerHTML = mobileNumber;
            document.getElementById('currentUserEmail').innerHTML = email;
        })