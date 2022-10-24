export const getLocalStorage = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario")) || ""

    return usuario
}