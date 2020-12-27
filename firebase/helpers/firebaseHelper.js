// ! this Js will handle all queries

// * Imports
import * as FirebaseUsers from '../helpers/firebaseUsers.js'

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
export function retrieveDBUsers () {
  // Create reference
  var rootReference = firebase
    .database()
    .ref()
    .child('users')

  //get records from the database
  rootReference.on('child_added', snapshot => {
    //get the attributes from the database
    var name = snapshot
      .child('profile')
      .child('name')
      .val()
    var state = snapshot
      .child('profile')
      .child('state')
      .val()

    //Show the records to the html table
    $('#table_body_users').prepend(
      '<tr><td>' + name + '</td><td>' + state + '</td></tr>'
    )
  })
}

// * Retrieval of Home Care Products
export function homeCareProducts() {
  var rootReference = firebase.database().ref('Products').child('Home Care');

    rootReference.on('child_added', snapshot =>{
        var productName = snapshot.child('Name').val();
        var productCategory = snapshot.child('productCategory').val();
        var productPrice = snapshot.child('Price').val();
        var productImage = snapshot.child('URL').val();
        var productAvailability = snapshot.child('Availability').val();
        var productCode = snapshot.child('Code').val();

        // Retrieve all to this style
        $('#productsDB').append('<div class="row row-cols-1 row-cols-md-2 g-4 d-flex justify-content-center m-2"><div class="col h-25 w-50"><div class="card"><img src='+ productImage +' class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title display-6">'+ productName +'</h5><h6>Category: '+ productCategory +'</h6><h6>Code: '+ productCode +'</h6><h6>Availability: '+ productAvailability +'</h6><h6>Price: Php '+ productPrice +'</h6><button type="button" class="btn btn-warning w-100" id="addToCart">Add to cart</button></div></div></div></div>');
    })
}
// !

// ! For handling input in database
// * Handling event that uploads new details from the user
export function editProfile (path) {
  FirebaseUsers.checkActiveUser().then(
    function (value) {
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
      console.log('successful edit of profile')
      window.location.href = '_customerViewProfile.html'
    },
    function () {
      alert('Error: Please retry.')
    }
  )
}
// *

// * Handling uploads for adding products
export function addProduct() {
  // Get elements
  var progressBar = document.getElementById('progress')
  var chooseProductImage = document.getElementById('productImage')

    // get the file from the input
    var file = chooseProductImage.files[0]

    // Create a storage container or reference
    var storageRef = firebase.storage().ref('Products/' + file.name)

    // Upload the file to the storage with put() method
    var task = storageRef.put(file)

    // Upload progress and linking the download URL to the database
    task.on(
      'state_changed',
      function progress (snapshot) {
        // You may add progress bar
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        progressBar.value = percentage
      },
      function error (err) {
        $('#errorAlert').show()
      },
      function complete () {
        console.log('successfuly uploaded')
        $("#successAlert").fadeTo(2000, 500).slideUp(500, function(){
          $("#successAlert").slideUp(500);
        });

        storageRef
          .getDownloadURL()
          .then(url => {
            console.log(url)

            // get input of the remianing information needed for the product
            var productCode = window.document.getElementById('productCode').value
            var productName = window.document.getElementById('productName').value
            var productPrice = window.document.getElementById('productPrice').value
            var productAvailability = window.document.getElementById('productAvailabilty').value
            var productCategory = window.document.getElementById('productCategory').value

            // set database reference
            var urlRef = firebase.database()
                                        .ref('Products/' + productCategory).child(productCode);

            // used the reference and the push method to append all download URL
            // use push method first
            urlRef.set({
              Name: productName,
              URL: url,
              Price: productPrice,
              Code: productCode,
              Availability: productAvailability,
              productCategory: productCategory
            })
          })

          .catch(err => {
            $('#errorAlert').show()
            console.log(err.message)
          })
      }
    )
}
// *
// !
