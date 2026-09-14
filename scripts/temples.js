const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('open');
        hambutton.classList.toggle('open');
    });
}

const copyrightSpan = document.getElementById('copyright-year');
if (copyrightSpan) {
    copyrightSpan.textContent = new Date().getFullYear();
}

const lastModifiedP = document.getElementById('lastModified');
if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
}
