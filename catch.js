
const dur=10*60*1000
function stock(key, data) {
    if(!data){
        return
    }else{
  localStorage.setItem(key, JSON.stringify({ data: data, savedAt: Date.now() }));
  }
}
function sup(key){
    
}
export function TempVerifier(){

}
export async function ChercheLocalStorage(login,fetch){
    const object=JSON.parse(localStorage.getItem(`${login}`))
    if(object && Date.now()-object.savedAt < dur){
        return 'Local'
   }else if(object && Date.now()-object.savedAt > dur){
        localStorage.removeItem(`${login}`)
        const response=await fetch
         if(!response){
            return false
        }else{
            stock(login,response)
           return 'api because 10 MIN TERMINED'
        }
    }else{
        const response=await fetch
        if(!response){
            return false
        }else{
            stock(login,response)
           return 'api '
        }

    }
}

export function getDataLocalstorage(login){
    const data=JSON.parse(localStorage.getItem(`${login}`))
    console.log(data)
    return data
}