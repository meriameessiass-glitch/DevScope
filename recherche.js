import { getdatauser } from "./api.js";
import { ChercheLocalStorage } from "./catch.js";

const search = document.querySelector('#github-rech')
const analyser = document.querySelector('.analyser')
const message = document.querySelector('.message')
const erreur=document.querySelector('.erreur')

function verifierLogin(login) {
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    return regex.test(login);
}

analyser.addEventListener('click',async ()=> {
    erreur.hidden=true
    let login = search.value
    localStorage.setItem('user',JSON.stringify(login))
    if (!verifierLogin(login) || login === '') {
        message.hidden=false
    } else {
        message.hidden = true
         const data=await ChercheLocalStorage(login,getdatauser(login))
        if (!data) {
             erreur.hidden = false
        }else{
            erreur.hidden=true
        window.location.href='profil.html'
        }
    }
})
