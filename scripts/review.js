document.addEventListener("DOMContentLoaded", () => {
    // Review Counter using localStorage
    const reviewDisplay = document.getElementById("review-count");

    // Get current review count from localStorage or initialize to 0
    let reviewCount = Number(window.localStorage.getItem("reviewCounter-ls")) || 0;

    // Increment count by 1 each time the review page loads
    reviewCount++;

    // Store updated count back to localStorage
    window.localStorage.setItem("reviewCounter-ls", reviewCount);

    // Display the count on the page
    if (reviewDisplay) {
        reviewDisplay.textContent = reviewCount;
    }

    // Dynamic Footer Information
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
    }
});
