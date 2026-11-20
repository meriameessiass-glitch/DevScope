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
async function setStatus(cand,id){
  try{
  const reponse= await fetch(`https://6af5a2d2f6270fa08d685b3e.mockapi.io/Devscop/conditats/${id}`,{
    method:"PUT",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(cand)
  })
  console.log("Status HTTP :", reponse.status)
  if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
}
  catch(er){
    console.error("Erreur:",er)
  }
}
let id
let cand
const STATUS_CLASSES = {
  "à contacter": "text-amber-500 border-amber-500 bg-amber-500/10",
  "refusé": "text-red-400 border-red-400 bg-red-400/10",
  "Entretien": "text-yellow-400 border-yellow-400 bg-yellow-400/10",
  "Retenu": "text-green-400 border-green-400 bg-green-400/10",
}
const modul=document.querySelector('#modal-statut')
const Modifier=document.querySelector('#modifier')
const canditats=await getCondidatsData()
console.log(canditats)
const container=document.querySelector('.list-cand')
function afficherCandidas(canditats){
    canditats.forEach((c) => {
    const condidat=document.createElement('div')
    condidat.className ="flex flex-wrap items-center gap-4 px-6 py-5 bg-[#111a2e] border border-[#1e2a44] rounded-xl"
    const avatar = document.createElement("img")
    avatar.className ="grid place-items-center w-[62px] h-[62px] shrink-0 border border-teal-400 rounded-lg text-teal-400 font-bold text-lg"
    avatar.src=c.avatar_url
    const info = document.createElement("div")
    info.className = "flex-1 min-w-[220px]";
    const nom = document.createElement("h3")
    nom.className = "mb-1.5 text-lg font-semibold text-slate-100"
    nom.textContent = c.nom
    const meta = document.createElement("p")
    meta.className = "text-sm text-slate-400 font-mono"
    meta.textContent = `@${c.login} · ajouté le`+  new  Date(c.createdAt).toLocaleDateString('fr-FR')
    const stat = document.createElement("span")
    stat.className = `inline-block cursor-pointer mt-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CLASSES[c.status]}`
    stat.textContent = c.status
    const rating = document.createElement("div")
    rating.className = "mt-2 text-sm tracking-widest text-lime-400"
    const n = c.rating || 0
    rating.textContent = "★".repeat(n) + "☆".repeat(5 - n)
    const commentaire = document.createElement("p")
    commentaire.className = "mt-1.5 text-sm italic text-cyan-400 break-words"
    commentaire.textContent = c.note || "Aucune note."  
    info.append(nom, meta, stat,rating,commentaire)
    const actions = document.createElement("div")
    actions.className = "flex flex-wrap gap-2.5 w-full"
    const btnVoir = document.createElement("button")
    btnVoir.className ="status px-4 py-2.5 rounded-lg border border-teal-400 text-teal-400 text-sm font-semibold hover:bg-teal-400/10 transition-colors"
    btnVoir.textContent = "Voir le profil"
    const btnModifier = document.createElement("button")
    btnModifier.className ="px-4 py-2.5 rounded-lg border border-slate-400 text-slate-100 text-sm font-semibold hover:bg-slate-400/15 transition-colors"
    btnModifier.textContent = "Modifier"
    btnModifier.addEventListener('click',()=>{
        modul.hidden=false
      id=c.id
      cand={
        login:c.login,
        nom:c.nom,
        avatar_url:c.avatar_url,
        status:c.status,
        createdAT:c.createdAT,
        createdAt:c.createdAt,
        id:c.id,
        html_url:c.html_url,
        rating:c.rating,
        note:c.note

      }
     
    })
    const btnSupprimer = document.createElement("button")
    btnSupprimer.addEventListener('click',async()=>{
      const confirmation=document.querySelector('.sup')
      confirmation.hidden=false
      confirmation.addEventListener('click',async(event)=>{
        const bouton = event.target.closest('button')
        if(!bouton) return
        if(bouton.classList.contains('no')){
          confirmation.hidden=true
        }else if(bouton.classList.contains('ok')){
                await remCand(c.id)
                condidat.remove()
                confirmation.hidden=true
        }
      })
    })
    btnSupprimer.className ="px-4 py-2.5 rounded-lg border border-red-400 text-red-400 text-sm font-semibold hover:bg-red-400/10 transition-colors"
    btnSupprimer.textContent = "Supprimer"
    actions.append(btnVoir, btnModifier, btnSupprimer)
    btnVoir.addEventListener("click", () => {
      window.location.href = `profile.html`
    })
    condidat.append(avatar, info, actions)
    container.append(condidat)
    })
  }
afficherCandidas(canditats)


 Modifier.addEventListener('submit',async(event)=>{
      event.preventDefault()
      const d = new FormData(Modifier)
      const statut=d.get('statut')
      const rating=d.get('rating')
      const comment=d.get('commentaire')
      cand.status=statut
      cand.rating=rating
      cand.note=comment
      console.log(cand)
      await setStatus(cand,id)
      modul.hidden=true
      Modifier.reset()
      container.innerHTML=""
      const canditats=await getCondidatsData()
      afficherCandidas(canditats)
    })   

async function remCand(idsup){
  try{
    const reponse= await fetch(`https://6af5a2d2f6270fa08d685b3e.mockapi.io/Devscop/conditats/${idsup}`,{
      method:"DELETE",
     
    })
    if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        console.log("Candidat supprimé avec succès")
        return true
  }
  catch (erreur) {
        console.error("Erreur :", erreur);
        return false;
    }
}
