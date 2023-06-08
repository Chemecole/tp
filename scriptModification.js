const url ="https://chemecole.github.io/tp/chemistry.json"

var formData = $("form.formTP").serializeObject();
console.log(formData);


let dataCool
let dataProducts = []
let dataTP = []

window.onload = async function() {
  
    //tp = recoverDataTP()
    //dataProducts = recoverDataProducts()
    //dataCool = recoverDataCoolStuff()
    await new Promise(resolve => setTimeout(resolve, 1000));
    makeDropdown();
    };
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Accédez à la catégorie "products"
        const products = data.products;
        console.log("Category: products");
        products.forEach(product => {
          const productId = product.id;
          const productName = product.name;
          const productStrpic = product.strpic;
          const productLocation = product.location;
          const productQuantity = product.quantity;
          prod = new Product(productId, productName, productStrpic, productLocation, productQuantity)
          dataProducts.push(prod)
        
        });
    
        // Accédez à la catégorie "tp"
        
        const tp = data.tp;
        console.log("Category: tp");
        tp.forEach(tpItem => {
          const tpId = tpItem.id;
          const tpName = tpItem.name;
          const tpChemP = tpItem.chemP;
          const tpInstructions = tpItem.instructions;
          const tpSubject = tpItem.subject;
          const tpLevel = tpItem.level;
          const tpSource = tpItem.source;
          const tpTheme = tpItem.theme;
    
          experiment = new Experiment(tpId,tpName,tpChemP,tpInstructions,tpSubject,tpLevel,tpSource,tpTheme)
          dataTP.push(experiment)
      
        });
    
        // Accédez à la catégorie "cool"
        const cool = data.cool;
        console.log("Category: cool");
        cool.forEach(coolItem => {
          const coolId = coolItem.id;
          const coolName = coolItem.name;
          const coolImageOrVideo = coolItem.imageOrVideo;
          
          
        });
      })
      .catch(error => {
        // Gérez les erreurs ici
        console.error(error);
      });


      console.log("yp")