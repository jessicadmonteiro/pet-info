import { getLocalStorage } from "./localStorage.js"

const baseUrl = "http://localhost:3333/"

async function cadastro (body, botao) {
    
    try {
        
        const request = await fetch(baseUrl + "users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(request.ok == true){
            const response = await request.json()

            const toast = document.querySelector(".container_toast")
            toast.style.display = "flex"

            botao.innerText = "Cadastrar"

        }else {
            botao.innerText = "Cadastrar"
        }

    } catch (err) {

        botao.innerText = "Cadastrar"
    }
}



async function login (body, botao) {
    try {
        
        const request = await fetch(baseUrl + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        
        const response = await request.json()

        localStorage.setItem("usuario", JSON.stringify(response))


        if(response.message === "A senha está incorreta" || response.message === "Internal server Error" || response.message === "O email está incorreto" ){

            const senhaIncorrea = document.querySelector(".senha_incorreta")
            senhaIncorrea.style.display = "flex"

            botao.innerText = "Acessar"

        }else {
            const senhaIncorrea = document.querySelector(".senha_incorreta")
            senhaIncorrea.style.display = "none"

            window.location.replace("/pages/feed/index.html")
        }

        

    } catch (err) {

        botao.innerText = "Acessar"

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

    try {
        const request = await fetch (baseUrl + "posts/create", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }
}

async function criarPerfilUsuario() {
    const localStorage = getLocalStorage()
    
    try {
        const request = await fetch (baseUrl + "users/profile",{
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
        })

        const response = await request.json()
        return response
    }catch(err) {
        console.log(err)
    }

}

async function atualizarPost(body, idUsuario) {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch (baseUrl + "posts/" + idUsuario, { 
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })

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
    excluirPost,
    criarPerfilUsuario
}