const filterLeft = document.getElementById('filterLeft');
const filterRight = document.getElementById('filterRight');
let currentFilter = null;

function applyFilter(color) {
  currentFilter = color;

  if (color === 'red') {
    // Rojo sobre rojo
    filterLeft.classList.add('red');
    filterRight.classList.remove('blue');
    filterLeft.style.display = 'block';
    filterRight.style.display = 'none';
  } else if (color === 'blue') {
    // Azul sobre azul
    filterRight.classList.add('blue');
    filterLeft.classList.remove('red');
    filterRight.style.display = 'block';
    filterLeft.style.display = 'none';
  }

  document.addEventListener('mousemove', moveFilter);
}

function applyTwoFilters() {
  // El filtro izquierdo debe ser rojo, y el derecho azul
  filterLeft.classList.add('red');
  filterRight.classList.add('blue');
  filterLeft.style.display = 'block';
  filterRight.style.display = 'block';

  document.addEventListener('mousemove', moveFilter);
}

function moveFilter(event) {
  const { clientX, clientY } = event;

  // Mover el filtro izquierdo (rojo)
  filterLeft.style.left = `${clientX - 100}px`;
  filterLeft.style.top = `${clientY - 50}px`;

  // Mover el filtro derecho (azul)
  filterRight.style.left = `${clientX + 10}px`;
  filterRight.style.top = `${clientY - 50}px`;

  const redTextDisplay = document.getElementById('redTextDisplay');
  const blueTextDisplay = document.getElementById('blueTextDisplay');

  if (currentFilter === 'red') {
    // Filtro rojo: oculta el texto azul
    applyInvisibility(blueTextDisplay, '#0000ff');
    applyInvisibility(redTextDisplay, '#ff0000'); // Rojo visible con rojo
  } else if (currentFilter === 'blue') {
    // Filtro azul: oculta el texto rojo
    applyInvisibility(redTextDisplay, '#ff0000');
    applyInvisibility(blueTextDisplay, '#0000ff'); // Azul visible con azul
  } else {
    // Ambos filtros activos (2 Filtros)
    applyInvisibility(redTextDisplay, '#ff0000'); // Rojo invisible al azul
    applyInvisibility(blueTextDisplay, '#0000ff'); // Azul invisible al rojo
  }
}

function applyInvisibility(textDisplay, colorToHide) {
  const filterRect = colorToHide === '#ff0000' ? filterRight.getBoundingClientRect() : filterLeft.getBoundingClientRect();
  const spans = textDisplay.querySelectorAll('span');

  spans.forEach(span => {
    const spanRect = span.getBoundingClientRect();
    if (isOverlapping(filterRect, spanRect)) {
      span.style.opacity = '0'; // Hacer invisible el texto cuando está bajo el filtro
    } else {
      span.style.opacity = '1'; // Mostrar el texto cuando no está bajo el filtro
    }
  });
}

function isOverlapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function removeFilter() {
  filterLeft.style.display = 'none';
  filterRight.style.display = 'none';
  filterLeft.classList.remove('red', 'blue');
  filterRight.classList.remove('red', 'blue');
  currentFilter = null;
  document.removeEventListener('mousemove', moveFilter);

  document.querySelectorAll('#redTextDisplay span, #blueTextDisplay span').forEach(span => {
    span.style.opacity = '1'; // Asegurar que todo el texto sea visible
  });
}

function updateTextDisplay(inputId, displayId, color) {
  const input = document.getElementById(inputId);
  const display = document.getElementById(displayId);
  display.innerHTML = ''; // Limpiar el contenido del display

  const text = input.value;
  for (let char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.color = color;
    display.appendChild(span);
  }
}

document.getElementById('redTextInput').addEventListener('input', () => {
  updateTextDisplay('redTextInput', 'redTextDisplay', '#ff0000');
});

document.getElementById('blueTextInput').addEventListener('input', () => {
  updateTextDisplay('blueTextInput', 'blueTextDisplay', '#0000ff');
});