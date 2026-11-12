const userlogin = document.querySelector('.userlogin')
const image = document.querySelector('.image')
const nom = document.querySelector('.nom')
const bio = document.querySelector('.bio')
const inscrit = document.querySelector('.inscrit')
const numDepots = document.querySelector('.num-depos')
const numAbonnes = document.querySelector('.num-abonnes')
const numAbonnements = document.querySelector('.num-abonnements')
const lienGithub = document.querySelector('#go-github')
const main=document.querySelector('.main')
const analyser1=document.querySelector('.analyser1')
const search1=document.querySelector('#search')
const ajouter=document.querySelector('.shortlist-but')


function creerCarte(repo) {
    const carte = document.createElement('article')
    carte.className = 'carte-repos bg-[#111A2E] border border-[#1F2A44] rounded-xl p-5'
    const titre = document.createElement('a')
    titre.href = repo.html_url
    titre.target = '_blank'
    titre.rel = 'noopener'
    titre.textContent = repo.name
    titre.className = "block font-['JetBrains_Mono',monospace] font-semibold text-[#2DD4BF] no-underline hover:underline"
    const desc = document.createElement('p')
    desc.className = 'text-sm text-[#9FB0CA] mt-2 mb-4'
    desc.textContent = repo.description || 'Aucune description'
    const infos = document.createElement('div')
    infos.className = 'flex flex-wrap items-center gap-3.5 text-[13px] text-[#9FB0CA]'
    const langage = document.createElement('span')
    langage.className = "lang-pros font-['JetBrains_Mono',monospace] text-xs text-[#C4B5FD]"
    langage.textContent = '● ' + (repo.language || 'N/A')
    const etoiles = document.createElement('span')
    etoiles.textContent = '★ ' + repo.stargazers_count
    const forks = document.createElement('span')
    forks.textContent = 'Forks ' + repo.forks_count
    const maj = document.createElement('span')
    maj.textContent = 'MàJ ' + new Date(repo.updated_at).toLocaleDateString('fr-FR')
    infos.append(langage, etoiles, forks, maj)
    carte.append(titre, desc, infos)
    return carte
}
async function gitrepos(data) {
try{
    const reponse=await fetch(`${data.repos_url}`)
    if(!reponse.ok){
        throw new Error(`reponse status:${reponse.status}`)
    }else{
        const repos= await reponse.json()
        console.log(repos)
        return repos
    }
}
catch(error){
    console.error(error)
    return []
}}
async function afficher(data) {
    userlogin.textContent = '@' + data.login
    image.src = data.avatar_url
    image.alt = 'Avatar de ' + data.login

    nom.textContent = data.name || data.login
    bio.textContent = data.bio || 'Aucune bio renseignée.'

    inscrit.textContent = 'Inscrit le ' + new Date(data.created_at).toLocaleDateString('fr-FR')

    numDepots.textContent = data.public_repos
    numAbonnes.textContent = data.followers
    numAbonnements.textContent = data.following

    lienGithub.href = data.html_url
    search1.value = data.login
    const repos=await gitrepos(data)
    repos.forEach(rep => {
        main.append(creerCarte(rep))
    })
}
const data=JSON.parse(localStorage.getItem('data'))
afficher(data)
localStorage.setItem('username',search1.value)
console.log(search1.value)
ajouter.addEventListener('click',()=>{

})

analyser1?.addEventListener('click',()=>{
    localStorage.setItem('username',search1.value)
    window.location.href='index.html'
})
