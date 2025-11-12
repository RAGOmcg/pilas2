// -------------------- Pila --------------------
class Pila {
  constructor(capacidad = 5) {
    this.elementos = [];
    this.capacidad = capacidad;
  }

  push(valor) {
    if (this.elementos.length >= this.capacidad)
      throw new Error("Desbordamiento: la pila está llena");
    this.elementos.push(valor);
  }

  pop() {
    if (this.elementos.length === 0)
      throw new Error("Subdesbordamiento: la pila está vacía");
    return this.elementos.pop();
  }

  peek() {
    if (this.elementos.length === 0)
      throw new Error("La pila está vacía");
    return this.elementos[this.elementos.length - 1];
  }

  iterarDesdeTope(callback) {
    for (let i = this.elementos.length - 1; i >= 0; i--) callback(this.elementos[i]);
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
    mostrarMensaje(`Tope actual: ${pila.peek()}`);
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

// -------------------- Cola --------------------
class Cola {
  constructor(capacidad = 5, tipo = "fifo") {
    this.elementos = [];
    this.capacidad = capacidad;
    this.tipo = tipo;
    this.frente = 0;  
  }

  enqueue(valor, prioridad = 0) {
    if (this.elementos.length >= this.capacidad) throw new Error("Desbordamiento: la cola está llena");
    if (this.tipo === "prioridad") {
      this.elementos.push({ valor, prioridad });
      this.elementos.sort((a,b) => b.prioridad - a.prioridad);
    } else {
      this.elementos.push(valor);
    }
  }

  dequeue() {
    if (this.elementos.length === 0) throw new Error("Subdesbordamiento: la cola está vacía");
    if (this.tipo === "circular") {
      const val = this.elementos[this.frente];
      this.frente = (this.frente + 1) % this.capacidad;
      return val;
    }
    return this.elementos.shift();
  }

  front() {
    if (this.elementos.length === 0) throw new Error("La cola está vacía");
    if (this.tipo === "circular") return this.elementos[this.frente];
    if (this.tipo === "prioridad") return this.elementos[0].valor;
    return this.elementos[0];
  }

  iterar(callback) {
    if (this.tipo === "prioridad") this.elementos.forEach(e => callback(e.valor));
    else this.elementos.forEach(callback);
  }

  setTipo(tipo) {
    this.tipo = tipo;
    this.frente = 0;
  }
}

const cola = new Cola();
const queueVisual = document.getElementById("queueVisual");
const mensajeQueue = document.getElementById("mensajeQueue");
const valorQueueInput = document.getElementById("valorQueueInput");
const capacidadQueueInput = document.getElementById("capacidadQueueInput");
const tipoQueueSelect = document.getElementById("tipoQueueSelect");

function mostrarCola() {
  queueVisual.innerHTML = "";
  cola.elementos.forEach((val,i)=>{
    const div = document.createElement("div");
    div.className = "stack-item";
    if(cola.tipo==="prioridad") div.textContent = `${val.valor} (P:${val.prioridad})`;
    else div.textContent = val;
    if(i===0) div.classList.add("top");
    queueVisual.appendChild(div);
  });
}

function mostrarMensajeQueue(texto, tipo="ok") {
  mensajeQueue.textContent = texto;
  mensajeQueue.className = "msg " + tipo;
}

document.getElementById("enqueueBtn").addEventListener("click", () => {
  try {
    const valor = valorQueueInput.value || "Elemento";
    let prioridad = 0;
    if(cola.tipo==="prioridad") prioridad = parseInt(prompt("Ingresa prioridad numérica:"))||0;
    cola.enqueue(valor, prioridad);
    mostrarCola();
    mostrarMensajeQueue("Elemento agregado correctamente");
    valorQueueInput.value="";
  } catch(e) {
    mostrarMensajeQueue(e.message,"err");
  }
});

document.getElementById("dequeueBtn").addEventListener("click", () => {
  try{
    const valor = cola.dequeue();
    mostrarCola();
    mostrarMensajeQueue(`Elemento eliminado: ${cola.tipo==="prioridad"?valor.valor:valor}`);
  }catch(e){
    mostrarMensajeQueue(e.message,"err");
  }
});

document.getElementById("frontBtn").addEventListener("click", () => {
  try{
    const frente = cola.front();
    mostrarMensajeQueue(`Frente actual: ${cola.tipo==="prioridad"?frente.valor:frente}`);
  }catch(e){
    mostrarMensajeQueue(e.message,"err");
  }
});

document.getElementById("iterarQueueBtn").addEventListener("click",()=>{
  let recorrido=[];
  cola.iterar(v=>recorrido.push(v));
  mostrarMensajeQueue("Iterador: "+recorrido.join(", "));
});

capacidadQueueInput.addEventListener("change",()=>{
  const nueva = parseInt(capacidadQueueInput.value);
  if(nueva>0){
    cola.capacidad = nueva;
    mostrarMensajeQueue(`Capacidad ajustada a ${nueva}`);
  }
});

tipoQueueSelect.addEventListener("change",()=>{
  cola.setTipo(tipoQueueSelect.value);
  mostrarMensajeQueue(`Tipo de cola cambiado a ${tipoQueueSelect.value}`);
  mostrarCola();
});

mostrarCola();
