function loadUserData(user) {
  if (user && user.email) {
    window.location.replace(location.origin + "/dashboard");
  }
}


firebase.auth().onAuthStateChanged(loadUserData);