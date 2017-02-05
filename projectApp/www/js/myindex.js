firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".info").show();  
    $(".login-cover").hide();
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();

  } else {
    // No user is signed in.
     $(".info").hide();
    $(".login-cover").show();
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  }
});

$("#loginBtn").click(
  function() {
  var email = $("#loginEmail").val();
  var password = $("#loginPassword").val();

  if(email!="" && password!=""){

    $("#loginProgress").show();
    $("#loginBtn").hide();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      $("#loginError").show().text(error.message);


      $("#loginProgress").hide();
      $("#loginBtn").show();
    });
  }
  }
);


$("#signOutBtn").click(
  function(){
          firebase.auth().signOut().then(function() {
            $("#loginProgress").hide();
            $("#loginBtn").show();
            $('#loginEmail').val("");
              $('#loginPassword').val("");
        // Sign-out successful.
      }, function(error) {
        // An error happened.
        alert(error.message);

      });
        }
);
