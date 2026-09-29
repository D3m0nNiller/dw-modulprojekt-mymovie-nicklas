export function FooterMobile() {
    const footerElement = document.createElement("footer")

    footerElement.innerHTML = /*html*/ `
        <i class="fa-solid fa-tape"></i>
        <i class="fa-solid fa-ticket-simple"></i>
        <i class="fa-regular fa-bookmark"></i>
    `
    return footerElement
}