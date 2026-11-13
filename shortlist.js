export async function getCondidatsData(){
   try{ const reponse=await fetch('https://6af5a2d2f6270fa08d685b3e.mockapi.io/Devscop/conditats')
    if(!reponse.ok){
        console.log(`Reponse status:${reponse.status}`)
    }else{
        const canditats=await reponse.json()
        return canditats
    }
  }catch(er){
        console.error("Erreur :", er)
        return null
  }
}
const STATUS_CLASSES = {
  contact: "text-amber-400 border-amber-400 bg-amber-400/10",
  refuse: "text-red-400 border-red-400 bg-red-400/10",
}
const canditats=await getCondidatsData()
localStorage.setItem('canditats',JSON.stringify(canditats))
console.log(canditats)
const container=document.querySelector('.list-cand')
function afficherCandidas(canditats){
    canditats.forEach(c => {
    const condidat=document.createElement('div')
    condidat.className ="flex flex-wrap items-center gap-4 px-6 py-5 bg-[#111a2e] border border-[#1e2a44] rounded-xl"
    const avatar = document.createElement("img")
    avatar.className ="grid place-items-center w-[62px] h-[62px] shrink-0 border border-teal-400 rounded-lg text-teal-400 font-bold text-lg"
    avatar.src=c.avatar_url
    const info = document.createElement("div")
    info.className = "flex-1 min-w-0";
    const nom = document.createElement("h3")
    nom.className = "mb-1.5 text-lg font-semibold text-slate-100"
    nom.textContent = c.nom
    const meta = document.createElement("p")
    meta.className = "text-sm text-slate-400 font-mono"
    meta.textContent = `@${c.login} · ajouté le ${c.date}`
    const statut = document.createElement("span")
    statut.className = `inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CLASSES[c.status]}`
    statut.textContent = c.status
    info.append(nom, meta, statut)
    const actions = document.createElement("div")
    actions.className = "flex flex-wrap gap-2.5 max-md:w-full"
    const btnVoir = document.createElement("button")
    btnVoir.className ="px-4 py-2.5 rounded-lg border border-teal-400 text-teal-400 text-sm font-semibold hover:bg-teal-400/10 transition-colors"
    btnVoir.textContent = "Voir le profil"
    const btnModifier = document.createElement("button")
    btnModifier.className ="px-4 py-2.5 rounded-lg border border-slate-400 text-slate-100 text-sm font-semibold hover:bg-slate-400/15 transition-colors"
    btnModifier.textContent = "Modifier status"
    btnModifier.addEventListener('click',()=>{
      
    })
    const btnSupprimer = document.createElement("button")
    btnSupprimer.className ="px-4 py-2.5 rounded-lg border border-red-400 text-red-400 text-sm font-semibold hover:bg-red-400/10 transition-colors"
    btnSupprimer.textContent = "Supprimer"
    actions.append(btnVoir, btnModifier, btnSupprimer)
    btnVoir.addEventListener("click", () => {
      window.location.href = `profile.html`
    })
    btnModifier.addEventListener("click", () => {
    })
    condidat.append(avatar, info, actions)
    container.append(condidat)
    })
  }
afficherCandidas(canditats)
