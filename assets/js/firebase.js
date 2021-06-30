      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
      apiKey: "AIzaSyBL4kIVmDW3LaGDzrMokG8FVJI4jk5ze9Y",
      authDomain: "bridges-site.firebaseapp.com",
      databaseURL: "https://bridges-site.firebaseio.com",
      projectId: "bridges-site",
      storageBucket: "bridges-site.appspot.com",
      messagingSenderId: "207752526651",
      appId: "1:207752526651:web:a4715f9c090a727c26551e",
      measurementId: "G-R6GCN0T00S"
};
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      firebase.auth();

// =======================================================================
//                     Login Button (onClick)
// =======================================================================
//  function takes text from email and password field and relay info
//    to firebase for authentication. Firebase returns user object once
//    authenticated or alerts user to error
// =======================================================================
$("#login-button").click(function(){
  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;
  //var human = documet.getElementById("human").value;

  if(userEmail.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if(userPassword.length < 4) {
    alert('Please enter a password.');
    return;
  }
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
    return firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      //window.alert(userEmail + " " + userPassword)
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  })						
});

// =======================================================================
//                     Add User Button (onClick)
// =======================================================================
//  function calls proper firebase add user function with entered email
//    and password. Keeps current user logged in and redirects to dash.
// =======================================================================
$("#add-user-submit-button").click(function(){
  console.log("Clicked");
  //Prompt for Users Email and Password
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //Create Account with Credentials
  firebase.auth().createUserWithEmailAndPassword(email,password).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  //Alert User of Success
  alert("User Created: Success");
  window.location = "loggedin.html";

});

// =======================================================================
//                     Logout Button (onClick)
// =======================================================================
//  function calls proper firebase logout API functions. Alerts user
//    of any errors and redirects to login page.
// =======================================================================
$("#logout-button").click(function(){
  //window.alert("Clicked");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "login.html";
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
});


// =======================================================================
//                     Update Profile Button (onClick)
// =======================================================================
//  function opens a popup showing editable profile features such as 
//  username, email and password
// =======================================================================
$("#update-profile-button").click(function(){
  console.log("Clicked");

  let errorLog = document.createElement("p");
  errorLog.id= "error-log";
  errorLog.style.marginBottom = "5px";
  errorLog.style.color = "#DC143C"

  let btnChangePassword = document.createElement("button");
  btnChangePassword.id = "change-password-button";
  btnChangePassword.className = "button small wide smooth-scroll-middle";
  btnChangePassword.textContent = "Change Password"
  btnChangePassword.addEventListener("click", e => {
    var auth = firebase.auth();
    var user = firebase.auth().currentUser;
    var emailAddress = "error@test.com";

    if (user != null) {
      user.providerData.forEach(function (profile) {
        emailAddress = profile.email;
        console.log("  Email: " + emailAddress);
      });
    }
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      errorLog.style.color = "#47D3E5";
      errorLog.textContent = "Email sent"
      //window.alert("EMAIL SENT TO RESET PASSWORD");
    }).catch(function(error) {
      // An error happened.
      var errorMessage = error.message;
      errorLog.textContent = errorMessage;
      //alert(errorMessage);
    });
  });

  let emailDisplay = document.getElementById("emailDisplay");


  let emailDisplayEdit = document.createElement("input")
  emailDisplayEdit.type = "email";
  emailDisplayEdit.name = "email";
  emailDisplayEdit.value = emailDisplay.textContent;
  emailDisplayEdit.required = true;
  let displayDiv  = document.getElementById("display-div");

  let btnChangeEmail = document.createElement("button");
  btnChangeEmail.id = "change-email-button";
  btnChangeEmail.className = "button small wide smooth-scroll-middle";
  btnChangeEmail.textContent = "Change Email"
  btnChangeEmail.addEventListener("click", e => {
    errorLog.textContent ="";
    emailDisplay.remove()
    displayDiv.append(emailDisplayEdit);
    emailDisplayEdit.contentEditable = true;
    btnChangeEmail.remove();

    let btnUpdateEmail = document.createElement("button");
    btnUpdateEmail.id = "submit-email-button";
    btnUpdateEmail.className = "button small wide smooth-scroll-middle";
    btnUpdateEmail.textContent = "Submit Email"
    btnUpdateEmail.addEventListener("click", e =>{
      let newEmail = emailDisplayEdit.value;
      var auth = firebase.auth();
      var user = firebase.auth().currentUser;
      if(newEmail != emailDisplay.textContent){
        user.updateEmail(newEmail).then(function(){
            //Update Succesful
            console.log("Update Successful: " + newEmail);
            displayDiv.append(emailDisplay);
            emailDisplayEdit.remove();
            window.location.href = "loggedin.html";
          }).catch(function(error){
            //Error
            errorLog.textContent = "ERROR: " + error.message;
            console.log(error);
          });
        }else{
          errorLog.textContent = "No change found";
        }
      }); 
    fieldsDiv.append(btnUpdateEmail);
  });

  let fieldsDiv = document.getElementById("fields-div");
  fieldsDiv.append(btnChangePassword);
  fieldsDiv.append(btnChangeEmail)

  let btnUpdateProfile = document.getElementById("update-profile-button");
  btnUpdateProfile.remove();

  let btnCancel = document.createElement("button");
  btnCancel.id = "cancel-profile-update-button";
  btnCancel.className = "button small wide smooth-scroll-middle";
  btnCancel.textContent = "Cancel";
  btnCancel.addEventListener("click", e => {
      updateDiv.append(btnUpdateProfile);
      btnCancel.remove();
      btnChangeEmail.remove();
      btnChangePassword.remove();
      emailDisplayEdit.remove();
      displayDiv.append(emailDisplay);
      let btnSubmitEmail = document.getElementById("submit-email-button");
      if(btnSubmitEmail != null){
        btnSubmitEmail.remove();
      }
      errorLog.remove();
    });

    let erorrDiv = document.getElementById("error-div");
    erorrDiv.append(errorLog);

    let updateDiv = document.getElementById("update-div");
    updateDiv.append(btnCancel);


});

// =======================================================================
//                     Change Password Button Button (onClick)
// =======================================================================
//  function uses Firebase API to send e-mailto reset password for 
//    authentication. 
// =======================================================================
$("#change-password-button").click(function(){
  
});

// =======================================================================
//                     Forgot Password Button Button (onClick)
// =======================================================================
//  function uses Firebase API to send email based on text in email
//    field. 
// =======================================================================
$("#forgot-password-button").click(function(){
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email").value;

  if (emailAddress != "") {
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      window.alert("EMAIL SENT TO RESET PASSWORD");
    }).catch(function(error) {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });

  } else{
    window.alert("Please enter an Email")
  }
  
});

//File Storage
const storage = firebase.storage();
var file;
var fileName;
var storageRef = storage.ref().child;
var userFileLabel = document.getElementById("user-file-label");
let btnStartUpload = document.getElementById("btnStartUpload");

// =======================================================================
//                     Upload Button (onClick)
// =======================================================================
//  function processes file upload to Firestore DB
// =======================================================================

$("#btnStartUpload").click(function(e){
  btnStartUpload.disabled = true;
  //Call Upload Popup
    let popover = document.createElement("div");
    popover.id = "uiavDefault";
    popover.className = "popover";

    let UIAlertView = document.createElement("div");
    UIAlertView.className = "UIAlertView";
    let title = document.createElement("div");
    title.className = "title";
    title.textContent = "Select File for Upload";

    let message = document.createElement("div");
    message.className = "message";
    message.textContent = "";

    let body = document.createElement("div");
    body.className = "body";

    let footer = document.createElement("div");
    footer.className = "footer";
    
    let fileSelecterbtn = document.createElement("input");
    fileSelecterbtn.type = "file";
    fileSelecterbtn.class = "file-select"
    fileSelecterbtn.id = "file-select";
    fileSelecterbtn.hidden = true;

    let btnSelectFile = document.createElement("button");
    btnSelectFile.id = "file-select";
    btnSelectFile.className = "button small wide smooth-scroll-middle";
    btnSelectFile.textContent = "Select File";

    let fileSelectedLabel = document.createElement("label");
    fileSelectedLabel.id = "user-file-label";
    fileSelectedLabel.textContent = "No file selected";

    let btnSubmit = document.createElement("button");
    btnSubmit.id = "file-submit";
    btnSubmit.className = "button small wide smooth-scroll-middle";
    btnSubmit.textContent = "Submit";
    
   btnSelectFile.addEventListener("click", e => {
      //Select File **SET SIZE CONSTRAINTS
      fileSelecterbtn.click();
      $(fileSelecterbtn).change(function(e){
        //Get File after change
        file = e.target.files[0];
        fileName = file.name;
        console.log("FILE: " + fileName); 
        //Display File Name
        fileSelectedLabel.textContent = "Selected: " + fileName;
        //Create Storage Ref
        storageRef = firebase.storage().ref('main/docs/' + file.name);
        //Create Submit Button for UI
        footer.appendChild(btnSubmit);
      });
    }); 

    btnSubmit.addEventListener("click", e => {
      //Upload File
      var uploadTask = storageRef.put(file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        userFileLabel.textContent = fileName + ": upload complete";
        window.location.reload();
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      });
      popover.remove();
      btnStartUpload.disabled = false;
    });

    let btnCancel = document.createElement("button");
    btnCancel.id = "btnCancelAlertView";
    btnCancel.className = "button small wide smooth-scroll-middle";
    btnCancel.textContent = "Cancel";
    btnCancel.addEventListener("click", e => {
      popover.remove();
      btnStartUpload.disabled = false;
    });

    footer.appendChild(btnCancel);
    footer.appendChild(btnSelectFile);
    footer.appendChild(fileSelectedLabel);

    UIAlertView.appendChild(title);
    UIAlertView.appendChild(message);
    UIAlertView.appendChild(body);
    UIAlertView.appendChild(footer);

    popover.appendChild(UIAlertView);

    document.querySelector(".page-content").appendChild(popover);
});

//Retrieving List
// Create a reference under which you want to list
// Find all the prefixes and items.
window.onload = firebase.storage().ref('main/docs/').listAll().then(function(res) {
  res.prefixes.forEach(function(folderRef) {
    // All the prefixes under listRef.
    console.log(folderRef.name);
    // You may call listAll() recursively on them.
  });
  res.items.forEach(function(itemRef) {
    // All the items under listRef.
    //Display the Items and a Download Link
    //GET FILES INFO START
//Start of File View
      let popover = document.createElement("div");
      popover.id = "uiavDefault";
      popover.className = "popover";

      let UIAlertView = document.createElement("div");
      UIAlertView.className = "UIAlertView";
      let title = document.createElement("div");
      title.className = "title";
      title.textContent = "";

      let message = document.createElement("div");
      message.className = "message";
      message.textContent = "";

      let body = document.createElement("div");
      body.className = "body";

      let footer = document.createElement("div");
      footer.className = "footer";

      let fileLabel = document.createElement("label");
      fileLabel.id = "user-file-label";
      fileLabel.textContent = "No files";


      let btnFileDownload = document.createElement("button");
      btnFileDownload.id = "btnFileDownload";
      btnFileDownload.className = "button small icon solid fa-download smooth-scroll-middle";
      btnFileDownload.textContent = "Download";
      btnFileDownload.addEventListener("click", e => {
        //Start Download
        console.log("Download Clicked");
          // Get the download URL
          itemRef.getDownloadURL().then(function(url) {
            // Insert url into an <img> tag to "download"
            // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                  var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
          }).catch(function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                console.log('ERROR: Object not found');
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log('ERROR: Unauthorized request');
                break;
              case 'storage/canceled':
                // User canceled the upload
                console.log('ERROR: Canceled');
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                console.log('ERROR: Unknown Error please contact us!');
                break;
            }
          });
      });

     let btnFileDelete = document.createElement("button");
      btnFileDelete.id = "btnFileDelete";
      btnFileDelete.className = "button small icon solid fa-trash smooth-scroll-middle";
      btnFileDelete.textContent = "Delete";
      btnFileDelete.addEventListener("click", e => {
        //Start Delete
        itemRef.delete().then(function() {
          // File deleted successfully
          console.log("Deleted");
          window.location.reload();
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      });

      if(itemRef != null){
        fileLabel.textContent = itemRef.name;
      }

      footer.appendChild(fileLabel);
      footer.appendChild(btnFileDownload);
      footer.appendChild(btnFileDelete);

      UIAlertView.appendChild(title);
      UIAlertView.appendChild(message);
      UIAlertView.appendChild(body);
      UIAlertView.appendChild(footer);

      popover.appendChild(UIAlertView);

      document.querySelector(".page-main").appendChild(popover);

  });
}).catch(function(error) {
  // Uh-oh, an error occurred!
});
