document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM Loaded");

    fetch("./cartData.json")
        .then(response => {
            console.log("🔄 Fetch Response:", response);
            if (!response.ok) {
                throw new Error(`❌ HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Fetched Data:", data); // See JSON data in console

            // Check if the data structure is correct
            if (!data.items || !Array.isArray(data.items)) {
                throw new Error("❌ Invalid data format: 'items' should be an array.");
            }

            renderCartItems(data.items); // Call the function to render items
            updateTotals(data.subtotal); // Call the function to update totals
        })
        .catch(error => {
            console.error("❌ Error loading JSON data:", error);
        });
});





// DOM Elements
const cartItemsContainer = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");





// Function to Render Cart Items
const renderCartItems = (items) => {
    // Debugging

    cartItemsContainer.innerHTML = ""; // Clear previous items
    items.forEach(item => {

        const cartItem = document.createElement("div");
        cartItem.className = "flex items-center gap-8 border-b py-4";

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.title}" class="w-20 rounded-md">

            <p class="font-semibold text-gray-700">${item.title}</p>

            <p class="pl-4">₹${(item.price).toLocaleString()}</p>

            <input type="number" value="${item.quantity}" class="w-12 border text-center rounded-md ml-20">

            <p class="pl-16 ">₹${(item.line_price).toLocaleString()}</p>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
};



// Function to Update Totals
const updateTotals = (originalTotalPrice) => {
    if (!subtotalEl || !totalEl || originalTotalPrice === undefined) return;

    const subtotal = originalTotalPrice;

    subtotalEl.innerText = subtotal;
    totalEl.innerText = subtotal;
};

// Example usage
updateTotals(250000); // Pass the price directly  



document.getElementById("checkoutBtn").addEventListener("click", () => {
    const toast = document.getElementById("toast");
    toast.style.display = "block";

    // Hide after 2 seconds
    setTimeout(() => { toast.style.display = "none"; }, 4000);
});







