// Compare models functionality
let compareList = JSON.parse(localStorage.getItem('compareList')) || [];

function toggleCompare(productId, productName, price, specs) {
    const index = compareList.findIndex(item => item.id === productId);
    
    if (index > -1) {
        // Remove from compare
        compareList.splice(index, 1);
        showToast(`${productName} removed from comparison`);
    } else {
        // Add to compare (max 3)
        if (compareList.length >= 3) {
            showToast('Maximum 3 models can be compared');
            return;
        }
        compareList.push({ id: productId, name: productName, price, specs });
        showToast(`${productName} added to comparison (${compareList.length}/3)`);
    }
    
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareButton();
}

function updateCompareButton() {
    const btn = document.getElementById('compare-btn');
    if (btn) {
        if (compareList.length > 0) {
            btn.style.display = 'flex';
            btn.querySelector('.compare-count').textContent = compareList.length;
        } else {
            btn.style.display = 'none';
        }
    }
}

function showCompareModal() {
    if (compareList.length < 2) {
        showToast('Add at least 2 models to compare');
        return;
    }
    
    let modal = document.getElementById('compare-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'compare-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }
    
    let tableHTML = `
        <div class="modal-content compare-content" onclick="event.stopPropagation()">
            <button class="modal-close" onclick="closeCompareModal()">×</button>
            <h2 class="compare-title">Compare Models</h2>
            <div class="compare-table">
                <div class="compare-row header">
                    <div class="compare-cell"></div>
                    ${compareList.map(item => `
                        <div class="compare-cell">
                            <h3>${item.name}</h3>
                            <div class="compare-price">€${item.price.toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
    `;
    
    // Get all unique spec keys
    const specKeys = ['Power', '0-100 km/h', 'Drivetrain'];
    
    specKeys.forEach((key, idx) => {
        tableHTML += `
            <div class="compare-row">
                <div class="compare-cell label">${key}</div>
                ${compareList.map(item => `
                    <div class="compare-cell">${item.specs[idx] || 'N/A'}</div>
                `).join('')}
            </div>
        `;
    });
    
    tableHTML += `
            </div>
            <div class="compare-actions">
                <button class="btn-secondary-new" onclick="clearCompare()">Clear All</button>
                <button class="btn-primary-new" onclick="closeCompareModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.innerHTML = tableHTML;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeCompareModal() {
    const modal = document.getElementById('compare-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function clearCompare() {
    compareList = [];
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareButton();
    closeCompareModal();
    showToast('Comparison cleared');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', updateCompareButton);