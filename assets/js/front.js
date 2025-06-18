// Script para el manejo de pestañas en About section
const tabButtons = document.querySelectorAll('[data-web-toggle="tabs"]');
const tabPanels = [
    document.getElementById('tabs-panel-profile'),
    document.getElementById('tabs-panel-vision'),
    document.getElementById('tabs-panel-history')
];

tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        // Oculta todos los paneles
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        });

        // Remueve el estado activo de todos los botones
        tabButtons.forEach(b => b.classList.remove('bg-sky-400', 'text-white'));

        // Muestra el panel correspondiente con animación
        tabPanels[idx].classList.add('active');
        tabPanels[idx].setAttribute('aria-hidden', 'false');

        // Marca el botón como activo
        btn.classList.add('bg-sky-400', 'text-white');
    });
});

// Inicializa mostrando solo el primer panel
tabPanels.forEach((panel, idx) => {
    if (idx === 0) {
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
    } else {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
    }
});

// Script para el menú de navegación móvil
// Selecciona el botón y el menú
const menuBtn = document.querySelector('[aria-label="Toggle navigation menu"]');
const navMenu = document.getElementById('navbarMenu');

// Mostrar/ocultar menú al hacer clic en el botón
menuBtn.addEventListener('click', (e) => {
    navMenu.classList.toggle('hidden');
    const expanded = navMenu.classList.contains('hidden') ? 'false' : 'true';
    menuBtn.setAttribute('aria-expanded', expanded);
    e.stopPropagation();
});

// Cerrar menú al hacer clic fuera de él (solo en móvil)
document.addEventListener('click', (e) => {
    const isMenuOpen = !navMenu.classList.contains('hidden');
    const isMobile = window.innerWidth < 1024;
    if (
        isMenuOpen &&
        isMobile &&
        !navMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        navMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Cerrar menú al hacer clic en cualquier enlace del menú (solo en móvil)
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            navMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Script para animar las secciones al hacer scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            obs.unobserve(entry.target); // Solo animar una vez
        }
    });
}, {
    threshold: 0.15 // Cuando el 15% de la sección sea visible
});

sections.forEach(section => {
    observer.observe(section);
});

// Ajustar el scroll al hacer clic en los enlaces del menú
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 170; // Ajusta este valor según el tamaño del navbar o el espacio deseado
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition
            });
        }
    });
});