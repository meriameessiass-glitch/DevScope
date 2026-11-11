import { getdatauser } from "./api.js";
const search = document.querySelector('#github-rech')
const analyser = document.querySelector('.analyser')
const message = document.querySelector('.message')
const erreur=document.querySelector('.erreur')



function verifierLogin(login) {
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    return regex.test(login);
}
analyser.addEventListener('click',async () => {
    let login = search.value
    if (!verifierLogin(login) || login === '') {
        message.hidden=false
    } else {
         const data = await getdatauser(login)
        if (!data) {
             erreur.hidden = false
             return
        }
        message.hidden = true
        localStorage.setItem('data',JSON.stringify(data))
        // window.location.href='profil.html'
    }
})