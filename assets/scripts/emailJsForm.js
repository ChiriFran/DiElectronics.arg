(function() {
    emailjs.init("gBb_LAjfDmkyqiaHF"); // Reemplaza "YOUR_PUBLIC_KEY" con tu Public Key de EmailJS
  })();
  
  function sendEmail(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('textarea').value;
  
    // Validación adicional
    if (!nombre || !email || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const form = document.getElementById('form');
    const statusMessage = document.getElementById('status-message');
    form.classList.add('loading');
    statusMessage.classList.remove('hidden');
    statusMessage.textContent = 'Enviando...';
  
    const serviceID = 'service_rfeh7zq'; // Reemplaza con tu Service ID de EmailJS
    const templateID = 'template_rxkkikf'; // Reemplaza con tu Template ID de EmailJS
  
    const templateParams = {
      nombre: nombre,
      email: email,
      message: message
    };
  
    emailjs.send(serviceID, templateID, templateParams)
      .then(response => {
        form.reset();
        form.classList.remove('loading');
        statusMessage.textContent = 'Consulta enviada con exito!';
      }, error => {
        console.error('Error:', error);
        form.classList.remove('loading');
        statusMessage.textContent = 'Hubo un error al enviar el formulario';
      });
  }
  