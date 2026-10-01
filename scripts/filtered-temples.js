// Responsive Hamburger Navigation
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

// Array of Temple Objects (7 original + 2 additional)
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
    },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, São Paulo, Brazil",
        dedicated: "2002, May, 17",
        area: 48100,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6012-main.jpg"
    }
];

// Reference to temple cards container and heading
const templeContainer = document.querySelector('#temple-cards');
const pageTitle = document.querySelector('#page-title');

// Function to create and render temple cards
function createTempleCards(templeList) {
    if (!templeContainer) return;
    
    templeContainer.innerHTML = '';
    
    templeList.forEach(temple => {
        const card = document.createElement('section');
        card.classList.add('temple-card');

        const name = document.createElement('h3');
        name.textContent = temple.templeName;

        const location = document.createElement('p');
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement('p');
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement('p');
        area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = 'lazy';
        img.width = 400;
        img.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(img);

        templeContainer.appendChild(card);
    });
}

// Navigation links and filtering logic
const navLinks = document.querySelectorAll('.navigation a');

function setActiveLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
    
    // Auto-close mobile menu on selection if open
    if (mainnav && hambutton && mainnav.classList.contains('open')) {
        mainnav.classList.remove('open');
        hambutton.classList.remove('open');
    }
}

// Filter Event Listeners
const homeLink = document.querySelector('#home-link');
const oldLink = document.querySelector('#old-link');
const newLink = document.querySelector('#new-link');
const largeLink = document.querySelector('#large-link');
const smallLink = document.querySelector('#small-link');

if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        pageTitle.textContent = 'Home';
        setActiveLink(homeLink);
        createTempleCards(temples);
    });
}

if (oldLink) {
    oldLink.addEventListener('click', (e) => {
        e.preventDefault();
        pageTitle.textContent = 'Old Temples';
        setActiveLink(oldLink);
        // Temples built before 1900
        const filtered = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0], 10);
            return year < 1900;
        });
        createTempleCards(filtered);
    });
}

if (newLink) {
    newLink.addEventListener('click', (e) => {
        e.preventDefault();
        pageTitle.textContent = 'New Temples';
        setActiveLink(newLink);
        // Temples built after 2000
        const filtered = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0], 10);
            return year > 2000;
        });
        createTempleCards(filtered);
    });
}

if (largeLink) {
    largeLink.addEventListener('click', (e) => {
        e.preventDefault();
        pageTitle.textContent = 'Large Temples';
        setActiveLink(largeLink);
        // Temples larger than 90,000 sq ft
        const filtered = temples.filter(temple => temple.area > 90000);
        createTempleCards(filtered);
    });
}

if (smallLink) {
    smallLink.addEventListener('click', (e) => {
        e.preventDefault();
        pageTitle.textContent = 'Small Temples';
        setActiveLink(smallLink);
        // Temples smaller than 10,000 sq ft
        const filtered = temples.filter(temple => temple.area < 10000);
        createTempleCards(filtered);
    });
}

// Initial render showing all temples
createTempleCards(temples);
