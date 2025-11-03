class Pila {
  constructor(capacidad = 5) {
    this.elementos = [];
    this.capacidad = capacidad;
  }

  push(valor) {
    if (this.elementos.length >= this.capacidad) {
      throw new Error("Desbordamiento: la pila está llena");
    }
    this.elementos.push(valor);
  }

  pop() {
    if (this.elementos.length === 0) {
      throw new Error("Subdesbordamiento: la pila está vacía");
    }
    return this.elementos.pop();
  }

  peek() {
    if (this.elementos.length === 0) {
      throw new Error("La pila está vacía");
    }
    return this.elementos[this.elementos.length - 1];
  }

  iterarDesdeTope(callback) {
    for (let i = this.elementos.length - 1; i >= 0; i--) {
      callback(this.elementos[i]);
    }
  }
}

const pila = new Pila();
const stackVisual = document.getElementById("stackVisual");
const mensaje = document.getElementById("mensaje");
const valorInput = document.getElementById("valorInput");
const capacidadInput = document.getElementById("capacidadInput");

function mostrarPila() {
  stackVisual.innerHTML = "";
  pila.elementos.forEach((val, i) => {
    const div = document.createElement("div");
    div.className = "stack-item" + (i === pila.elementos.length - 1 ? " top" : "");
    div.textContent = val;
    stackVisual.appendChild(div);
  });
}

function mostrarMensaje(texto, tipo = "ok") {
  mensaje.textContent = texto;
  mensaje.className = "msg " + tipo;
}

document.getElementById("pushBtn").addEventListener("click", () => {
  try {
    pila.push(valorInput.value || "Elemento");
    mostrarPila();
    mostrarMensaje("Elemento apilado correctamente");
    valorInput.value = "";
  } catch (e) {
    mostrarMensaje(e.message, "err");
  }
});

document.getElementById("popBtn").addEventListener("click", () => {
  try {
    const valor = pila.pop();
    mostrarPila();
    mostrarMensaje(`Se desapiló: ${valor}`);
  } catch (e) {
    mostrarMensaje(e.message, "err");
  }
});

document.getElementById("peekBtn").addEventListener("click", () => {
  try {
    const tope = pila.peek();
    mostrarMensaje(`Tope actual: ${tope}`);
  } catch (e) {
    mostrarMensaje(e.message, "err");
  }
});

document.getElementById("iterarBtn").addEventListener("click", () => {
  let recorrido = [];
  pila.iterarDesdeTope(v => recorrido.push(v));
  mostrarMensaje("Iterador (desde tope): " + recorrido.join(", "));
});

capacidadInput.addEventListener("change", () => {
  const nueva = parseInt(capacidadInput.value);
  if (nueva > 0) {
    pila.capacidad = nueva;
    mostrarMensaje(`Capacidad ajustada a ${nueva}`);
  }
});

mostrarPila();
