// Navegación móvil
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Product Filter (on productos.html)
  const filterButtons = document.querySelectorAll(".filter-btn")
  const productCards = document.querySelectorAll(".products-section .product-card")

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to the clicked button
        button.classList.add("active")

        const category = button.dataset.category

        productCards.forEach((card) => {
          if (category === "all" || card.dataset.category === category) {
            card.style.display = "block" // Show the card
          } else {
            card.style.display = "none" // Hide the card
          }
        })
      })
    })
  }

  // Product Detail Page - Image Gallery (on producto-prunex.html, etc.)
  const mainImage = document.getElementById("mainImage")
  if (mainImage) {
    window.changeImage = (src) => {
      mainImage.src = src
    }
  }

  // Product Detail Page - Tabs (on product detail pages)
  const tabButtons = document.querySelectorAll(".product-tabs .tab-btn")
  const tabContents = document.querySelectorAll(".product-tabs .tab-content")

  if (tabButtons.length > 0 && tabContents.length > 0) {
    window.openTab = (evt, tabName) => {
      // Deactivate all tab buttons and hide all tab contents
      tabContents.forEach((tab) => tab.classList.remove("active"))
      tabButtons.forEach((btn) => btn.classList.remove("active"))

      // Activate the current tab button and show the current tab content
      document.getElementById(tabName).classList.add("active")
      evt.currentTarget.classList.add("active")
    }
  }

  // Contact Page - FAQ Accordion (on contacto.html)
  const faqQuestions = document.querySelectorAll(".faq-question")

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.closest(".faq-item")
        if (faqItem) {
          faqItem.classList.toggle("active")
        }
      })
    })
  }
})

// Función para comprar por WhatsApp (generalizada para cualquier producto)
function comprarWhatsApp() {
  // Obtener el nombre del producto y el precio de la página actual
  const productNameElement = document.querySelector(".product-info h1")
  const productPriceElement = document.querySelector(".product-price .current-price")

  const productName = productNameElement ? productNameElement.textContent.trim() : "un producto Fuxion"
  const productPrice = productPriceElement ? productPriceElement.textContent.trim() : "precio no especificado"
  
  const phoneNumber = "51934498803" // Número de WhatsApp sin el '+'

  const message = `¡Hola! Estoy interesado/a en comprar ${productName} (${productPrice}). ¿Podrías darme más información para concretar la compra?`
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, "_blank")
}

// Funciones de utilidad (mantengo las que ya estaban y son relevantes)
const Utils = {
  formatPrice: (price) => `S/ ${price.toFixed(2)}`,
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },
  validatePhone: (phone) => {
    const re = /^(\+51|51)?[9][0-9]{8}$/
    return re.test(phone.replace(/\s/g, ""))
  },
  debounce: (func, wait, immediate) => {
    let timeout
    return function executedFunction() {
      const args = arguments
      const later = () => {
        timeout = null
        if (!immediate) func.apply(this, args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(this, args)
    }
  },
  showNotification: (message, type = "success") => {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#27ae60" : "#e74c3c"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: var(--shadow);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease-out;
        `
    document.body.appendChild(notification)
    setTimeout(() => {
      notification.remove()
    }, 5000)
    notification.querySelector(".notification-close").addEventListener("click", () => {
      notification.remove()
    })
  },
}

// Agregar estilos CSS adicionales dinámicamente
const additionalStyles = `
  @keyframes slideInRight {
      from {
          transform: translateX(100%);
          opacity: 0;
      }
      to {
          transform: translateX(0);
          opacity: 1;
      }
  }
  
  .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      margin-left: 0.5rem;
  }
  
  .loaded {
      opacity: 1;
  }
  
  body:not(.loaded) {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
  }
  
  .lazy {
      opacity: 0;
      transition: opacity 0.3s;
  }
  
  .lazy.loaded {
      opacity: 1;
  }
`
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// Manejo de errores global
window.addEventListener("error", (e) => {
  console.error("Error en la aplicación:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Página cargada en ${loadTime.toFixed(2)}ms`)
})
