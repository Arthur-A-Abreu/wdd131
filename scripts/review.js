document.addEventListener("DOMContentLoaded", () => {
    const reviewDisplay = document.getElementById("review-count");

    let reviewCount = Number(window.localStorage.getItem("reviewCounter-ls")) || 0;
    reviewCount++;

    window.localStorage.setItem("reviewCounter-ls", reviewCount);

    if (reviewDisplay) {
        reviewDisplay.textContent = reviewCount;
    }

    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
    }
});
