var firebaseConfig = {
    apiKey: "AIzaSyDTtdGwmo4iDxfWJK-iiNPessVq1UDPc2I",
    authDomain: "fir-signui.firebaseapp.com",
    databaseURL: "https://fir-signui.firebaseio.com",
    projectId: "fir-signui",
    storageBucket: "fir-signui.appspot.com",
    messagingSenderId: "1024880607529",
    appId: "1:1024880607529:web:651a4e237615d787083738",
    measurementId: "G-29BBKGX5NN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  

firebase.auth.Auth.Persistence.LOCAL;
 
$("#btn-login").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();

    if(email != ""  && password != "")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email,password);
        result.catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            window.alert("Message : "+ errorMessage);
        });
    }
    else{
        window.alert("Please fill out all the fields.");
    }
});
$("#btn-signup").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmpassword").val();

    if(email != ""  && password != "" && cpassword != "")
    {
        if(password == cpassword)
        {
        var result = firebase.auth().createUserWithEmailAndPassword(email,password);
        result.catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            window.alert("Message : "+ errorMessage);
        });
        }
        else{
            window.alert("password do not match.");
        }
    }
    else{
        window.alert("Please fill out all the fields.");
    }
});
$("#btn-resetPassword").click(function(){
    var auth=firebase.auth();
    var email=$("#email").val();
    if(email !=""){
      auth.sendPasswordResetEmail(email).then(function(){
        window.alert("An email has been sent to you please check and verify. ");
      })
      .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : "+ errorMessage);
      });
    }
    else{
        window.alert("please enter your email first");
    }
});
$("#btn-logout").click(function(){
    firebase.auth().signOut();
});


$("#btn-update").click(function(){
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fname = $("#firstname").val();
    var lname = $("#lastname").val();
    var country = $("#country").val();
    var gender = $("#gender").val();


    var rootRef=firebase.database().ref().child("Users");
    var userID=firebase.auth().currentUser.uid;
    var usersRef=rootRef.child(userID);

    if(fname !="" && lname !="" && phone !="" && bio !="" && address !="" && country !="" && gender !="" )
    {
        var userData=
        {
            "firstname":fname,
            "lastname":lname,
            "bio":bio,
            "address":address,
            "phone":phone,
            "country":country,
            "gender":gender,
        };
        usersRef.set(userData,function(error){
            if(error){
                var errorCode=error.code;
                var errorMessage=error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : "+ errorMessage);
            }
            else{
                window.location.href="mainpage.html";
            }
        });
    }
    else{
        window.alert("Form is incomplete,please fill out all the fields.");
    }
});