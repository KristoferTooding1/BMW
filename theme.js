// ===== THEME TOGGLE SYSTEM =====

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    applyTheme(theme);
    console.log(`Theme initialized: ${theme}`);
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'light') {
        // LIGHT THEME - FIXED COLORS
        root.style.setProperty('--bg-primary', '#f8f9fa');
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)');
        
        root.style.setProperty('--text-primary', '#1a1a1a');
        root.style.setProperty('--text-secondary', '#495057');
        root.style.setProperty('--text-muted', '#6c757d');
        
        root.style.setProperty('--border-color', '#dee2e6');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--card-shadow', 'rgba(0, 0, 0, 0.08)');
        root.style.setProperty('--hover-shadow', 'rgba(28, 105, 212, 0.2)');
        
        root.style.setProperty('--accent-color', '#1c69d4');
        root.style.setProperty('--accent-hover', '#0d5cb8');
        root.style.setProperty('--accent-light', 'rgba(28, 105, 212, 0.08)');
        
    } else {
        // DARK THEME
        root.style.setProperty('--bg-primary', '#0a0a0a');
        root.style.setProperty('--bg-secondary', '#000000');
        root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)');
        
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#cccccc');
        root.style.setProperty('--text-muted', '#888888');
        
        root.style.setProperty('--border-color', '#333333');
        root.style.setProperty('--card-bg', '#1a1a1a');
        root.style.setProperty('--card-shadow', 'rgba(0, 0, 0, 0.6)');
        root.style.setProperty('--hover-shadow', 'rgba(28, 105, 212, 0.4)');
        
        root.style.setProperty('--accent-color', '#1c69d4');
        root.style.setProperty('--accent-hover', '#0d5cb8');
        root.style.setProperty('--accent-light', 'rgba(28, 105, 212, 0.1)');
    }
    
    const themeButton = document.getElementById('themeToggle');
    if (themeButton) {
        themeButton.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
    
    localStorage.setItem('theme', theme);
    console.log(`Theme applied: ${theme}`);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    console.log(`Theme toggled: ${currentTheme} → ${newTheme}`);
}

window.addEventListener('DOMContentLoaded', function() {
    initTheme();
});