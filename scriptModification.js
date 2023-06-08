var formData = $("form.formTP").serializeObject();
console.log(formData);

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
    