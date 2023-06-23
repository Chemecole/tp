//pour sauvegarder les données JSON
const apiUrl = 'https://chemecole.onrender.com/tp';


async function getDataToSave(){
    const response = await fetch(apiUrl)
    const data = await response.json();

}

//save button  onclick, call getDataToSave()

