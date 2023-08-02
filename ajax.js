// Récupère le numéro de page et on continue
/*function ShowUsers(){
  const nbPage = document.getElementById ("numberPageUsers").value;
  getUsers(nbPage);
}*/

// la méthode GET pour RECCUPERER LES DONNEES

 // loader : copier code sur le site pure css loaders
const loader ='<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
  // Appel Ajax et on continue
function getUsers (numeroPage){
  document.getElementById("allUtilisateurs").innerHTML = loader;/*on met le loader avant l execution de la page */
  document.getElementById("pagination").innerHTML =''; /*pr enlever la pagination quand ca charge avec loader*/
  const xhr = new XMLHttpRequest(); /*pr declarer une requete ajax */
  const url = 'https://reqres.in/api/users?delay=1&page='+numeroPage;
  
  /*permet de recup les info */
  xhr.open('GET', url);//GET pr recup des données et POST c pr créer, PUT c pr modif et DELETE pr supp

  /*la valeur 4 correspond à l'état DONE:que c fini - 200 succès de la requête-voir cours pr les codes*/
  xhr.addEventListener('readystatechange', function() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
      /*on gère le retour de notre appel ajax */  
      console.log ("Response =" + xhr.response);
      const object = JSON.parse (xhr.response);
      setUsersInPage (object);
      
    }
      else if (xhr.status == 404){ /* 404:Adresse non trouvée */
      alert("Impossible de trouver l'URL de la requête ajax");
    }
      else{
      alert("Une erreur est survenue");
    }
};
});

/*permet d'envoyer les info */
  xhr.send();
}


//on affiche le résultat de l'appel ajax dans la page
function setUsersInPage (listUsers){
  //on ajoute la liste des utilisateurs
  let myhtml = ""; /* += v dite on ajoute */
  listUsers.data.forEach(element => {
        myhtml += '<div><img src="'+element.avatar+'"/><p>'+element.first_name+' '+element.last_name+'</p><p>'+element.email+'</p></div>'
      })
      document.getElementById("allUtilisateurs").innerHTML = myhtml; /*on affiche la reponse sur la page */
      
      //on crée la pagination
      let nbPage = listUsers.total_pages;
      let currentPage = listUsers.page;

      let htmlPagination = "";
      for (let i = 1; i <= nbPage; i++){
        if (i == currentPage){
          htmlPagination += '<button class="btn active" disabled> '+i+'</button>';
        } /*disabled descative le bouton on ne p pas cliquer*/
        else {
          htmlPagination += '<button class ="btn" onclick ="getUsers ('+i+')"> '+i+'</button>';
        }
      }
        document.getElementById("pagination").innerHTML = htmlPagination;
}
document.addEventListener("DOMContentLoaded",function(){ /* L appel de la focntion se fait une fois la page complètement chargée*/
  getUsers(1);/*on appel la fonction sur la page 1 */
})


// la méthode POST POUR POUVOIR CREER DES DONNEES /code copier ds le cours
function createUserApiFetch (){
  const headers = new Headers();
  headers.append("Content-Type","application/json");
  
  const body = JSON.stringify({
      name: 'David',
      job: 'developpeur',
  }); //JSON.stringify pour convertir en objet JSON et éviter le risque des caractères spéciaux.
  
  const init = { 
      method: 'POST',
      headers: headers,
      body: body };
  
  fetch('https://reqres.in/api/users', init)
    .then(response => {
    return response.json();
    })
    .then(response => {
    console.log(response)
    })
    .catch(error => alert("Erreur : " + error));
}
    
