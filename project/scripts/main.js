// Footer dynamic dates
const currentYearSpan = document.querySelector('#currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.querySelector('#lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
}

// Hamburger menu navigation toggle
const hambutton = document.querySelector('#menu-toggle');
const mainnav = document.querySelector('.navigation');

if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('open');
        hambutton.classList.toggle('open');
    });
}

// Array of Trail Objects
const trails = [
    {
        name: "Eagle Crest Summit",
        difficulty: "Moderate",
        distance: 7.5,
        elevation: 1850,
        time: "4 hours",
        image: "images/trail-1.svg",
        alt: "Eagle Crest Summit trail with pine trees and high peaks",
        description: "A scenic ascent featuring panoramic views of alpine ridges and deep valleys."
    },
    {
        name: "Whispering Pines Loop",
        difficulty: "Easy",
        distance: 3.2,
        elevation: 420,
        time: "1.5 hours",
        image: "images/trail-2.svg",
        alt: "Forest trail with towering pines and gentle slopes",
        description: "A peaceful family-friendly loop through dense evergreen forests with wildflowers."
    },
    {
        name: "Granite Ridge Pass",
        difficulty: "Strenuous",
        distance: 12.0,
        elevation: 3200,
        time: "7 hours",
        image: "images/trail-3.svg",
        alt: "Rugged granite cliffs and steep mountain pass",
        description: "A challenging high-altitude trek crossing dramatic cliffs and rocky mountain passes."
    },
    {
        name: "Crystal Lake Trail",
        difficulty: "Moderate",
        distance: 5.8,
        elevation: 1200,
        time: "3 hours",
        image: "images/trail-4.svg",
        alt: "Pristine glacial lake surrounded by mountain peaks",
        description: "Hike to a pristine alpine lake reflecting snow-capped peaks. Great for photos."
    },
    {
        name: "Cascade Falls Path",
        difficulty: "Easy",
        distance: 2.6,
        elevation: 310,
        time: "1 hour",
        image: "images/trail-5.svg",
        alt: "Mountain waterfall with wooden bridge crossing",
        description: "A refreshing forest walk following a rushing creek up to a beautiful waterfall."
    },
    {
        name: "Timberline Alpine Ridge",
        difficulty: "Strenuous",
        distance: 9.4,
        elevation: 2750,
        time: "5.5 hours",
        image: "images/trail-6.svg",
        alt: "Alpine ridge trail under sunset sky",
        description: "An exhilarating trail above the timberline offering 360-degree mountain views."
    }
];

// Display Trail Cards Function
const trailContainer = document.querySelector('#trail-cards');

function displayTrails(trailList) {
    if (!trailContainer) return;
    
    trailContainer.innerHTML = "";
    
    trailList.forEach(trail => {
        const card = document.createElement("section");
        card.classList.add("trail-card");

        card.innerHTML = `
            <h3>${trail.name}</h3>
            <img src="${trail.image}" alt="${trail.alt}" loading="lazy" width="400" height="250">
            <p><span class="label">Difficulty:</span> ${trail.difficulty}</p>
            <p><span class="label">Distance:</span> ${trail.distance} miles</p>
            <p><span class="label">Elevation Gain:</span> ${trail.elevation} ft</p>
            <p><span class="label">Est. Time:</span> ${trail.time}</p>
            <p class="desc">${trail.description}</p>
            <button type="button" class="favorite-btn" data-name="${trail.name}">Save Trail</button>
        `;

        trailContainer.appendChild(card);
    });

    // Add event listeners to favorite buttons
    const favButtons = document.querySelectorAll('.favorite-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const trailName = e.target.getAttribute('data-name');
            saveFavoriteTrail(trailName);
        });
    });
}

// LocalStorage: Save Favorite Trail
function saveFavoriteTrail(name) {
    let savedList = JSON.parse(localStorage.getItem('savedTrails')) || [];
    
    if (!savedList.includes(name)) {
        savedList.push(name);
        localStorage.setItem('savedTrails', JSON.stringify(savedList));
        alert(`${name} was added to your saved trails!`);
    } else {
        alert(`${name} is already in your saved trails.`);
    }

    updateFavoritesDisplay();
}

function updateFavoritesDisplay() {
    const favDisplay = document.querySelector('#saved-count');
    if (favDisplay) {
        const savedList = JSON.parse(localStorage.getItem('savedTrails')) || [];
        favDisplay.textContent = `${savedList.length}`;
    }
}

// Trail Filtering Logic
const allLink = document.querySelector('#all-trails');
const easyLink = document.querySelector('#easy-trails');
const moderateLink = document.querySelector('#moderate-trails');
const strenuousLink = document.querySelector('#strenuous-trails');

if (allLink) {
    allLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveFilter(allLink);
        displayTrails(trails);
    });
}

if (easyLink) {
    easyLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveFilter(easyLink);
        const filtered = trails.filter(trail => trail.difficulty === "Easy");
        displayTrails(filtered);
    });
}

if (moderateLink) {
    moderateLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveFilter(moderateLink);
        const filtered = trails.filter(trail => trail.difficulty === "Moderate");
        displayTrails(filtered);
    });
}

if (strenuousLink) {
    strenuousLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveFilter(strenuousLink);
        const filtered = trails.filter(trail => trail.difficulty === "Strenuous");
        displayTrails(filtered);
    });
}

function setActiveFilter(activeBtn) {
    const buttons = document.querySelectorAll('.filter-nav a');
    buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Initial Call
if (trailContainer) {
    displayTrails(trails);
    updateFavoritesDisplay();
}

// Gear Checklist LocalStorage (gear.html)
const gearCheckboxes = document.querySelectorAll('.gear-check');
if (gearCheckboxes.length > 0) {
    const savedGear = JSON.parse(localStorage.getItem('packedGear')) || [];

    gearCheckboxes.forEach(cb => {
        if (savedGear.includes(cb.id)) {
            cb.checked = true;
        }

        cb.addEventListener('change', () => {
            const currentChecked = Array.from(document.querySelectorAll('.gear-check:checked')).map(item => item.id);
            localStorage.setItem('packedGear', JSON.stringify(currentChecked));
            updateGearCount();
        });
    });

    const resetGearBtn = document.querySelector('#reset-gear');
    if (resetGearBtn) {
        resetGearBtn.addEventListener('click', () => {
            gearCheckboxes.forEach(cb => cb.checked = false);
            localStorage.removeItem('packedGear');
            updateGearCount();
        });
    }

    function updateGearCount() {
        const countSpan = document.querySelector('#packed-count');
        if (countSpan) {
            const checked = document.querySelectorAll('.gear-check:checked').length;
            countSpan.textContent = `${checked}`;
        }
    }

    updateGearCount();
}

// Form Submission & LocalStorage Counter (contact.html)
const tripForm = document.querySelector('#trip-form');
if (tripForm) {
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let submissions = Number(localStorage.getItem('tripRequestsCount')) || 0;
        submissions += 1;
        localStorage.setItem('tripRequestsCount', `${submissions}`);

        const nameValue = document.querySelector('#name').value;
        const msgDiv = document.querySelector('#confirmation-message');

        if (msgDiv) {
            msgDiv.innerHTML = `
                <p class="success-msg">Thank you, <strong>${nameValue}</strong>! Your trip request has been submitted.</p>
                <p>Total inquiries sent from this browser: <strong>${submissions}</strong></p>
            `;
        }

        tripForm.reset();
    });
}
