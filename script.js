document.addEventListener("DOMContentLoaded", () => {
  const telefonoGuardado = localStorage.getItem("telefono");
  if (telefonoGuardado) {
    document.getElementById("telefono").value = telefonoGuardado;
  }
  const descripcionGuardada = localStorage.getItem("descripcion");
  if (descripcionGuardada) {
    document.getElementById("descripcion").value = descripcionGuardada;
  }
  const montoGuardado = localStorage.getItem("monto");
  if (montoGuardado) {
    document.getElementById("monto").value = montoGuardado;
  }
});

function calcular() {
  const selectBanco = document.getElementById("banco");
  const telefono = selectBanco.value;
  const banco = selectBanco.options[selectBanco.selectedIndex].textContent;

  const destinatario = document.getElementById("telefono").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const inicio = document.getElementById("horaInicio").value;
  const fin = document.getElementById("horaFin").value;
  const monto = document.getElementById("monto").value;

  const soloDigitos = /^\d+$/;

  if (!soloDigitos.test(telefono)) {
    document.getElementById("resultado").textContent =
      "El teléfono debe contener solo números.";
    return;
  }

  if (!soloDigitos.test(destinatario) || destinatario.length !== 8) {
    document.getElementById("resultado").textContent =
      "El número de teléfono debe tener 8 dígitos.";
    return;
  }

  if (!soloDigitos.test(monto)) {
    document.getElementById("resultado").textContent =
      "El monto debe contener solo números.";
    return;
  }

  if (!inicio || !fin || !descripcion || !destinatario) {
    document.getElementById("resultado").textContent =
      "Por favor ingrese todos los campos.";
    return;
  }

  const [h1, m1] = inicio.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);

  let date1 = new Date(0, 0, 0, h1, m1);
  let date2 = new Date(0, 0, 0, h2, m2);

  if (date2 <= date1) {
    alert("La hora de fin debe ser mayor que la hora de inicio.");
    document.getElementById("total").textContent = "";
  
    document.getElementById("resultado").textContent = "";
    return;
  }

  const diffMs = date2 - date1;
  const diffHrs = Math.floor(diffMs / 1000 / 60 / 60);
  const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const tiempoTotal = `${diffHrs}h${diffMins}m`;

  const total = Math.round(diffHrs * monto + (diffMins / 60) * monto);

  const mensaje = `PASE ${total} ${destinatario} ${descripcion} ${tiempoTotal}`;

  document.getElementById("total").textContent = `Total: ₡${total}`;
  document.getElementById("resultado").textContent = `Mensaje generado: ${mensaje}`;

  // Guardar valores para futuros usos
  localStorage.setItem("telefono", document.getElementById("telefono").value);
  localStorage.setItem("descripcion", descripcion);
  localStorage.setItem("monto", monto);

  const smsLink = `sms:${telefono}?body=${encodeURIComponent(mensaje)}`;
  document.getElementById("smsLink").href = smsLink;
  document.getElementById("smsLink").textContent = `Enviar SINPE Móvil por SMS a ${telefono} (${banco})`;
}
