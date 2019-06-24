var userEmail = document.querySelector('#userEmail');
var logout = document.querySelector('#logout');
var topbar = document.querySelector('#topbar-left-container');
var materialsURL = firebase.firestore().collection('/materials')
var tabContainer = document.querySelector('#tab-container')
var adminsEmails = [
  'rogaldj@gmail.com',
  'karolina.cikowska@girlscodefun.pl',
  'alicja.m@girlscodefun.pl'
]


function groupBy(array, key) {
  return array.reduce((r, v, i, a, k = v[key]) => ((r[k] || (r[k] = [])).push(v), r), {})
}

function loadData(querySnapshot) {
  var materials = []
  querySnapshot.forEach(function(doc) {
    materials.push(doc.data())
  });

  renderData(groupBy(materials, 'category'))
}

function renderData(materials) {
  for (var material in materials) {
    tabContainer.innerHTML += `
    <div class="gdlr-core-accordion-item gdlr-core-item-pdlr gdlr-core-item-pdb  gdlr-core-accordion-style-background-title-icon gdlr-core-left-align gdlr-core-icon-pos-right" >
    <div class="gdlr-core-accordion-item-tab clearfix>
      <div class="gdlr-core-accordion-item-icon gdlr-core-js gdlr-core-skin-icon "></div>
      <div class="gdlr-core-accordion-item-content-wrapper">
          <h4 class="gdlr-core-accordion-item-title gdlr-core-js  gdlr-core-skin-e-background gdlr-core-skin-e-content">${material}</h4>
          ${
            materials[material].map(function(x) {
              return `
                <div class="gdlr-core-accordion-item-content">
                    <p style="padding-left: 20px;">${x.name}
                      ${
                        x.fileURL 
                          ? `<a href="${x.fileURL}" target="_blank" download> <button class="tableBtn" style="float: right;"> Pobierz </button> </a>`
                          : `<a href="${x.url}" target="_blank"> <button class="tableBtn" style="float: right;"> Obejrzyj na Youtube </button> </a>`
                      }
                    </p>
                </div>
              `
            })
          }
      </div>
    </div>
    </div>
  `
  }
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location.replace("index");
    });
}

function loadUserData(user) {
  if (!user) {
    window.location.replace("login");
    return;
  }

  userEmail.innerText = user.email

  if(adminsEmails.indexOf(user.email) !== -1) {
    topbar.innerHTML += '<a href="materials"><button class="additem-btn">Zarządzaj materiałami</button></a><a href="categories"><button class="additem-btn">Zarządzaj kategoriami</button></a>'
  }

  materialsURL.get().then(loadData);
}


logout.addEventListener('click', signOut)
firebase.auth().onAuthStateChanged(loadUserData);