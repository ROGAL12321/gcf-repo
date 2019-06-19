function loadUserData(user) {
  if (user && user.email) {
    window.location.replace("/dashboard");
  }
}


firebase.auth().onAuthStateChanged(loadUserData);