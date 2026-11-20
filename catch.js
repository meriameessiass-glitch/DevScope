
const dur=10*60*1000
function stock(key, data) {
  localStorage.setItem(key, JSON.stringify({ data: data, savedAt: Date.now() }));
}
function sup(key){
    
}
export function TempVerifier(){

}
export async function ChercheLocalStorage(login,fetch){
    const object=JSON.parse(localStorage.getItem(`${login}`))
    if(!object || Date.now()-object.savedAt > dur){
        localStorage.removeItem(`${login}`)
        const response=await fetch
        stock(response)
        const data=JSON.parse(localStorage.getItem(`${login}`))
        console.log('api')
        return data
    }else{
        console.log('local')
        return object
    }
}

export function getDataLocalstorage(login){
    const data=JSON.parse(localStorage.getItem(`${login}`))
    console.log(data)
    return data
}