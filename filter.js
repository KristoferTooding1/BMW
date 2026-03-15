// ===== SEARCH & FILTER SYSTEM =====
const productCards = document.querySelectorAll('.card');

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    
    productCards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        const productPrice = parseInt(card.getAttribute('data-price'));
        
        const matchesSearch = productName.includes(searchTerm) || searchTerm === '';
        const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
        
        if (matchesSearch && matchesPrice) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    console.log(`Filter: search="${searchTerm}", price: €${minPrice}-€${maxPrice}`);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    productCards.forEach(card => {
        card.classList.remove('hidden');
    });
    
    console.log('Filters reset - showing all products');
}

function quickFilter(type) {
    const searchInput = document.getElementById('searchInput');
    
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    if (type === 'affordable') {
        document.getElementById('maxPrice').value = 100000;
        searchInput.value = '';
    } else if (type === 'luxury') {
        document.getElementById('minPrice').value = 100000;
        searchInput.value = '';
    } else {
        searchInput.value = type;
    }
    
    filterProducts(); // Auto-apply for quick filters
}

// Add Enter key support
window.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    // Apply on Enter key
    [searchInput, minPrice, maxPrice].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    });
});