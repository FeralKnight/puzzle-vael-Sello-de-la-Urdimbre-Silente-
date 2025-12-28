const phraseTemplate = "La ___ te guía en la ___, sus ___ te sacarán del ___";
const blanksOrder = ["pérdida", "oscuridad", "secretos", "abismo"];
let input = [];
let attemptsLeft = 3;
let solved = false;

// Mostrar frase inicial
const phraseDisplay = document.getElementById("phrase-display");
phraseDisplay.innerText = phraseTemplate;

// Actualizar intentos
const attemptsDisplay = document.getElementById("attempts");
attemptsDisplay.innerText = attemptsLeft;

// Función para mezclar un array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mezclar los botones al cargar la página
const buttonsContainer = document.querySelector(".buttons-container");
const buttons = Array.from(buttonsContainer.children);
shuffle(buttons);
buttons.forEach(btn => buttonsContainer.appendChild(btn));

// Manejo de botones
document.querySelectorAll(".buttons-container button").forEach(button => {
  button.addEventListener("click", () => {
    if (solved) return;
    if (attemptsLeft <= 0) return;

    const word = button.dataset.word;
    input.push(word);

    // Rellenar la frase en orden
    let tempPhrase = phraseTemplate;
    input.forEach((w, i) => {
      tempPhrase = tempPhrase.replace("___", w);
    });
    phraseDisplay.innerText = tempPhrase;

    // Validación cuando se completan todos los huecos
    if (input.length === blanksOrder.length) {
      const result = document.getElementById("result");

      if (input.every((w, i) => w === blanksOrder[i])) {
        result.innerHTML = "<strong>El Sello de la Urdimbre se disuelve en silencio.</strong><br>Shar observa desde las sombras.";
        solved = true;
        document.querySelectorAll(".buttons-container button").forEach(b => b.disabled = true);
      } else {
        result.innerText = "La magia se retuerce y vuelve a sellarse.";
        attemptsLeft--;
        attemptsDisplay.innerText = attemptsLeft;
        input = [];
        phraseDisplay.innerText = phraseTemplate;
      }
    }
  });
});

// ----------------------------
// Música Play/Pausa + Volumen
// ----------------------------
const music = document.getElementById("bg-music");
const toggleButton = document.getElementById("toggle-music");
const volumeSlider = document.getElementById("volume-slider");

// Inicializar volumen al 50%
music.volume = volumeSlider.value / 100;

// Cambiar volumen en tiempo real
volumeSlider.addEventListener("input", (e) => {
  music.volume = e.target.value / 100;
});

// Play/Pausa
toggleButton.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleButton.innerText = "⏸️ Pausar";
  } else {
    music.pause();
    toggleButton.innerText = "▶️ Reproducir";
  }
});
