//let dropdown = document.getElementById('chemistryDropdown');
let selectedProductsSection = document.getElementById("selectedProducts");
let availableTP = document.getElementById("availableTP")
let availableCoolStuff = document.getElementById("availableCoolStuff")
let defaultOption = document.createElement('option');
let arrayUserInp = [];
let btnAddProduct = document.getElementById('btnAddProduct')
let noZeroQuantityGlobal = true
dropdown = document.getElementById('chemistryDropdown');
dropdown.selectedIndex = 0;

window.onload = async function () {
  loadFetch();
  await new Promise(resolve => setTimeout(resolve, 500));
  makeDropdown(dataProducts, dropdown);
};


//const url ="https://chemecole.github.io/tp/chemistry.json"

//la place de load JSON avanjt la créationde loadJsons



//once the first product has been chosen, it would be more efficient to make it can only
//get reduced (because the more you add ingredients, the less choice of TPs)
//but because of the "remove" button, i think it 
//will be easier to forget about efficiency

function actualizeTP(selectedProducts) {
  availableTP.innerHTML = ""
  //the reason we have to wait  is that fetch is an async function, so the code continues without
  //the fetching being finished
  //maybe that would be an argument in favor of doing everything inside
  // the fetch function?
  //Look up : fetch 
  if (selectedProducts.length > 0) {
    for (countTP = 0; countTP < dataTP.length; countTP++) {
      //so tp[countTP] is one of the experiment of the tp database

      let allProductsAreIn = true // for each TP we check that
      for (countProducts = 0; countProducts < selectedProducts.length; countProducts++) {
        //so selectedProducts[countProducts] is one of the products inputed by user


        let productIsIn = false
        let iInExperiment = 0

        //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
        while (productIsIn === false && iInExperiment < dataTP[countTP].chemP.length) {
          if (dataTP[countTP].chemP[iInExperiment] === selectedProducts[countProducts]) {
            productIsIn = true
          }
          iInExperiment += 1
        }

        if (productIsIn === false) {
          allProductsAreIn = false
        }

      }


      //here we do the if allProductsAreIn is true stuff
      if (allProductsAreIn) {
        checkIfTheQuantityIsAbove0(dataTP[countTP])
        if (noZeroQuantityGlobal == false) {
          borderColor = "red"
        }
        else {
          borderColor = "green"
        }
        availableTP.innerHTML += '<div style="border:4px solid ' + borderColor + ';"><h3>' + dataTP[countTP].name + '</h3> <p> ingredients : ' + dataTP[countTP].chemP + '</p></div>'
      }
    }
  }
}

function checkIfTheQuantityIsAbove0(choosenTP) {
  noZeroQuantityGlobal = true
  for (let i = 0; i < choosenTP.chemP.length; i++) {
    for (let i2 = 0; i2 < dataProducts.length; i2++) {

      if (dataProducts[i2].name == choosenTP.chemP[i]) {
        if (dataProducts[i2].quantity == 0) {
          noZeroQuantityGlobal = false
        }
      }
    }
  }
}

function actualizeCoolStuff(selectedProducts) {
  availableCoolStuff.innerHTML = ""

  //the reason we have to wait  is that fetch is an async function, so the code continues without
  //the fetching being finished
  //maybe that would be an argument in favor of doing everything inside
  // the fetch function?
  //Look up : fetch 
  if (selectedProducts.length > 0) {
    //should be COUNTCOOL BROO BUT to lazy to change the countTP (it's basically an i ++ thing right)
    for (countTP = 0; countTP < dataCool.length; countTP++) {
      //so tp[countTP] is one of the experiment of the tp database
      //or here rather dataCool[countTP] is one of the fun fact of the cool stuff database
      let allProductsAreIn = true // for each TP we check that
      for (countProducts = 0; countProducts < selectedProducts.length; countProducts++) {
        //so selectedProducts[countProducts] is one of the products inputed by user


        let productIsIn = false
        let iInExperiment = 0
        //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
        while (productIsIn === false && iInExperiment < dataCool[countTP].chemP.length) {
          if (dataCool[countTP].chemP[iInExperiment] === selectedProducts[countProducts]) {
            productIsIn = true
          }


          iInExperiment += 1
        }

        if (productIsIn === false) {
          allProductsAreIn = false
        }

      }

      //here we do the if allProductsAreIn is true stuff
      if (allProductsAreIn) {
        if (noZeroQuantityGlobal == false) {
          borderColor = "red"
        }
        else {
          borderColor = "green"
        }
        availableCoolStuff.innerHTML += '<div style="border-color:' + borderColor + ';"> <h3>' + dataCool[countTP].name + '</h3> <p> ingredients : ' + dataCool[countTP].chemP + '</p></div>'
      }
    }
  }
}


function canBeAddedToList(arrayUserInp, userInp) {
  let dejaSelected = false
  for (i = 0; i < arrayUserInp.length; i++) {
    if (arrayUserInp[i] === userInp) {
      alert('ce produit chimique est déjà selectionné')
      dejaSelected = true
    }
  }

  let canBeAddedToList = false
  if (dejaSelected === false) {
    canBeAddedToList = true
  }
  return canBeAddedToList
}


function addProduct(arrayUserInp, userInp) {
  if (canBeAddedToList(arrayUserInp, userInp) === true) {
    arrayUserInp.push(userInp)
  }
  return arrayUserInp
}


async function actualizeProducts(arrayUserInp) {
  //dataProducts = recoverDataProducts()
  selectedProductsSection.innerHTML = ""
  //await new Promise(resolve => setTimeout(resolve, 200));
  noZeroQuantity = true

  for (i = 0; i < arrayUserInp.length; i++) {

    let i2 = 0
    let found = false
    while (i2 < dataProducts.length && found === false) {
      if (dataProducts[i2].name == arrayUserInp[i]) {
        found = true
        if (dataProducts[i2].quantity == 0) {
          noZeroQuantity = false
          console.log("hello inside ")

        }

        selectedProductsSection.innerHTML += '<div class = "oneSelectedProduct"><button class="btn-remove" onclick="btnClickedRemove(this)"></button><a href = "' + dataProducts[i2].presentation + '"><img src="https://drive.google.com/uc?export=view&id=' + dataProducts[i2].strpic + ' " width="200px" ></a><h5>' + dataProducts[i2].name + '</h5><p>Emplacement : ' + dataProducts[i2].location + '</br> Quantité : ' + dataProducts[i2].quantity + '</p> </div>'
      }
      i2++
    }
  }

}
//check tutorials about arrows functions
btnAddProduct.addEventListener('click', e => {
  let userInp = document.getElementById("chemistryDropdown").value
  arrayUserInp = addProduct(arrayUserInp, userInp)
  //document.getElementById("input").name =""
  actualizeProducts(arrayUserInp)
  actualizeTP(arrayUserInp)
  actualizeCoolStuff(arrayUserInp)
})


//btnRemoveProduct.addEventListener('click',e =>{
//var buttonClicked = event.target
//buttonClicked.parentElement.remove()
//})


function btnClickedRemove(get) {
  var buttonClicked = event.target
  var str = buttonClicked.parentElement.innerHTML
  var mySubString = str.substring(
    str.indexOf("<h5>") + 4,
    str.lastIndexOf("</h5>")
  );
  arrayUserInp = arrayUserInp.filter(e => e != mySubString);
  actualizeProducts(arrayUserInp)
  actualizeTP(arrayUserInp)
  actualizeCoolStuff(arrayUserInp)
  //buttonClicked.parentElement.remove()

}


function makeDropdown(tableau, menu) {
  let option;
  for (let i = 0; i < tableau.length; i++) {
    option = document.createElement('option');
    option.value = tableau[i].name;
    option.text = tableau[i].name;
    menu.appendChild(option);
  }
}


