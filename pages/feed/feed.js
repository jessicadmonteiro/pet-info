import { getPerfil } from "../../scripts/api.js";
import { posts } from "../../scripts/api.js";
import { editarPost, modalPublicacao, deletarPost } from "../../scripts/formulario.js";
import { abirModal } from "../../scripts/modal.js";


const detalhesUsuario = await getPerfil()

async function header() {
    
    function cabecalho(imagem) {
        return `
        <div class="conteiner_cor_fundo">
                <div class="container_cabecalho">
                    <h3 class="titulo_header">Petinfo</h3>
                    <div class="container_bt_img">
                        <button class="bt_criarPublicacao">Criar publicação</button>
                        <img class="imgUsuario" src="${imagem}" alt="">
                    </div>
                </div>
                <div class="container_titulo_feed">
                    <h4 class="titulo_feed">Feed</h4>
                </div>
            </div>  `
    }
    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <header>
            ${cabecalho(detalhesUsuario.avatar)}
        </header>
        `
    )
}
header()

const publicacao = await posts()
console.log(publicacao)

async function renderizarTodosPost() {
    
    function listaPosts (arr) {
        let containerReceberPosts = document.querySelector(".container_posts")
        containerReceberPosts.innerHTML = ""

        arr.forEach(element => {
    
           let imagem    = element.user.avatar
           let nome      = element.user.username
           let titulo    = element.title
           let conteudo  = element.content
           let date      = new Date (element.createdAt)
           let data      = date.toDateString()
           let id        = element.id
         
           let tagLi            = document.createElement("li")
           let tagDiv           = document.createElement("div")
           let tagDivContainer  = document.createElement("div")
           let tagImg           = document.createElement("img")
           let tagH3            = document.createElement("h3")
           let tagSpan          = document.createElement("span")
           let tagP             = document.createElement("p")
           let tagDivBt         = document.createElement("div")
           let tagBtEditar      = document.createElement("button")
           let tagBtExcluir     = document.createElement("button")
           let tagH2            = document.createElement("h2")
           let tagPConteudoPost = document.createElement("p")
           let tagPA            = document.createElement("p")
           let tagA             = document.createElement("a")

           tagLi.classList.add("container_card")
           tagDiv.classList.add("cabecalho_postFeed")
           tagDivContainer.classList.add("container_img_usario_data")
           tagImg.classList.add("imgUsuario_feed")
           tagH3.classList.add("nome_usuario")
           tagP.classList.add("data_post")
           tagDivBt.classList.add("container_bt_editar_excluir")
           tagBtEditar.classList.add("bt_editar")
           tagBtExcluir.classList.add("bt_excluir")
           tagH2.classList.add("tilulo_post")
           tagPConteudoPost.classList.add("descricao_post")
           tagPA.classList.add("container_tagA")
           tagA.classList.add("acessar_publicacao")

           tagImg.src             = imagem
           tagH3.innerText        = nome
           tagSpan.innerText      = "|"
           tagP.innerText         = data
           tagBtEditar.innerText  = "Editar"

           tagBtEditar.addEventListener("click", () =>{

            const editarPublicacao = editarPost(element)
            abirModal(editarPublicacao)

           })

           tagBtExcluir.innerText = "Excluir"

           tagBtExcluir.addEventListener("click", () => {
                const excluirPublicacao =  deletarPost(element)
                abirModal(excluirPublicacao)
           })

           tagH2.innerText        = titulo
           tagPConteudoPost       = conteudo
           tagA.innerText         = "Acessar publicação"

           tagLi.append(tagDiv, tagH2, tagPConteudoPost, tagPA)
           tagDiv.append(tagDivContainer, tagDivBt)
           tagDivContainer.append(tagImg, tagH3, tagSpan, tagP)
           tagDivBt.append(tagBtEditar, tagBtExcluir)
           tagPA.appendChild(tagA)
        
           containerReceberPosts.append(tagLi)
       });
    }
    listaPosts(publicacao)
}

renderizarTodosPost()


function modalCriarPublicacao () {
    const BotaocriarPublicacao = document.querySelector(".bt_criarPublicacao")

    BotaocriarPublicacao.addEventListener("click", () => {
         const publicacao = modalPublicacao()
         abirModal(publicacao)
         

})

}
modalCriarPublicacao ()



export {renderizarTodosPost}