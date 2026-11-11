const userlogin = document.querySelector('.userlogin')
const image = document.querySelector('.image')
const nom = document.querySelector('.nom')
const bio = document.querySelector('.bio')
const inscrit = document.querySelector('.inscrit')
const numDepots = document.querySelector('.num-depos')
const numAbonnes = document.querySelector('.num-abonnes')
const numAbonnements = document.querySelector('.num-abonnements')
const lienGithub = document.querySelector('#go-github')
const champUser = document.querySelector('#s')

function afficher(data) {
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
    champUser.value = data.login
}
const data=JSON.parse(localStorage.getItem('data'))
afficher(data)