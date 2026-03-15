// ===== SEARCH & FILTER SYSTEM =====
const productCards = document.querySelectorAll('.product-card');

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        const productPrice = parseInt(card.getAttribute('data-price'));
        
        const matchesSearch = productName.includes(searchTerm) || searchTerm === '';
        const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
        
        if (matchesSearch && matchesPrice) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    console.log(`Filter applied: ${visibleCount} products shown`);
    showToast(`${visibleCount} models found`);
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    productCards.forEach(card => {
        card.classList.remove('hidden');
    });
    
    console.log('Filters reset');
    showToast('Filters reset - showing all models');
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
    
    filterProducts();
}

window.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    [searchInput, minPrice, maxPrice].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    filterProducts();
                }
            });
        }
    });
});