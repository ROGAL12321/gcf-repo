var myAccountHook = document.querySelector('#my-account-hook');

function loadUserData(user) {
  if (user && user.email) {
    myAccountHook.innerHTML = `
      <ul id="kingster-top-bar-menu" class="sf-menu kingster-top-bar-menu kingster-top-bar-right-menu">
          <li class="menu-item kingster-normal-menu"><a href="dashboard"></a></li>
      </ul>
      <div class="kingster-top-bar-right-social"></div>
      <a class="kingster-top-bar-right-button" href="dashboard">Moje konto</a>
    `
  }
}


firebase.auth().onAuthStateChanged(loadUserData);