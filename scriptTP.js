

window.onload = async function () {
  loadFetch();
  await new Promise(resolve => setTimeout(resolve, 500));

};

//donc ça c'est la variable global qui permet de savoir qui doit être caché
var hiddenElems = [];

function change() {
  //on récupere à chaque click l'ensemble des coches qui sont clickés
  //Cbs c'est l'ensemble des trusc à cocher dans une ligne (une classe)
  var levelCbs = document.querySelectorAll(".level input[type='checkbox']");
  //ici ça nous permet de récupérer pour chaque classe séparée ce qui est coché
  var filters = {
    levelF: getClassOfCheckedCheckboxes(levelCbs),
  };
  themeChoosen = document.getElementById("themeSelect").value
  console.log("theme choosen when i click on it", themeChoosen)
  filterResults(filters,themeChoosen);

}

//cette fonction vérifie à quelle classe appartient la checkbox et que il y en a qui sont cochées et elle retourne
//une listes du nom des niveaux cochés (par exemple, [Physique, Chimie])
function getClassOfCheckedCheckboxes(checkboxes) {
  var classes = [];
  console.log(checkboxes)
  //pourquoi y'a if checkboxes??? if (checkboxes && checkboxes.length > 0) {
  if (checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i];

      if (cb.checked) {
        classes.push(cb.getAttribute("rel"));
      }
    }
  }

  return classes;
}



//donc ici lineOfCheckbox, ca fait reference par exemple ) Phtysique, Chimie, SVY
//lineTitle fait référence à Matière, Niveau, Source (-un des 4...)
function hideOrShow(lineOfCheckbox, lineTitle, themeChoosen) {
  for (var i = 0; i < dataTP.length; i++) {
    var experiment = dataTP[i];
    console.log("linesof checkbox", lineOfCheckbox)
    if (lineOfCheckbox.length > 0) {
      var isHidden = true;

      for (var j = 0; j < lineOfCheckbox.length; j++) {
        //filter here is a singular name, like chimie, 6ème,... i think
        var filter = lineOfCheckbox[j];
        console.log("filter", filter)
        if (lineTitle == "level") {

          //si l'expérimentation dans la base de TP contient le filter (un de ceux qui est coché)
          //concernant le niveau
              //null because if no theme was choosed, it's free and show up all the level corresponding tps there is
          if (experiment.level.includes(filter) && (experiment.theme == themeChoosen || themeChoosen =="null" )) {
            isHidden = false;
          }
        }
      }

      if (hiddenElems.includes(experiment) == false && isHidden == true) {
        console.log("hiddenElems", hiddenElems)
        hiddenElems.push(experiment);
      }
    }

  }
}






function filterResults(filters, themeChoosen) {
  //au début, tous les éléments sont cachés.
  //

  //var rElems = document.querySelectorAll(".result div");
  hiddenElems = []
  hideOrShow(filters.levelF, "level", themeChoosen);

  for (var i = 0; i < dataTP.length; i++) {
    //ça c'est pour si rien n'est coché, il faut mettre à vide
    if (filters.levelF == '') {
      document.getElementById("result").innerHTML = " "
    }
    else {

      //if(document.getElementById(dataTP[i].id) === null) il y avait marqué ça mais je comprends pas??
      //comment l'id pourrait être égal à null?? ah non, je vois, c'est si l'él

      if (document.getElementById(dataTP[i].id) === null) {
        let tpHTML = transformInHTML(dataTP[i])
        document.getElementById("result").appendChild(tpHTML)

      }
      else {
        tpToShow = document.getElementById(dataTP[i].id)
        tpToShow.style.display = "inline-block";
        tpToShow.parentElement.style.display = "inline-block";
      }

    }



  }

  if (hiddenElems.length <= 0) {
    return;
  }
  else {
    for (var i3 = 0; i3 < hiddenElems.length; i3++) {
      expToHide = document.getElementById(hiddenElems[i3].id)
      expToHide.style.display = "none";
      expToHide.parentElement.style.display = "none";


    }
  }
}


function transformInHTML(exp) {

  divElement = document.createElement("div")
  divElement.className = "oneTP";
  divElement.innerHTML = '<div id="' + exp.id + '"><div class="expHeader"><h4>' + exp.name + '</h4></div><ul><li>Niveau: ' + exp.level + '</li><div class="tooltip-container"><li onmouseover="showLocation(this)" onmouseleave="hideLocation(this)">' + exp.chemP + '</li></div><a href="#" onclick="openPDF(this)" class="popup"><li>PDF Laborantin</li></a><li>PDF Élève</li></ul></div>'
  return divElement
}

function showLocation(e) {

  let oneTPchemP = e.textContent.split(",");
  var tooltip = document.createElement('div')
  tooltip.id = "tooltip-text"
  for (i = 0; i < oneTPchemP.length; i++) {
    for (i2 = 0; i2 < dataProducts.length; i2++) {
      if (oneTPchemP[i] == dataProducts[i2].name) {
        tooltip.innerHTML += dataProducts[i2].name + ": " + dataProducts[i2].location + "</br>"

      }
    }
  }
  e.after(tooltip)
}

function hideLocation(e) {
  document.getElementById("tooltip-text").remove()
}

function openPDF(e) {
  window.open('C:\\Users\\Progranma\\Downloads\\javascriptImages\\' + e.parentElement.parentElement.id + '.pdf', '_blank');
  return false;
}