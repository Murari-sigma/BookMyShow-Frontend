// ================= TOAST =================
function showToast(message, type = 'success') {
    console.log("Toast call hua bhai:", message); // Yeh line daal do
    
    let existingToast = document.getElementById('custom-toast');
    if (existingToast) {
        existingToast.remove();
    }

    let toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.innerText = message;
    
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = (type === 'error' ? '#e50914' : '#28a745');
    toast.style.color = '#fff';
    toast.style.padding = '14px 24px';
    toast.style.borderRadius = '6px';
    toast.style.fontSize = '15px';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '999999';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    toast.style.transition = 'all 0.3s ease';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ================= SESSION =================
function setLoggedInUser(user) {
    localStorage.setItem('bms_user', JSON.stringify(user));
    updateNavUser();
}

function getLoggedInUser() {
    const data = localStorage.getItem('bms_user');
    return data ? JSON.parse(data) : null;
}

function logout() {
    localStorage.removeItem('bms_user');
    updateNavUser();

    showToast('Logged out successfully', 'success');

    // safer redirect logic
    const path = window.location.pathname;
    if (path.includes('bookings') || path.includes('admin')) {
        window.location.href = 'index.html';
    }
}

// ================= NAV =================
function updateNavUser() {
    const navUser = document.getElementById('nav-user');
    if (!navUser) return;

    const user = getLoggedInUser();

    if (user) {
        navUser.innerHTML = `
            <span style="color: var(--text-muted); font-size: 0.9rem;">
                Hi, <strong style="color: var(--white)">${user.name}</strong>
            </span>
            <button class="btn btn-sm btn-outline" onclick="logout()">Logout</button>
        `;
    } else {
        navUser.innerHTML = `
            <a href="login.html" class="btn btn-sm btn-outline">Login</a>
            <a href="register.html" class="btn btn-sm btn-primary">Sign Up</a>
        `;
    }
}

// ================= PATH HELPERS (FIXED) =================
function getPagePath(path) {
    // simple & stable version
    const isInPages = window.location.pathname.includes('/pages/');

    if (isInPages) {
        return path.replace('pages/', '');
    }
    return path;
}

function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
}

// ================= LOADING =================
function showLoading(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
        el.innerHTML = `
            <div class="loading-center">
                <div class="spinner"></div>
            </div>
        `;
    }
}

function showEmpty(containerId, message = 'No data found') {
    const el = document.getElementById(containerId);
    if (el) {
        el.innerHTML = `
            <div class="empty-state">
                <div class="icon">🎬</div>
                <p>${message}</p>
            </div>
        `;
    }
}

// ================= MODAL =================
function openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
}

// ================= SAFE EVENT HANDLER =================
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {
    updateNavUser();
});