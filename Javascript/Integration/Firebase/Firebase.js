const firebaseConfig = {
  apiKey: "AIzaSyB2n8YyVDfmWbcMQP3S1ZmnRcNYe8azjHY",
  authDomain: "exam-rig-59f1b.firebaseapp.com",
  projectId: "exam-rig-59f1b",
  storageBucket: "exam-rig-59f1b.appspot.com",
  messagingSenderId: "424693451623",
  appId: "1:424693451623:web:d9969f30d21a2a2ccdfdc2",
  measurementId: "G-ZMYVY0BWY9",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function Signup_Firebase(Name, Email, Password, User_Type) {
  var Signup_Data = {
    Name: Name,
    Emali: Email,
    Password: Password,
    User_Type: User_Type,
    Verified: false,
  };
  db.collection("Users")
    .doc(Email)
    .set(Signup_Data)
    .then(() => {
      console.log("Document successfully written!");
    });
}

function FetchData_Signup() {
  var Name = document.getElementById("Signup_Name").value.toLowerCase();
  var Email = document.getElementById("Signup_Email").value.toLowerCase();
  var Password = document.getElementById("Signup_Password").value;
  var User_Type = document.getElementById("Signup_UserType").value;
  var Message_Signup = document.getElementById("Signup_Message_Bar");
  console.log(Name, Email, Password, User_Type);
  if (
    Name != null &&
    Email != null &&
    Password != null &&
    User_Type != null &&
    Name != "" &&
    Email != "" &&
    Password != "" &&
    User_Type != ""
  ) {
    var Complete_Transaction = false;
    try {
      CreateUserWithEmail_Firebase(Name, Email, Password, User_Type);
      Complete_Transaction = true;
    } catch (error) {
      console.log(error);
    }
  } else {
    var respectiveIssue;
    if (Name == null || Name == "") {
      var Name_Input = document.getElementById("Signup_Name");
      Name_Input.focus();
    } else if (Email == null || Email == "") {
      var Email_Input = document.getElementById("Signup_Email");
      Email_Input.focus();
    } else if (Password == null || Password == "") {
      var Password_Input = document.getElementById("Signup_Password");
      Password_Input.focus();
    }
  }
}
function CreateUserWithEmail_Firebase(Name, Email_ID, Password, User_Type) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(Email_ID, Password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      Signup_Firebase(Name, Email_ID, Password, User_Type);
      alert_Notification(
        1,
        "Info",
        "You have created your account successfully !"
      );
      UpdateUsersName_Image(Name);
      setTimeout(function () {
        alert_Notification(
          2,
          "Verification : ",
          "Please Verify Your Email Address in Order to Process."
        );
      }, 6000);
      setTimeout(function () {
        CloseModal(2);
      }, 7000);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert_Notification(3, errorCode + " : ", errorMessage);
      // ..
    });
}

function FetchData_Login() {
  var Email = document.getElementById("Login_Email").value.toLowerCase();
  var Password = document.getElementById("Login_Password").value;
  var User_Type = document.getElementById("Login_UserType").value;

  if (Email == "" || Email == null || Password == "" || Password == null) {
    if (Email == null || Email == "") {
      var Email_Input = document.getElementById("Login_Email");
      Email_Input.focus();
    } else if (Password == null || Password == "") {
      var Password = document.getElementById("Login_Password");
      Password.focus();
    }
  } else {
    db.collection("Users")
      .doc(Email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().User_Type == User_Type) {
            // alert_Notification(1,"Found : " , "User_Type Verification Done");
            LoginWithEmailId_Firebase(Email, Password);
          } else {
            alert_Notification(2, "Found : ", "User_Type Not Matched");
          }
          // console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          alert_Notification(
            3,
            "Not Found :",
            "There is No Account Belong to This Email Address"
          );
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
}

function LoginWithEmailId_Firebase(Email, Password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(Email, Password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      var user = userCredential.user.bc.displayName;

      AfteLoginMainScreen();
      // alert_Notification(
      //   0,
      //   "Hi ! " + user.toUpperCase() + " : ",
      //   " Welcome To The Exam-Rig ".toLowerCase()
      // );

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert_Notification(3, errorCode + " : ", errorMessage);
    });
}

function IsAnyoneHere() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(user.email);
      return "Hi";
      // ...
    } else {
      console.log("No one is here ");
      // User is signed out
      // ...
    }
  });
}

function LogOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.close(); 
      setTimeout(() => {
        alert_Notification(
          1,
          "Logout Success : Thanks For Giving us Your Precious Time ",
          "."
        );
      }, 1000);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert_Notification(3, errorCode + " : ", errorMessage);
      // An error happened.
    });
}

function UpdateUsersName_Image(
  DisplayName,
  ProfileUrl = "Images/Profile_Url_Image.png"
) {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: DisplayName,
      photoURL: ProfileUrl,
    })
    .then(() => {
      // Update successful
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
}

function DisplayUserName_Image() {
  const user = firebase.auth().currentUser;

  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
}

// function is_Such_Account_Present(Email) {
//   db.collection("Users").doc(Email)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         console.log("Document data:", doc.data());console.log("!");
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//         Accountinformation = null
//       }
//     })
//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });

// }
