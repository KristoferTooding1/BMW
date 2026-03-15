// Quick view modal functionality
function showQuickView(productId, productName, price, specs, image, description) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('quickview-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickview-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()">
            <button class="modal-close" onclick="closeQuickView()">×</button>
            <div class="modal-grid">
                <div class="modal-image">
                    <img src="${image}" alt="${productName}">
                </div>
                <div class="modal-info">
                    <h2 class="modal-title">${productName}</h2>
                    <div class="modal-price">€${price.toLocaleString()}</div>
                    <p class="modal-description">${description}</p>
                    <div class="modal-specs">
                        ${specs.map(spec => `<div class="spec-tag">${spec}</div>`).join('')}
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary-new" onclick="addToCart('${productName}', ${price}, ${productId}); closeQuickView();">
                            Add to Cart
                        </button>
                        <a href="${getProductDetailPage(productName)}" class="btn-secondary-new">View Full Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeQuickView() {
    const modal = document.getElementById('quickview-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function getProductDetailPage(productName) {
    const nameMap = {
        'BMW M2': 'M2.html',
        'BMW M3': 'M3.html',
        'BMW M4': 'M4.html',
        'BMW M5': 'M5.html',
        'BMW M8': 'M8.html',
        'BMW X5 M': 'X5M.html'
    };
    return nameMap[productName] || 'esileht.html';
}

// Close on click outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('quickview-modal');
    if (modal && e.target === modal) {
        closeQuickView();
    }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeQuickView();
    }
});