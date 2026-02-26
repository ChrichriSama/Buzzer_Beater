/**
 * navbar-auth.js — Auth partagée pour toutes les pages statiques
 * Détecte automatiquement si l'utilisateur est connecté et met à jour la navbar.
 */
(function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Si on revient de la map avec ?logout=1, on vide la session
    if (urlParams.get('logout') === '1') {
        localStorage.removeItem('user');
        window.history.replaceState(null, '', window.location.pathname);
    }

    // Si la map passe ?user=USERNAME (connexion via modal React), on le stocke
    const userFromUrl = urlParams.get('user');
    if (userFromUrl) {
        localStorage.setItem('user', userFromUrl);
        window.history.replaceState(null, '', window.location.pathname);
    }

    const user = localStorage.getItem('user');
    const connectLi = document.querySelector('.navbar li:last-child');

    if (!connectLi) return;

    if (user) {
        // Remplace le lien "Connect" par le nom d'utilisateur + bouton déconnexion
        connectLi.innerHTML = `
            <span class="nav-username">
                <i class="fa-solid fa-user-circle"></i> ${escHtml(user)}
            </span>
            <button class="nav-logout-btn" id="nav-logout-btn">
                <i class="fa-solid fa-right-from-bracket"></i> Déco
            </button>
        `;

        document.getElementById('nav-logout-btn').addEventListener('click', function () {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }

    function escHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
})();
