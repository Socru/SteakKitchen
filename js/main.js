

// =================== LOADER ===================
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      // Oculta el loader después de 1s
      setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => loader.style.display = "none", 50);
      }, 1000);
    }
  });
}

// =================== SMOOTH SCROLL ===================

document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // 1️⃣ Si es un ancla interna y existe en la página actual
    if (href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } 
    // 2️⃣ Si es un ancla interna pero NO existe en la página actual, vamos a index.html
    else if (href.startsWith('#') && !document.querySelector(href)) {
      // Redirige al index con el ancla
      // Como ahora todas las páginas están en la misma carpeta, basta con "index.html"
      e.preventDefault();
      window.location.href = `index.html${href}`;
    } 
    // 3️⃣ Si es un enlace a otra página (eventos.html, contacto.html)
    else {
      // Deja que el navegador haga la navegación normal
      // No hace falta preventDefault
    }
  });
});


// =================== FORMULARIO CONTACTO ===================
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(contactForm));

    // Por ahora solo alert
    alert(`Mensaje enviado!\nNombre: ${formData.nombre}\nCorreo: ${formData.email}\nMensaje: ${formData.mensaje}`);

    // Si quieres enviar al backend:
    // fetch('http://localhost:4000/api/contacto', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    // .then(res => res.json())
    // .then(data => alert(data.message))
    // .catch(err => console.error(err));

    contactForm.reset();
  });
}

// =================== ANIMACIONES AL SCROLL ===================
const scrollElements = document.querySelectorAll('.servicio-card, .galeria-grid img, .hero-texto');

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight - offset)
  );
};

const displayScrollElement = (element) => {
  element.classList.add('in-view');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if(elementInView(el, 150)){
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});



// =================== CARRUSEL DE SERVICIOS ===================
document.querySelectorAll('.carrusel').forEach(carrusel => {
  const images = carrusel.querySelectorAll('img');
  const prev = carrusel.querySelector('.prev');
  const next = carrusel.querySelector('.next');
  const indicators = carrusel.querySelectorAll('.carrusel-indicadores span');
  let index = 0;

  const showImage = (i) => {
    images.forEach((img, idx) => img.classList.toggle('active', idx === i));
    indicators.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
  };

  next.addEventListener('click', () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      showImage(index);
    });
  });

  // Rotación automática
  setInterval(() => {
    index = (index + 1) % images.length;
    showImage(index);
  }, 5000);
});
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.classList.toggle('active');
});


//galeria
document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".galeria-slideshow img"));
  if (!images || images.length === 0) {
    console.warn("Galería: no se encontraron imágenes (.galeria-slideshow img).");
    return;
  }

  // Índice inicial: si alguna imagen ya tiene .active, respetarla; si no, usar 0
  let index = images.findIndex(img => img.classList.contains("active"));
  if (index === -1) {
    index = 0;
    images.forEach((img, i) => img.classList.toggle("active", i === 0));
  }

  let intervalId = null;
  const delayMs = 2000; // <-- 2 segundos

  function showNextImage() {
    // seguridad: si no hay imágenes, detener
    if (!images.length) return;
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }

  function startSlideshow() {
    stopSlideshow(); // evita duplicar intervalos
    intervalId = setInterval(showNextImage, delayMs);
  }

  function stopSlideshow() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // empezar automáticamente
  startSlideshow();

  // pausas al pasar el mouse sobre el contenedor
  const container = document.querySelector(".galeria-slideshow");
  if (container) {
    container.addEventListener("mouseenter", stopSlideshow);
    container.addEventListener("mouseleave", startSlideshow);

    // Pausa en touch (móviles) y reanuda tras touchend
    container.addEventListener("touchstart", stopSlideshow, { passive: true });
    container.addEventListener("touchend", () => {
      // un ligero retraso para que no arranque inmediatamente al soltar
      setTimeout(startSlideshow, 400);
    }, { passive: true });
  } else {
    console.warn("Galería: no se encontró el contenedor .galeria-slideshow para los eventos de pausa.");
  }

  // limpieza al salir de la página
  window.addEventListener("beforeunload", stopSlideshow);

// ==== Abrir/Cerrar modal ====
const modal = document.getElementById("login-modal");
const btnLogin = document.getElementById("btn-login");
const closeBtn = document.querySelector(".close");

if (modal && btnLogin && closeBtn) {
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// ==== FUNCION PARA ACTIVAR MODO ADMIN ====
function activarModoAdmin() {
  console.log("🔧 Modo admin activado");
  document.body.classList.add("modo-admin");

  // Agregar botones de edición a cada tarjeta de platillo
  document.querySelectorAll('.servicio-card').forEach(card => {
    const editBar = document.createElement('div');
    editBar.classList.add('admin-bar');

    editBar.innerHTML = `
      <button class="btn-edit" title="Editar platillo">✏️</button>
      <button class="btn-delete" title="Eliminar platillo">🗑️</button>
    `;

    card.appendChild(editBar);
  });

  // Escuchar clics en los botones de editar
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Función de editar platillo (a implementar)');
      // Aquí podrías abrir un modal de edición
    });
  });

  // Escuchar clics en los botones de eliminar
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('¿Seguro que deseas eliminar este platillo?')) {
        alert('Función de eliminación (a implementar)');
      }
    });
  });
}

// ==== LOGIN (enviar datos al backend) ====
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Respuesta no válida del servidor");
    }

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      modal.style.display = "none";
      alert("Bienvenido administrador 😎");

      // 🔥 Activamos el modo admin
      activarModoAdmin();
      localStorage.getItem('token')


      // 🔄 Recargamos platillos para que aparezcan los botones de edición
      cargarPlatillos();
    } else {
      document.getElementById("login-error").style.display = "block";
      console.warn("Error de login:", data.message);
    }

  } catch (error) {
    console.error("Error en login:", error);
    alert("No se pudo conectar con el servidor.");
  }
});


// =================== CARGAR PLATILLOS DESDE EL BACKEND ===================
// =================== CARGAR PLATILLOS ===================
const API_URL = 'http://localhost:4000/api/platillos';

// Crear modal de edición
const editModal = document.createElement('div');
editModal.classList.add('modal');
editModal.style.display = 'none';
editModal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Editar Platillo</h2>
    <form id="edit-form">
      <input type="text" id="edit-nombre" placeholder="Nombre" required>
      <input type="text" id="edit-categoria" placeholder="Categoría" required>
      <input type="text" id="edit-imagen" placeholder="URL de imagen">
      <textarea id="edit-descripcion" placeholder="Descripción"></textarea>
      <input type="number" id="edit-precio" placeholder="Precio">
      <button type="submit">Guardar</button>
    </form>
  </div>
`;
document.body.appendChild(editModal);

const editForm = document.getElementById('edit-form');
const editClose = editModal.querySelector('.close');
let editId = null;

// Cerrar modal
editClose.addEventListener('click', () => editModal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === editModal) editModal.style.display = 'none'; });

// Abrir modal con datos
function abrirModalEditar(platillo) {
  editId = platillo.id;
  document.getElementById('edit-nombre').value = platillo.nombre || '';
  document.getElementById('edit-categoria').value = platillo.categoria || '';
  document.getElementById('edit-imagen').value = platillo.imagen || '';
  document.getElementById('edit-descripcion').value = platillo.descripcion || '';
  document.getElementById('edit-precio').value = platillo.precio || '';
  editModal.style.display = 'block';
}

// Enviar edición al backend
editForm.addEventListener('submit', async e => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const data = {
    nombre: document.getElementById('edit-nombre').value,
    categoria: document.getElementById('edit-categoria').value,
    imagen: document.getElementById('edit-imagen').value,
    descripcion: document.getElementById('edit-descripcion').value,
    precio: document.getElementById('edit-precio').value
  };
  try {
    const res = await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert('Platillo actualizado correctamente');
      editModal.style.display = 'none';
      cargarPlatillos(); // recarga lista
    } else {
      alert('Error al actualizar platillo');
    }
  } catch (err) {
    console.error(err);
    alert('Error de conexión');
  }
});

// Función para cargar platillos
async function cargarPlatillos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los platillos");
    const data = await res.json();

    const contenedor = document.getElementById('lista-platillos');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    const isAdmin = !!localStorage.getItem("token");

    // Agrupar por categoría si vienen como array plano
    const categorias = Array.isArray(data)
      ? data.reduce((acc, p) => {
          if (!acc[p.categoria]) acc[p.categoria] = [];
          acc[p.categoria].push(p);
          return acc;
        }, {})
      : data;

    renderCategorias(categorias, contenedor, isAdmin);

  } catch (error) {
    console.error('Error al cargar platillos:', error);
  }
}

// Renderizar platillos con botones si es admin
function renderCategorias(categorias, contenedor, isAdmin) {
  for (const categoria in categorias) {
    const platillos = categorias[categoria];
    if (!Array.isArray(platillos)) continue;

    const card = document.createElement('div');
    card.classList.add('servicio-card');

    card.innerHTML = `
      <div class="servicio-imagen">
        <img src="assets/img/default.jpg" alt="${categoria}">
      </div>
      <h3>${categoria.toUpperCase()}</h3>
      <ul>
        ${platillos.map(p => `
          <li data-id="${p.id}">
            ${p.nombre}
            ${isAdmin ? `
              <span class="acciones">
                <button class="btn-editar" title="Editar">✏️</button>
                <button class="btn-eliminar" title="Eliminar">🗑️</button>
              </span>
            ` : ''}
          </li>
        `).join('')}
      </ul>
    `;

    contenedor.appendChild(card);
  }

  if (isAdmin) {
    // Editar
    document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('li').dataset.id;
        // Buscar el platillo dentro de todas las categorías
        let platilloEncontrado = null;
        for (const cat in categorias) {
          platilloEncontrado = categorias[cat].find(p => p.id == id);
          if (platilloEncontrado) break;
        }
        if (platilloEncontrado) abrirModalEditar(platilloEncontrado);
      });
    });

    // Eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', async e => {
        const id = e.target.closest('li').dataset.id;
        if (confirm("¿Seguro que deseas eliminar este platillo?")) {
          try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
              alert("Platillo eliminado correctamente");
              cargarPlatillos();
            } else {
              alert("Error al eliminar el platillo");
            }
          } catch (err) {
            console.error(err);
          }
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', cargarPlatillos);
