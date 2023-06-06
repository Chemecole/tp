let dropdown = document.getElementById('chemistryDropdown');
let selectedProductsSection = document.getElementById("selectedProducts");
let availableTP = document.getElementById("availableTP")
let availableCoolStuff = document.getElementById("availableCoolStuff")
let defaultOption = document.createElement('option');
let arrayUserInp = [];
let btnAddProduct = document.getElementById('btnAddProduct')

dropdown.selectedIndex = 0;

const url ="https://chemecole.github.io/tp/chemistry.json/products"
const urlTP ="https://chemecole.github.io/tp/chemistry.json/tp"
//const urlCool = "http://localhost:3000/cool"



class Product {
  constructor(id, name, strpic, location, quantity)
 {
    this.id = id;
    this.name = name;
    this.strpic = strpic;
    this.location = location;
    this.quantity = quantity;
  }

}

class Experiment{
  constructor(id, name,chemP){
    this.id =id;
    this.name = name;
    this.chemP = chemP;
  }
}

class CoolStuff{
  constructor(id, name, imageOrVideo, chemP, subject, level, source, theme ){
    this.id =id;
    this.name = name;
    this.imageOrVideo = imageOrVideo;
    this.chemP = chemP;
    this.subject = subject;
    this.level = level;
    this.source = source;
    this.theme = theme;
  }

}

let tp
let data
let dataCool

window.onload = async function() {
  
tp = recoverDataTP()
data = recoverDataProducts()
dataCool = recoverDataCoolStuff()
await new Promise(resolve => setTimeout(resolve, 3000));
};


//this is to create the dropdown list:
fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        let option;     
      for (let i = 0; i < data.length; i++) {
        
        option = document.createElement('option');
        option.text = data[i].name;
        dropdown.appendChild(option);
          
      }    
      });  
    }
  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  function isValable(arrayUserInp,userInp){
    let dejaSelected = false
    let containedInData = false
    for(i=0; i < arrayUserInp.length; i++){
      if(arrayUserInp[i]===userInp){
        alert('ce produit chimique est déjà selectionné')
        dejaSelected = true
      }
    }
    for(i=0; i< data.length;i++){
        if(data[i].name === userInp){
            containedInData = true
        }
        
    }

    if(containedInData === false){

      alert("désolé ce produit n'est pas présent dans la liste de produits disponibles. Peut-être c'est présent sous un autre nom !")
    }
    let isValable = false
    if(dejaSelected === false && containedInData === true){
        isValable = true
    }
    return isValable
  }


  //this function allows to not have to use everywhere this damn fetch function
  function recoverDataProducts (){

    let dataProducts = []
    fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        
        for(i=0; i<data.length; i++){
          let Prod = new Product(data[i].id, data[i].name,data[i].strpic, data[i].location, data[i].quantity);
          dataProducts.push(Prod);
        }
 });  
    }
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  return dataProducts;
  }


  function recoverDataTP(){

    let dataTP = []
    fetch(urlTP)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        
        for(i=0; i<data.length; i++){
          let exp = new Experiment(data[i].id, data[i].name,data[i].chemP);
          dataTP.push(exp);
        }
 });  
    }
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  return dataTP;

  }

  function recoverDataCoolStuff (){

    let dataCool = []
    fetch(urlCool)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        
        for(i=0; i<data.length; i++){
          let fun = new CoolStuff(data[i].id, data[i].name,data[i].imageOrVideo, data[i].chemP,data[i].subject,data[i].level, data[i].source, data[i].theme);
          dataCool.push(fun);
        }
 });  
    }
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  return dataCool;
  }



  

 


  //once the first product has been chosen, it would be more efficient to make it can only
  //get reduced (because the more you add ingredients, the less choice of TPs)
  //but because of the "remove" button, i think it 
  //will be easier to forget about efficiency

  function actualizeTP(selectedProducts){
    availableTP.innerHTML = ""

    //the reason we have to wait  is that fetch is an async function, so the code continues without
    //the fetching being finished
    //maybe that would be an argument in favor of doing everything inside
    // the fetch function?
    //Look up : fetch 
    if(selectedProducts.length>0){
    for(countTP =0; countTP < tp.length; countTP++){
      //so tp[countTP] is one of the experiment of the tp database

      let allProductsAreIn = true // for each TP we check that
      for(countProducts = 0; countProducts < selectedProducts.length; countProducts++){
        //so selectedProducts[countProducts] is one of the products inputed by user


        let productIsIn =false
        let iInExperiment = 0

        //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
        while(productIsIn === false && iInExperiment < tp[countTP].chemP.length){
          if(tp[countTP].chemP[iInExperiment] === selectedProducts[countProducts]){
            productIsIn = true
          }
  

          iInExperiment += 1
        }

        if(productIsIn ===false){
          allProductsAreIn = false
        }

      }

      //here we do the if allProductsAreIn is true stuff
      if(allProductsAreIn){
        availableTP.innerHTML += '<h3>' + tp[countTP].name +'</h3> <p> ingredients : ' + tp[countTP].chemP + '</p>'
      }
    }
  }
}



function actualizeCoolStuff(selectedProducts){
   availableCoolStuff.innerHTML = ""

  //the reason we have to wait  is that fetch is an async function, so the code continues without
  //the fetching being finished
  //maybe that would be an argument in favor of doing everything inside
  // the fetch function?
  //Look up : fetch 
  if(selectedProducts.length>0){
    //should be COUNTCOOL BROO BUT to lazy to change the countTP (it's basically an i ++ thing right)
  for(countTP =0; countTP < dataCool.length; countTP++){
    //so tp[countTP] is one of the experiment of the tp database
//or here rather dataCool[countTP] is one of the fun fact of the cool stuff database
    let allProductsAreIn = true // for each TP we check that
    for(countProducts = 0; countProducts < selectedProducts.length; countProducts++){
      //so selectedProducts[countProducts] is one of the products inputed by user


      let productIsIn =false
      let iInExperiment = 0
      //so tp[countTP].chemP[iInExperiment] is one of the ingredient required for this specific tp
      while(productIsIn === false && iInExperiment < dataCool[countTP].chemP.length){
        if(dataCool[countTP].chemP[iInExperiment] === selectedProducts[countProducts]){
          productIsIn = true
        }


        iInExperiment += 1
      }

      if(productIsIn ===false){
        allProductsAreIn = false
      }

    }

    //here we do the if allProductsAreIn is true stuff
    if(allProductsAreIn){
      availableCoolStuff.innerHTML += '<h3>' + dataCool[countTP].name +'</h3> <p> ingredients : ' + dataCool[countTP].chemP + '</p>'
    }
  }
}
}



function addProduct(arrayUserInp, userInp){
  if(isValable(arrayUserInp, userInp)=== true){
    arrayUserInp.push(userInp)
  }
return arrayUserInp
}


async function actualizeProducts(arrayUserInp){
  //data = recoverDataProducts()
  selectedProductsSection.innerHTML=""
  //await new Promise(resolve => setTimeout(resolve, 200));

  for(i=0; i<arrayUserInp.length;i++){
    
    let i2=0
    let found= false
    while(i2 < data.length && found === false){
      if(data[i2].name == arrayUserInp[i]){
      found=true
      selectedProductsSection.innerHTML+='<div class = "oneSelectedProduct"><button class="btn-remove" onclick="btnClickedRemove(this)"></button><img src="source/images/chemicals/' + data[i2].strpic + ' " width="200px" ><h5>' + data[i2].name + '</h5><p>Emplacement : ' + data[i2].location + '</br> Quantité : '+ data[i2].quantity + '</p> </div>'
    }
    i2++
  }

  
  }

}
  //check tutorials about arrows functions
btnAddProduct.addEventListener('click',e => {
  let userInp = document.getElementById("input").value.toLowerCase()
  arrayUserInp = addProduct(arrayUserInp,userInp)
  document.getElementById("input").value =""
  actualizeTP(arrayUserInp)
  actualizeProducts(arrayUserInp)
  actualizeCoolStuff(arrayUserInp)
})


//btnRemoveProduct.addEventListener('click',e =>{
  //var buttonClicked = event.target
  //buttonClicked.parentElement.remove()
//})


function btnClickedRemove(get){
  
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

