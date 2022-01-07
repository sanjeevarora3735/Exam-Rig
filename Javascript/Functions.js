window.addEventListener("load", windowsonload);

function windowsonload() {
  widthchanges();
}

function ExamCodeBox(UserType) {
  if (UserType != "STUDENT") {
    document.getElementsByClassName("Examcode")[0].style.display = "none";
    document.getElementsByClassName("Examcode")[1].style.display = "none";
  } else {
    document.getElementsByClassName("Examcode")[0].style.display = "block";
    document.getElementsByClassName("Examcode")[1].style.display = "block";
  }
}

function imagechanger() {
  var usertype = document.getElementById("Login_UserType").value;
  var classyavtar = document.getElementById("ClassyAvtar");
  if (usertype == "STUDENT") {
    ExamCodeBox(usertype);
    classyavtar.src = "Images/Student Avtar.jpg";
  } else {
    ExamCodeBox(usertype);
    classyavtar.src = "Images/Teacher Avtar.jpg";
  }
}
function imagechanger2() {
  var usertype2 = document.getElementById("Signup_UserType").value;
  var classyavtar2 = document.getElementById("ClassyAvtar2");
  if (usertype2 == "STUDENT") {
    classyavtar2.src = "Images/Student Avtar.jpg";
  } else {
    classyavtar2.src = "Images/Teacher Avtar.jpg";
  }
}
Validscreen();
function Validscreen() {
  if (window.outerWidth > 1600) {
    document.getElementsByTagName("body")[0].innerHTML = "";
    var H1 = document.createElement("p");
    H1.style.fontSize = "100px";
    H1.style.color = "Black";
    H1.innerText =
      "Sorry This Screen Resolution is Not Supported By This Website";
    document.getElementsByTagName("body")[0].appendChild(H1);
  }
}

function Login() {
  document.getElementsByClassName("modal")[0].style.display = "block";
}

function Signup() {
  document.getElementsByClassName("modal")[1].style.display = "block";
}

function CloseModal(num) {
  if (num == 1) {
    document
      .getElementsByClassName("modal-content")[0]
      .classList.add("swing-out-top-bck");
    setTimeout(() => {
      document.getElementsByClassName("modal")[0].style.display = "none";
      document
        .getElementsByClassName("modal-content")[0]
        .classList.remove("swing-out-top-bck");
    }, 600);
  } else if (num == 2) {
    document
      .getElementsByClassName("modal-content")[1]
      .classList.add("swing-out-top-bck");
    setTimeout(() => {
      document.getElementsByClassName("modal")[1].style.display = "none";
      document
        .getElementsByClassName("modal-content")[1]
        .classList.remove("swing-out-top-bck");
    }, 600);
  }
}

// Declaring Some Variables Used By Below Programs
var FlipCard = 0;

function myFunction() {
  var BigTagLine = document.getElementsByClassName("BigTagLine")[0];
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    document.getElementById("spacer").style.display = "block";
    document.getElementById("NavLinks").style.float = "none";
    document.getElementById("divider").style.display = "none";
    document.getElementById("Bar").style.padding = "15px";
    BigTagLine.style.opacity = 0;
  } else {
    x.className = "topnav";
    document.getElementById("Bar").style.padding = "0px";
    document.getElementById("spacer").style.display = "none";
    document.getElementById("NavLinks").style.float = "right";
    BigTagLine.style.opacity = 1;
  }
}

window.onscroll = function () {
  StickyHeader();
};
function StickyHeader() {
  var image = document.getElementById("Logo");
  var header = document.getElementById("myTopnav");
  var TagLine = document.getElementById("BigTagLine");
  var Bar = document.getElementById("Bar");
  var sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    image.src = "Images/ExamRig1.jpg";
    header.style.backgroundColor = "#142654";
    header.classList.add("sticky");
    TagLine.style.paddingTop = "130px";
    Bar.style.display = "none";
  } else {
    Bar.style.display = "block";
    header.style.backgroundColor = "#1A3269";
    image.src = "Images/ExamRig.jpg";
    header.classList.remove("sticky");
    TagLine.style.paddingTop = "50px";
  }
}

function widthchanges() {
  if (window.outerWidth <= 600) {
    document.getElementsByClassName("TryNow")[0].textContent = "Try For Free";
    document.getElementsByClassName("main-head")[0].textContent =
      " Exam -  Rig | Pricing ";
    document.getElementsByClassName("main-head")[0].style.padding = "10px";
    document.getElementById("Border").style.padding = "10px 10px 0px";
  }
}

function OutlineColor(myElement) {
  console.log(myElement.id);
  document.getElementById(myElement.id).style.outlineColor = "black";
}

function alert_Notification(
  Element_alert_Notification,
  Strong,
  Div_Text_Message
) {
  var alert_Notification_div =
    document.getElementsByClassName("alert_Notification")[
      Element_alert_Notification
    ];
  var Notification_Message =
    alert_Notification_div.getElementsByTagName("span")[1];
  Notification_Message.innerHTML = Div_Text_Message;
  var Strong_Message = alert_Notification_div.getElementsByTagName("strong")[0];
  Strong_Message.textContent = Strong;
  if (alert_Notification_div.style.display == "block") {
    alert_Notification_div.style.display = "none";
  } else {
    alert_Notification_div.style.display = "block";
    setTimeout(function () {
      alert_Notification_div.classList.remove("bounce-in-top");
      alert_Notification_div.classList.add("fade-out-top");
      setTimeout(function () {
        alert_Notification_div.style.display = "none";
        alert_Notification_div.classList.remove("fade-out-top");
        alert_Notification_div.classList.add("bounce-in-top");
      }, 7000);
    }, 3000);
  }
}

function AfteLoginMainScreen() {
  window.open(
    "./Portal/Examiner.html",
    "Exam-Rig",
    "height=" +
      screen.height +
      ",width=" +
      screen.width +
      ",resizable=no,scrollbars=yes,toolbar=yes,menubar=yes,location=yes"
  );
}


/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  var elem = document.documentElement;

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
