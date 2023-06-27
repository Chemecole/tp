window.dataTP
window.dataProducts
dataTP = []
dataProducts = []

//const url ="https://chemecole.github.io/tp/chemistry.json"
const urlProduct = "https://chemecole.onrender.com/products"
const urlTP = "https://chemecole.onrender.com/tp"

//this page is only to put in arrays the data from json
//keep your makeDropdown on others scripts!!!!
//hmm i wish i explained the reason for the line above when i wrote it...
//now i forgot why it's important to put makeDropdown on others scripts.

class Product {
    constructor(id, name, strpic, location, quantity, presentation)
   {
      this.id = id;
      this.name = name;
      this.strpic = strpic;
      this.location = location;
      this.quantity = quantity;
      this.presentation = presentation;
    }
  
  }
  
  class Experiment{
    constructor(id, name, chemP, subject, level,theme,tpEleve,tpLabo,tpReponse){
      this.id =id;
      this.name = name;
      this.chemP = chemP;
      this.subject = subject;
      this.level = level;
      this.theme = theme;
      this.tpEleve= tpEleve;
      this.tpLabo = tpLabo;
      this.tpReponse = tpReponse;
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

async function  loadFetch(){
let promiseP = fetch(urlProduct)
promiseP.then(response => response.json())
  .then(json => {
    console.log(json);
    const products = json;
        products.forEach(product => {
          const productId = product.id;
          const productName = product.name;
          const productStrpic = product.strpic;
          const productLocation = product.location;
          const productQuantity = product.quantity;
          const productPresentation = product.presentation;

          prod = new Product(productId, productName, productStrpic, productLocation, productQuantity,productPresentation)
          dataProducts.push(prod)
     
        });
  }
  )
  promiseP.catch((err) => console.log(err));

//possiblement rajouter un await et un throw error devant le fetch?
//bon si jamais y'a un bug, là ça marche sans
  let promiseT = fetch(urlTP)
  promiseT.then(response => response.json())
  .then(json => {
    console.log("hello");
    const tp = json;
    tp.forEach(tpItem => {
      tpId = tpItem.id;
      tpName = tpItem.name;
      tpChemP = tpItem.chemP;
      //const tpInstructions = tpItem.instructions;
      tpSubject = tpItem.subject;
      tpLevel = tpItem.level;
      //const tpSource = tpItem.source;
      tpTheme = tpItem.theme;
      tpEleve= tpItem.tpEleve;
      tpLabo = tpItem.tpLabo;
      tpReponse = tpItem.tpReponse;
      experiment = new Experiment(tpId,tpName,tpChemP,tpSubject,tpLevel,tpTheme,tpEleve,tpLabo,tpReponse)
      dataTP.push(experiment)
     
        });
  }
  )
  promiseT.catch((err) => console.log(err));


}