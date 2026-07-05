// Use international format without +, for example: "50212345678".
const WHATSAPP_NUMBER = "50259942300";

const floors = {
  lower: {
    label: "Planta baja",
    image: "assets/planta-baja.jpg",
    alt: "Plano renderizado de la planta baja de Casa de las Flores",
    spaces: [
      {
        id: "garage",
        title: "Garage techado",
        type: "Acceso",
        x: 50,
        y: 84,
        description: "Entrada cómoda para dos vehículos, protegida y conectada directamente con el área social.",
        pitch: "Ideal para familias que reciben visitas o necesitan dos parqueos.",
      },
      {
        id: "sala",
        title: "Sala amplia",
        type: "Área social",
        x: 39,
        y: 65,
        description: "Un ambiente social abierto, con buena proporción para recibir y vivir el día a día.",
        pitch: "Ayuda a que la primera impresión de la casa se sienta amplia y familiar.",
      },
      {
        id: "comedor",
        title: "Comedor integrado",
        type: "Área social",
        x: 43,
        y: 49,
        description: "El comedor queda conectado con sala, cocina y jardín interior para una circulación natural.",
        pitch: "Funciona muy bien para reuniones sin dividir demasiado los espacios.",
      },
      {
        id: "cocina",
        title: "Cocina moderna",
        type: "Servicio diario",
        x: 62,
        y: 45,
        description: "Cocina funcional con isla y relación directa hacia el comedor.",
        pitch: "Un punto fuerte para compradores que valoran una cocina social y práctica.",
      },
      {
        id: "jardin",
        title: "Jardín interior",
        type: "Luz natural",
        x: 42,
        y: 32,
        description: "Pulmón verde que aporta frescura, luz natural y una pausa visual dentro de la casa.",
        pitch: "Eleva la sensación de tranquilidad y diferencia la propiedad frente a casas cerradas.",
      },
      {
        id: "habitacion-baja",
        title: "Habitación en planta baja",
        type: "Dormitorio",
        x: 34,
        y: 16,
        description: "Habitación con baño privado, pensada para visitas, adultos mayores u oficina independiente.",
        pitch: "Resuelve una necesidad muy buscada: dormir o trabajar sin subir gradas.",
      },
      {
        id: "lavanderia",
        title: "Lavandería y bodega",
        type: "Servicio",
        x: 65,
        y: 27,
        description: "Área de apoyo para mantener orden operativo sin invadir los ambientes principales.",
        pitch: "Hace que la casa se sienta mejor resuelta para una familia real.",
      },
      {
        id: "bano-visitas",
        title: "Baño de visitas",
        type: "Apoyo social",
        x: 65,
        y: 62,
        description: "Baño ubicado cerca del área social y las gradas.",
        pitch: "Comodidad para reuniones sin comprometer la privacidad de las habitaciones.",
      },
    ],
  },
  upper: {
    label: "Planta alta",
    image: "assets/planta-alta.jpg",
    alt: "Plano renderizado de la planta alta de Casa de las Flores",
    spaces: [
      {
        id: "master",
        title: "Habitación máster",
        type: "Dormitorio principal",
        x: 39,
        y: 82,
        description: "Suite principal con baño privado, salida a balcón y vista hacia Fuego y Acatenango.",
        pitch: "El argumento emocional más fuerte: despertar con vista a volcanes.",
      },
      {
        id: "balcon",
        title: "Balcón frontal",
        type: "Exterior privado",
        x: 49,
        y: 94,
        description: "Extensión exterior de la habitación máster para aprovechar atardeceres y ventilación.",
        pitch: "Convierte la máster en un espacio de descanso, no solo en dormitorio.",
      },
      {
        id: "secundaria-sur",
        title: "Habitación secundaria",
        type: "Dormitorio",
        x: 37,
        y: 62,
        description: "Dormitorio secundario con baño completo y acceso claro desde el distribuidor.",
        pitch: "Mantiene independencia para hijos, visitas o familia extendida.",
      },
      {
        id: "banos",
        title: "Baños completos",
        type: "Privacidad",
        x: 43,
        y: 51,
        description: "Cada habitación secundaria cuenta con su propio baño completo.",
        pitch: "Sube el valor percibido porque evita baños compartidos en el segundo nivel.",
      },
      {
        id: "secundaria-norte",
        title: "Habitación secundaria",
        type: "Dormitorio",
        x: 35,
        y: 34,
        description: "Habitación secundaria conectada al corredor principal y cercana a la terraza.",
        pitch: "Flexible para dormitorio, cuarto de invitados o estudio.",
      },
      {
        id: "terraza",
        title: "Terraza y azotea",
        type: "Social exterior",
        x: 49,
        y: 13,
        description: "Área superior pensada para reuniones, descanso y vistas abiertas.",
        pitch: "Un espacio social que vende estilo de vida, no solo metros cuadrados.",
      },
      {
        id: "distribuidor",
        title: "Distribuidor iluminado",
        type: "Circulación",
        x: 56,
        y: 35,
        description: "Circulación central que conecta habitaciones, gradas y terraza.",
        pitch: "Hace que la segunda planta se perciba ordenada y fácil de recorrer.",
      },
      {
        id: "gradas",
        title: "Acceso a segunda planta",
        type: "Conexión",
        x: 66,
        y: 42,
        description: "Escaleras ubicadas para separar lo social del primer nivel y lo privado del segundo.",
        pitch: "La casa conserva privacidad sin perder fluidez entre niveles.",
      },
    ],
  },
};

const state = {
  floor: "lower",
  activeSpaceId: "garage",
};

const planImage = document.querySelector("#planImage");
const hotspotLayer = document.querySelector("#hotspotLayer");
const floorLabel = document.querySelector("#floorLabel");
const spaceTitle = document.querySelector("#spaceTitle");
const spaceDescription = document.querySelector("#spaceDescription");
const spaceType = document.querySelector("#spaceType");
const spacePitch = document.querySelector("#spacePitch");
const floorTabs = Array.from(document.querySelectorAll(".floor-tab"));
const form = document.querySelector("#leadForm");
const formNote = document.querySelector("#formNote");

function activeFloor() {
  return floors[state.floor];
}

function activeSpace() {
  return activeFloor().spaces.find((space) => space.id === state.activeSpaceId) || activeFloor().spaces[0];
}

function buildWhatsappUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  if (!WHATSAPP_NUMBER) {
    return `https://wa.me/?text=${encodedMessage}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function updateWhatsappLinks() {
  const space = activeSpace();
  const generalMessage = "Hola, vi Casa de las Flores y quiero recibir información general sobre la propiedad.";
  const spaceMessage = `Hola, vi Casa de las Flores y quiero saber más sobre ${space.title}.`;

  document.querySelectorAll("[data-whatsapp-general]").forEach((link) => {
    link.href = buildWhatsappUrl(generalMessage);
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  document.querySelectorAll("[data-whatsapp-space]").forEach((link) => {
    link.href = buildWhatsappUrl(spaceMessage);
    link.target = "_blank";
    link.rel = "noreferrer";
  });
}

function renderHotspots() {
  hotspotLayer.innerHTML = "";
  activeFloor().spaces.forEach((space, index) => {
    const button = document.createElement("button");
    button.className = `hotspot${space.id === state.activeSpaceId ? " is-active" : ""}`;
    button.type = "button";
    button.style.left = `${space.x}%`;
    button.style.top = `${space.y}%`;
    button.setAttribute("aria-label", `Ver ${space.title}`);
    button.textContent = String(index + 1);
    button.addEventListener("click", () => {
      state.activeSpaceId = space.id;
      render();
    });
    hotspotLayer.appendChild(button);
  });
}

function renderPanel() {
  const floor = activeFloor();
  const space = activeSpace();
  floorLabel.textContent = floor.label;
  spaceTitle.textContent = space.title;
  spaceDescription.textContent = space.description;
  spaceType.textContent = space.type;
  spacePitch.textContent = space.pitch;
}

function renderTabs() {
  floorTabs.forEach((tab) => {
    const isActive = tab.dataset.floor === state.floor;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });
}

function renderImage() {
  const floor = activeFloor();
  planImage.src = floor.image;
  planImage.alt = floor.alt;
}

function render() {
  renderImage();
  renderTabs();
  renderHotspots();
  renderPanel();
  updateWhatsappLinks();
}

floorTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const nextFloor = tab.dataset.floor;
    state.floor = nextFloor;
    state.activeSpaceId = floors[nextFloor].spaces[0].id;
    render();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const date = data.get("date")?.toString().trim();
  const message = data.get("message")?.toString().trim();
  const leadMessage = [
    message || "Hola, vi Casa de las Flores y quiero agendar una visita.",
    name ? `Mi nombre es ${name}.` : "",
    date ? `Me gustaría visitarla: ${date}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  formNote.textContent = "Abriendo WhatsApp con el mensaje preparado.";
  window.open(buildWhatsappUrl(leadMessage), "_blank", "noopener,noreferrer");
});

render();
