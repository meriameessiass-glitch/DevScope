export async function getdatauser(username) {
    try {
        console.log("1. Fonction appelée :", username)

        const reponse = await fetch(
            `https://api.github.com/users/${username}`
        )
        console.log("2. Réponse reçue :", reponse.status)
        console.log(await reponse.clone().json())

        if (!reponse.ok) {
            throw new Error(`Réponse statut : ${reponse.status}`)
        }

        const data = await reponse.json()

        console.log("3. Data :", data)

        return data

    } catch (err) {
        console.error("Erreur :", err)
    }
}