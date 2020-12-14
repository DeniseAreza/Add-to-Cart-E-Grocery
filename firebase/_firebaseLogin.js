// ! Imports
import * as FirebaseUsers from './firebaseUsers.js';
import * as FirebaseHelper from './firebaseHelper.js' 

// * Function that uses checkActiveUser() promise
FirebaseUsers.checkActiveUser()
            .then(() => {
                console.log('user exists');
            }, function () {
                console.log('no user exists');
            });
// *

// * Function for log in
$('#loginBtn').click(signInClicked);
function signInClicked() {
    let userEmail = $('#input_loginEmail').val();
    let userPassword = $('#input_loginPassword').val();
    FirebaseUsers.signInUser(userEmail, userPassword)
                .then(() => {
                    location.reload(true)
                    console.log('Sucessfully logged in');
                }, function () {
                    $('#errorAlert').show();
                    console.log('failed to log in');
                })

}
// *

// * Function for determining access level
FirebaseHelper
        .getSnapShot('users')
        .then(function(value) {
            let {name, state} = value;
            if (state == 'admin') {
                window.location.href = 'html/_adminPage.html';
            } else {
                window.location.href = 'html/_customerPage.html';
            }

        })