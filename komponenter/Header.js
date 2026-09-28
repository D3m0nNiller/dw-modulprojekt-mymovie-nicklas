export function Header() {
    const headerElement = document.createElement("header")

    headerElement.innerHTML = /*html*/`
        <i class="fa-solid fa-bars-staggered"></i>
        <h1>MyMovies</h1>
        <label class="switch">
            <input type="checkbox" name="checkbox" id="checked" >
            <span class="slider round"></span>
        </label>
    `
    return headerElement
}