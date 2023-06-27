//pour sauvegarder les données JSON

async function getDataToSaveProd(){
    const response = await fetch(urlProduct)
    const data = await response.json();
    const download = JSON.stringify(data, null, 2);

    var a = document.createElement("a")
a.href = URL.createObjectURL(
    new Blob([download], {type:"application/txt"})
)
d= new Date()
a.download = "dataProduits_" + d.getFullYear()+ "_"+ d.getMonth() + "_" + d.getDate() + ".txt"
a.click()

}

async function getDataToSaveTP(){
    const response = await fetch(urlTP)
    const data = await response.json();
    const download = JSON.stringify(data, null, 2);

    var a = document.createElement("a")
a.href = URL.createObjectURL(
    new Blob([download], {type:"application/txt"})
)
d= new Date()
a.download = "dataTP_" + d.getFullYear()+ "_"+ d.getMonth() + "_" + d.getDate() + ".txt"
a.click()

}




function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

//save button  onclick, call getDataToSave()

