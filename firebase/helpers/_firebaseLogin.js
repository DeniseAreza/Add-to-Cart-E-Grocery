// ! Imports
import * as FirebaseUsers from '../helpers/firebaseUsers.js';
import * as FirebaseHelper from '../helpers/firebaseHelper.js' 

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

// * Function for creating account for users
$('#registerBtn').click(createAccountUser);
function createAccountUser() {
    let signupNewEmail = $('#register_InputEmail').val();
    let signupNewPassword = $('#register_InputPassword').val();
    FirebaseUsers.createUser(signupNewEmail, signupNewPassword)
                .then(() => {
                    window.location.href = 'html/customer/_customerStore.html';
                    console.log('Sucessfully logged in');
                }, function () {
                    console.log('failed to log in');
                    $('#errorAlertRegister').show();
                })
}

// * Function for determining access level
FirebaseHelper
        .getSnapShot('users')
        .then(function(value) {
            let {state} = value;
            if (state == 'admin') {
                window.location.href = 'html/admin/_adminStore.html';
            } else {
                window.location.href = 'html/customer/_customerStore.html';
            }

        })