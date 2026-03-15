// Brand new simple filter system
function filterProducts() {
    // Get filter values
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const min = document.getElementById('minPrice').value;
    const max = document.getElementById('maxPrice').value;
    
    const minPrice = min ? parseInt(min) : 0;
    const maxPrice = max ? parseInt(max) : 999999999;
    
    // Get all product cards
    const cards = document.querySelectorAll('.product-card');
    let count = 0;
    
    console.log('Filtering with:', { search, minPrice, maxPrice, totalCards: cards.length });
    
    // Loop through each card
    cards.forEach(card => {
        // Get product data
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const priceStr = card.getAttribute('data-price') || '0';
        const price = parseInt(priceStr);
        
        // Check if matches
        const matchesName = !search || name.includes(search);
        const matchesPrice = price >= minPrice && price <= maxPrice;
        
        // Show or hide
        if (matchesName && matchesPrice) {
            card.style.display = '';
            card.classList.remove('hidden');
            count++;
        } else {
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });
    
    console.log('Showing', count, 'products');
    
    // Show feedback
    if (typeof showToast === 'function') {
        showToast(`Found ${count} models`);
    }
}

function resetFilters() {
    // Clear inputs
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    // Show all cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.display = '';
        card.classList.remove('hidden');
    });
    
    if (typeof showToast === 'function') {
        showToast('Showing all models');
    }
}

function quickFilter(type) {
    // Clear previous filters
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    // Apply quick filter
    if (type === 'affordable') {
        document.getElementById('maxPrice').value = '100000';
    } else if (type === 'luxury') {
        document.getElementById('minPrice').value = '100000';
    } else {
        // Model name search
        document.getElementById('searchInput').value = type;
    }
    
    // Apply immediately
    filterProducts();
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['searchInput', 'minPrice', 'maxPrice'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    filterProducts();
                }
            });
        }
    });
});