
const manipulateurForm=new ManipulateurForm();

let addbutton=document.querySelector("#save");
let tbody=document.querySelector("tbody"); 

afficherTable();

/**
  * enregistrement des valeurs
  */
 
 addbutton.addEventListener('click',(e) => {
     if(manipulateurForm.formulaireEstValide()) {
            axios.post('http://167.71.45.243:4000/api/employes?api_key=urrzckb',{
                nom:manipulateurForm.getNom(),
                prenom:manipulateurForm.getPrenom(),
                email:manipulateurForm.getEmail(),
                poste:manipulateurForm.getPoste(),
                numeroTelephone:manipulateurForm.getPhone(),
                etatMarital: manipulateurForm.getStatus(),
                pays:manipulateurForm.getPays()
            })
            .then((response)=>{
                    afficherTable();
                    console.log(response);
            }).catch((err)=>{
                console.log(err.response.data)
            });

        manipulateurForm.initializeInput();
    }
   },false);

/**
 * 
 * @param {*}employers
 * @returns {void}
 */
 function afficherTable(){
     ClearTable();
    document.querySelector('.table-overlay').style.visibility = 'visible';

    axios.get('http://167.71.45.243:4000/api/employes?api_key=urrzckb')
    .then((employers)=>{
        for(let employer of employers.data){

            let tr= document.createElement("tr");
            tr.setAttribute("id",employer._id);   
            let tdNom=document.createElement("td");
            tdNom.textContent=employer.nom;
            let tdPrenom=document.createElement("td");
            tdPrenom.textContent=employer.prenom;
            let tdStatus=document.createElement("td");
            tdStatus.textContent=employer.etatMarital;
            let tdPays=document.createElement("td");
            tdPays.textContent=employer.pays;
            let tdEmail=document.createElement("td");
            tdEmail.textContent=employer.email;
            let tdPoste=document.createElement("td");
            tdPoste.textContent=employer.poste;
            let tdTelephone=document.createElement("td");
            tdTelephone.textContent=employer.numeroTelephone;  
        
            let buttonmodifier=document.createElement("button");
            buttonmodifier.setAttribute("type","button");
            buttonmodifier.setAttribute("class","btn btn-primary");
            buttonmodifier.setAttribute("data-target",employer._id);
            buttonmodifier.addEventListener('click',onUpdate);
            buttonmodifier.textContent="modifier";
            let tdModifier=document.createElement("td");
            tdModifier.appendChild(buttonmodifier);
            
            let buttondelete=document.createElement("button");
            buttondelete.setAttribute("type","button");
            buttondelete.setAttribute("class","btn btn-danger");
            buttondelete.setAttribute("data-target",employer._id);
            buttondelete.setAttribute("id",employer._id);
            buttondelete.textContent="supprimer";
            buttondelete.addEventListener('click',(e)=>{    
            const message=confirm("etes-vous sure de vouloir supprimer");
                if(message){
            axios.delete(`http://167.71.45.243:4000/api/employes/${employer._id}?api_key=urrzckb`)
                    .then(function(reponse){
                        afficherTable();
                    }).catch(function(erreur){
                        console.log(erreur.response)
                    })
                }else{
                    return;
                }
            })
            let tdDelete=document.createElement("td");
            tdDelete.appendChild(buttondelete);
            tr.appendChild(tdNom);
            tr.appendChild(tdPrenom);
            tr.appendChild(tdStatus);
            tr.appendChild(tdPays);
            tr.appendChild(tdEmail);
            tr.appendChild(tdPoste);
            tr.appendChild(tdTelephone); 
            tr.appendChild(tdModifier);
            tr.appendChild(tdDelete);
            tbody.appendChild(tr);
        }
        document.querySelector('.table-overlay').style.visibility = 'hidden';
    }).catch((err)=>{
        document.querySelector('.table-overlay').style.visibility = 'hidden';
        console.log(err);
    })
}
 /**
  * 
  *  @returns {void}
  */
 function ClearTable(){
    tbody.textContent="";
    let errornom= document.querySelector("#errornom");
    errornom.textContent="";
    let errorprenom= document.querySelector("#errorprenom");
    errorprenom.textContent="";
    let erroremail= document.querySelector("#erroremail");
    erroremail.textContent="";
    let errorphone= document.querySelector("#errorphone");
    errorphone.textContent="";
    let buttonUpdate=document.querySelector("#update");
    buttonUpdate.style.visibility="hidden";
    manipulateurForm.id.style.display="none";
 }


 /**
  * 
  * 
  *  @param {e}
  */
  function onUpdate(e){ 
      /**
       * Axios fonctionne en asynchrone c'est-à-dire les données qui viendrons de l'API ne seront pas directement
       * disponible au chargement de la page, les données vont arriver avec un petit rétard (dépendamment du réseau)
       * Alors pour ne pas ennuyer l'utilisateur on afficher un message de chargement en attendant que les données
       * arrivent
       */
      manipulateurForm.showOverlay();


      let ids=e.target.dataset.target;

      axios.get(`http://167.71.45.243:4000/api/employes/${ids}?api_key=urrzckb`)
        .then(function(response){

            let buttonsave=document.querySelector("#save");
            buttonsave.style.visibility="hidden";
            let buttonupdate=document.querySelector("#update");
            buttonupdate.style.visibility="visible";
            manipulateurForm.id.style.display="inherit";
            manipulateurForm.makeIdReadOnly();

            manipulateurForm.setId(response.data._id);
            manipulateurForm.setNom(response.data.nom);
            manipulateurForm.setPrenom(response.data.prenom);
            manipulateurForm.appendStatus(response.data.etatMarital);
            manipulateurForm.appendPost(response.data.poste);
            manipulateurForm.appendPays(response.data.pays);
            manipulateurForm.setPhone(response.data.numeroTelephone);
            manipulateurForm.setEmail(response.data.email);

            /**
             * Toutes les données sont bien arrivées et chargées dans le formulaire, maintenant on cache le 
             * message de chargement.
             */
            manipulateurForm.hideOverlay();
        })
        .catch(function(err){
            /**
             * En cas d'erreur on cache aussi le message de chargement.
             */
            manipulateurForm.hideOverlay();
            console.log(err.response)
        })
    ;

  }
  /**
   * 
   * update my table  
   *  
   */
  let buttonupdatedata=document.querySelector("#update");
  let buttonsave=document.querySelector("#save");
  buttonupdatedata.addEventListener('click',(e) => {
      let ids = manipulateurForm.getId();
      manipulateurForm.showOverlay();

      axios.put(`http://167.71.45.243:4000/api/employes/${ids}?api_key=urrzckb`, {
        nom:manipulateurForm.getNom(),
        prenom:manipulateurForm.getPrenom(),
        email:manipulateurForm.getEmail(),
        poste:manipulateurForm.getPoste(),
        numeroTelephone:manipulateurForm.getPhone(),
        etatMarital: manipulateurForm.getStatus(),
        pays:manipulateurForm.getPays()
      }).then(response => {
        console.log(response.data);
        afficherTable();  
        manipulateurForm.hideOverlay();
      }).catch(error => {
          console.log(error.response.message);
      });

      buttonupdatedata.style.visibility = "hidden";
      buttonsave.style.visibility = "visible";
      manipulateurForm.removeReadOnlyConstraint();
      manipulateurForm.initializeInput();
  })

/**
 * @constructor
 */
 function ManipulateurForm(){
     this.id=document.querySelector("#id");
     this.nom=document.querySelector("#nom");
     this.prenom=document.querySelector("#prenom");
     this.email=document.querySelector("#email");
     this.poste=document.querySelector("#poste");
     this.phone=document.querySelector("#phone");
     this.pays=document.querySelector("#pays");
     this.status=document.querySelector("#status");
 }

 /**
  * Vérifie si les données du formulaire sont valides.
  * 
  * @return {boolean}
  */
 ManipulateurForm.prototype.formulaireEstValide = function () {
    let flags = [
        this.nomValide(),
        this.prenomValide(),
        this.emailValide(),
        this.telephoneValide()
    ];

    return flags.every((flag) => flag === true);
 }

 /**
  * Vérifie si le nom est valide.
  * 
  * @return {boolean}
  */
 ManipulateurForm.prototype.nomValide = function () {
    let errornom = document.querySelector("#errornom");
    const flag = this.getNom().length > 0

    if(!flag) {
        errornom.textContent="Ce champs ne doit pas être vide.";
        $(this.nom).addClass('is-invalid');
        $(this.nom).removeClass('is-valid');
    } else {
        errornom.textContent=""; 
        $(this.nom).addClass('is-valid');
        $(this.nom).removeClass('is-invalid');
    }

    return flag;
 }

 /**
  * Vérifie si le prénom est valide.
  * 
  * @return {boolean}
  */
 ManipulateurForm.prototype.prenomValide = function () {
    let errorprenom= document.querySelector("#errorprenom");
    const flag = this.getPrenom().length > 0;

    if(!flag) {
        errorprenom.textContent="ce champs ne doit pas etre vide";
        $(this.prenom).addClass('is-invalid');
        $(this.prenom).removeClass('is-valid');
    } else {
        errorprenom.textContent=""; 
        $(this.prenom).addClass('is-valid');
        $(this.prenom).removeClass('is-invalid');
    }

    return flag;
 }

 /**
  * Vérifie si l'adresse courriel saisie dans le formulaire est valide.
  * 
  * @return {boolean}
  */
 ManipulateurForm.prototype.emailValide = function () {
    let erroremail = document.querySelector("#erroremail");
    const flag = /^[a-z0-9][a-z0-9_.]+@[a-z0-9_]+\.[a-z0-9]{2,6}$/.test(this.getEmail());

    // Affiche le message d'erreur sur le formulaireen cas d'échec.
    if (flag) {
        erroremail.textContent = "";
        $(this.email).addClass('is-valid');
        $(this.email).removeClass('is-invalid');
    } else {
        erroremail.textContent = "Votre adresse courriel n'est pas valide.";
        $(this.email).addClass('is-invalid');
        $(this.email).removeClass('is-valid');
    }

    return flag;
 }

 /**
  * Vérifie si le numéro de téléphone saisi est valide.
  * 
  * @return {boolean}
  */
 ManipulateurForm.prototype.telephoneValide = function() {
     let errorphone = document.querySelector('#errorphone');
     const flag = /^\+243[0-9]{9}$/.test(this.getPhone());

     // Affiche le message d'erreur sur le formulaire en cas d'échec.
     if (flag) {
        errorphone.textContent = '';
        $(this.phone).addClass('is-valid');
        $(this.phone).removeClass('is-invalid');
     } else {
        errorphone.textContent = "Numéro de téléphone est invalide. Inspirez-vous de cet exemple : +24381000898."
        $(this.phone).addClass('is-invalid');
        $(this.phone).removeClass('is-valid');
     }

     return flag;
 }

 /**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getId=function(){
    return this.id.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setId=function(value){
    this.id.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getNom=function(){
    return this.nom.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setNom=function(value){
    this.nom.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPrenom=function(){
    return this.prenom.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPrenom=function(value){
    this.prenom.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getEmail=function(){
    return this.email.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setEmail=function(value){
    this.email.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getStatus=function(){
    return this.status.value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPoste=function(){
    return this.poste.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPoste=function(value){
    this.poste.value=value;
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPhone=function(){
    return this.phone.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPhone=function(value){
    this.phone.value= value ? value : '';
}
/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.getPays=function(){
    return this.pays.value;
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setStatus=function(value){
    this.pays.value=value;
}

ManipulateurForm.prototype.appendStatus = function(status) {
    let statusSelect = document.querySelector('#status');
    let optionExists = false; // Permet d'indiquer si l'option existe déjà dans le select ou pas.

    /**
     * Vérifie si l'option existe déjà c'est-à-dire si le status est déjà
     * dans le select parmi les options pour éviter le doublon.
     */
    for (let option of statusSelect.options) {
        if (option.value == poste) {
            optionExists = true;
            break;
        }
    }

    /**
     * Si l'option n'existe pas alors on l'ajoute en d'autre terme, si le status n'est pas encore 
     * dans le select on l'ajoute dans le cas contraire on ne l'ajoute pas.
     * 
     */
    if (!optionExists) {
        let option=document.createElement('option');
        option.value= status;
        option.textContent= status;
        document.querySelector("#status").append(option); 
    }

    // Après Avoir ajouté le status dans le select on le sélectionne directement comme valeur du select
    // Si on efface cette ligne c'est le premier élement du select qui sera sélectionné comme par défaut.
    this.setStatus(status);
}
/**
 *  @param {string}value
 *  @returns {void}
 */
ManipulateurForm.prototype.setPays=function(value){
    this.pays.value=value;
}

ManipulateurForm.prototype.appendPays = function(pays) {
    let paysSelect = document.querySelector('#poste');
    let optionExists = false; // Permet d'indiquer si l'option existe déjà dans le select ou pas.

    /**
     * Vérifie si l'option existe déjà c'est-à-dire si le pays est déjà 
     * dans le select parmi les options pour éviter le doublon.
     */
    for (let option of paysSelect.options) {
        if (option.value == poste) {
            optionExists = true;
            break;
        }
    }

    /**
     * Si l'option n'existe pas alors on l'ajoute en d'autre terme, si le pays n'est pas encore 
     * dans le select on l'ajoute dans le cas contraire on ne l'ajoute pas.
     * 
     */
    if (!optionExists) {
        let option=document.createElement('option');
        option.value= pays;
        option.textContent= pays;
        document.querySelector("#pays").append(option); 
    }

    // Après Avoir ajouté le pays dans le select on le sélectionne directement comme valeur du select
    // Si on efface cette ligne c'est le premier élement du select qui sera sélectionné comme par défaut.
    this.setPays(pays);
}

/**
  *  @param {void}
  *  @returns {string}
  */
 ManipulateurForm.prototype.appendPost=function(poste){
    let posteSelect = document.querySelector('#poste');
    let optionExists = false; // Permet d'indiquer si l'option existe déjà dans le select ou pas.

    /**
     * Vérifie si l'option existe déjà c'est-à-dire si le poste est déjà 
     * dans le select parmi les options pour éviter le doublon.
     */
    for (let option of posteSelect.options) {
        if (option.value == poste) {
            optionExists = true;
            break;
        }
    }

    /**
     * Si l'option n'existe pas alors on l'ajoute en d'autre terme, si le poste n'est pas encore 
     * dans le select on l'ajoute dans le cas contraire on ne l'ajoute pas.
     * 
     */
    if (!optionExists) {
        let option=document.createElement('option');
        option.value=poste;
        option.textContent=poste;
        document.querySelector("#poste").append(option); 
    }

    // Après Avoir ajouté le poste dans le select on le sélectionne directement comme valeur du select
    // Si on efface cette ligne c'est le premier élement du select qui sera sélectionné comme par défaut.
    this.setPoste(poste);
}

/**
 *  @param {void}
 *  @returns {}
 */
ManipulateurForm.prototype.initializeInput=function(){
    this.setId('');
    this.setNom('');
    this.setPrenom('');
    this.setEmail('');
    this.setPhone('');

    $('.form-control').removeClass('is-valid');
}
/**
 * @param {void}
 * @return {}
 */
ManipulateurForm.prototype.makeIdReadOnly = function() {
    this.id.setAttribute('readOnly', 'true');
}
/**
 *  @param {void}
 *  @return {}
 */

ManipulateurForm.prototype.removeReadOnlyConstraint = function() {
    this.id.removeAttribute('readOnly');
}

/**
 * Affiche le div de chargement
 * 
 * @return {void}
 */
ManipulateurForm.prototype.showOverlay = function() {
    document.querySelector('div.overlay').style.visibility = 'visible';
}

/**
 * Cache le div de chargement
 * 
 * @return {void}
 */
ManipulateurForm.prototype.hideOverlay = function() {
    document.querySelector('div.overlay').style.visibility = 'hidden';
}