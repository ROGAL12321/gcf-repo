var email = document.querySelector('#email');
var password = document.querySelector('#password');
var loginForm = document.querySelector('#login-form')

function submitForm(ev) {
  ev.preventDefault();

  if(!email.value || !password.value) return;

  firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function() {
    window.location.replace("/dashboard");
  })
}

loginForm.addEventListener('submit', submitForm)