const correctOrder = [0, 2, 1, 3]; // Orden correcto de runas: Negación → Distorsión → Eco → Vacío
let input = [];
let solved = false;

const buttons = document.querySelectorAll(".runes button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (solved) return;

    const id = parseInt(button.dataset.id);

    // Evita seleccionar el mismo botón varias veces
    if (!input.includes(id)) {
      input.push(id);
      button.classList.add("active"); // verde al seleccionar
    }

    // Cuando se completa la secuencia
    if (input.length === correctOrder.length) {
      const result = document.getElementById("result");

      if (input.every((v,i) => v === correctOrder[i])) {
        // Secuencia correcta
        result.innerHTML = "<strong>El sello se disuelve en silencio.</strong><br>La Urdimbre guarda silencio.";
        solved = true;

        // Cambiar todos los botones al color "correcto" y bloquearlos
        buttons.forEach(b => {
          b.classList.add("correct");  // azul brillante
          b.classList.remove("active"); // quitar verde
          b.disabled = true;
        });

      } else {
        // Secuencia incorrecta
        result.innerText = "La magia se retuerce y vuelve a sellarse.";

        // Aplicar efecto de parpadeo rojo a todos los botones
        buttons.forEach(b => {
          b.classList.add("wrong");       // añadir clase de parpadeo
          b.classList.remove("active");   // quitar verde
        });

        // Limpiar la clase 'wrong' después de la animación
        setTimeout(() => {
          buttons.forEach(b => b.classList.remove("wrong"));
        }, 1500); // 0.5s * 3 parpadeos = 1.5s

        input = []; // reinicia la secuencia
      }
    }
  });
});
