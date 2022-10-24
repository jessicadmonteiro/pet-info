import { getLocalStorage } from "./localStorage.js"

const baseUrl = "http://localhost:3333/"

async function cadastro (body) {
    
    try {
        
        const request = await fetch(baseUrl + "users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        console.log(request.ok)

        if(request.ok == true){
            const response = await request.json()

            const toast = document.querySelector(".container_toast")
            toast.style.display = "flex"

        }

    } catch (err) {

        console.log(err)

    }
}


async function login (body) {
    try {
        
        const request = await fetch(baseUrl + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        console.log(request)

        const response = await request.json()

        localStorage.setItem("usuario", JSON.stringify(response))

        if(response.message === "A senha está incorreta" ){
            const senhaIncorrea = document.querySelector(".senha_incorreta")
            senhaIncorrea.style.display = "flex"
        }else {
            const senhaIncorrea = document.querySelector(".senha_incorreta")
            senhaIncorrea.style.display = "none"

            window.location.replace("/pages/feed/index.html")
        }

        console.log(response)

    } catch (err) {

        console.log(err)

    } 

}

async function getPerfil() {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch (baseUrl + "users/profile", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }
}

async function posts () {
    const tokenAcesso = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjU3MTEwMDcsImV4cCI6MTY5NzI0NzAwNywic3ViIjoiMTkwZjVjYWQtYTdiNS00Zjc4LWFiM2YtMzBkMmQ5NDdiMTRiIn0.pVpRmJ0BENyiq0Dli6_me0nVH_v9qoA9ZF2DgEGSAnM"

    try {
        const request = await fetch (baseUrl + "posts", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenAcesso}`
            }
        })

        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }
}

async function criarNovoPost(body) {

    const localStorage = getLocalStorage()
    console.log(localStorage)

    try {
        const request = await fetch (baseUrl + "posts/create", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })

        console.log(request)
        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }
}


async function atualizarPost(body, idUsuario) {

    const localStorage = getLocalStorage()
    console.log(localStorage)

    try {
        const request = await fetch (baseUrl + "posts/" + idUsuario, { 
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })

        console.log(request)
        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }
}

async function excluirPost(id) {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch (baseUrl + "posts/" + id, { 
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
        })

        console.log(request)
        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }
}

export {
    cadastro,
    login,
    getPerfil,
    posts,
    criarNovoPost,
    atualizarPost, 
    excluirPost
}