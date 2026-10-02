export function DetailsHeader () {
    const detailsHeader = document.createElement("header")
    detailsHeader.classList.add("details-header")

    detailsHeader.innerHTML = /*html*/ `
        <a href="index.html"><i class="fa-solid fa-arrow-left back-to-homepage"></i></a>
        
        <label class="switch">
            <input type="checkbox" name="checkbox" id="checked" >
            <span class="slider round"></span>
        </label>
    `
    return detailsHeader
}