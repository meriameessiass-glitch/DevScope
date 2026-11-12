import { getdatauser } from "./api.js";
const search = document.querySelector('#github-rech')
const analyser = document.querySelector('.analyser')
const message = document.querySelector('.message')
const erreur=document.querySelector('.erreur')

let username=localStorage.getItem('username')
console.log(username)
if(username){
    search.value=username
}

function verifierLogin(login) {
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    return regex.test(login);
}

analyser.addEventListener('click',async function chercher() {
    erreur.hidden=true
    let login = search.value
    if (!verifierLogin(login) || login === '') {
        message.hidden=false
    } else {
        message.hidden = true
         const data = await getdatauser(login)
        if (!data) {
             erreur.hidden = false
             return
        }else{
            erreur.hidden=true
        localStorage.setItem('data',JSON.stringify(data))
        window.location.href='profil.html'
        }
    }
})

