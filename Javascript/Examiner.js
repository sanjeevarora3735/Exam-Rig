
function ExaminerOnLoadFunctions(){
  CheckSmallProfile();
}

function FetchSmallProfile(User_Name , User_Email , User_Image) {
  console.log(User_Name,User_Email,User_Image);

  var Name_Object = document.getElementById("Examiner_Name").textContent = User_Name;
  // var Email_Object = document.getElementById("Examiner_Email").textContent = User_Email;
  var Image_Object = document.getElementsByClassName("MyProfile-tab")[0].getElementsByClassName("notify_icon")[0]
  .getElementsByClassName("icon")[0];

  Image_Object.style.background = "url('../"+User_Image+"') no-repeat 0 0";
  Image_Object.style.backgroundSize = "cover";
  Image_Object.style.width = "32px";
  Image_Object.style.height = "37px";
  Image_Object.style.backgroundPosition = "center";
}

function CheckSmallProfile(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      FetchSmallProfile(user.displayName,user.email,user.photoURL);
      // console.log(user.email);
    } else {
      console.log("No one is here ");
    }
  });
}


// Main Display OnLoad Functions
function MainDisplay_ExaminerOnLoad(){
  ShowNotification_HideNotification(false);
  ShowSettings_MyAccount(false);
}






function ShowFirstSubMenu(Sub_Menu_ID) {
  var FirstMenu = document.getElementsByClassName("sub-menu-list")[Sub_Menu_ID];
  if (FirstMenu.style.display != "block") {
    FirstMenu.style.display = "block";
  } else {
    FirstMenu.style.display = "none";
  }
}

function ShowNotification_HideNotification(Temporary = true) {
  var ParentNotification = document.getElementsByClassName("notification_dd")[0];
  var Settings_dd = document.getElementsByClassName("Settings_dd")[0];

  if(ParentNotification.style.display != "block" && Temporary){
    Settings_dd.style.display = "none";
    ParentNotification.style.display = "block";
    TitleToAllNotification();
    ParentNotification.classList.remove("swing-out-top-bck");
  }
  else{
    ParentNotification.classList.add("swing-out-top-bck");
    setTimeout(() => {
      ParentNotification.style.display = "none";
    },1000);
  }
}

function ShowSettings_MyAccount(Temporary = true){
  var ParentNotification = document.getElementsByClassName("notification_dd")[0];
  var ParentNotification2 = document.getElementsByClassName("notification_ul")[1];
  var Settings_dd = document.getElementsByClassName("Settings_dd")[0];
  if(Settings_dd.style.display != "block" && Temporary){
    ParentNotification.style.display = "none";
    Settings_dd.style.display = "block";
    Settings_dd.classList.remove("swing-out-top-bck");

  }
  else{
    // ParentNotification2.style.height = "0px";
    Settings_dd.classList.add("swing-out-top-bck");
    setTimeout(() => {
      Settings_dd.style.display = "none";
    },1000);
  }
}

function TitleToAllNotification() {
  var NumberofNotification = document.getElementsByClassName("sub_title").length;
  for (let index = 0; index < NumberofNotification; index++) {
    document.getElementsByClassName("sub_title")[index].title = document.getElementsByClassName("sub_title")[index].textContent;
    
  }
}

function alert_Notification(Element_alert_Notification,Strong,Div_Text_Message) {

  var alert_Notification_div = document.getElementsByClassName("alert_Notification")[Element_alert_Notification];
  var Notification_Message = alert_Notification_div.getElementsByTagName("span")[1];
  Notification_Message.innerHTML = Div_Text_Message;
  var Strong_Message = alert_Notification_div.getElementsByTagName("strong")[0];
  Strong_Message.textContent = Strong;
  if (alert_Notification_div.style.display =="block") {
    alert_Notification_div.style.display ="none";
  } else {
    alert_Notification_div.style.display ="block";
    setTimeout(function () {
      alert_Notification_div.classList.remove("bounce-in-top");
      alert_Notification_div.classList.add("fade-out-top");
      setTimeout(function () {
        alert_Notification_div.style.display =
          "none";
          alert_Notification_div.classList.remove("fade-out-top");
          alert_Notification_div.classList.add("bounce-in-top");
      }, 7000);
    }, 3000);
  }
}