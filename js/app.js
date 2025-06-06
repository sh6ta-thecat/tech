// Cargar header y footer dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });
    
    // Cargar footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            // Actualizar año actual en el footer
            document.getElementById('current-year').textContent = new Date().getFullYear();
        });
    
    // Manejar el formulario de contacto (simulado)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensaje enviado (simulado). En una implementación real, esto enviaría los datos al servidor.');
            contactForm.reset();
        });
    }
});