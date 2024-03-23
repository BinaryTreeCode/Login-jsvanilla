const dataBase = [
  {
    nombre: "Juan",
    contraseña: "1234",
  },
  ,
  {
    nombre: "Pedro",
    contraseña: "4321",
  },
  {
    nombre: "Maria",
    contraseña: "5678",
  },
  {
    nombre: "Luis",
    contraseña: "9012",
  },
  {
    nombre: "Ana",
    contraseña: "3456",
  },
  {
    nombre: "Carlos",
    contraseña: "7890",
  },
  {
    nombre: "Laura",
    contraseña: "0123",
  },
  {
    nombre: "Jorge",
    contraseña: "6789",
  },
];

const image = document.getElementById("IMAGE");
function loadFile(event) {
  image.src = URL.createObjectURL(event.target.files[0]);
}

const error_name = document.getElementById("ERROR_NAME");
const error_password = document.getElementById("ERROR_PASWORD");

const inputName = document.getElementById("INPUT_NAME");
const pasword = document.getElementById("INPUT_PASWORD");

let idName, idPasword = -2;
const data = {
  text: ["nombre", "contraseña"],
  error: [error_name, error_password],
  id: [idName, idPasword],
  input: [inputName, pasword],
};

const nombre = document.getElementById("NAME");
data.input[0].addEventListener("input", () => {
  nombre.innerHTML = data.input[0].value;
});


function validated() {
  data.error.forEach((error) => {
    error.style.display = "none";
  });

  if (
    data.input.reduce((acumulador, input) => acumulador + !input.value, 0) == 0
  ) {
    cycle(houndID);
    if (data.id.reduce((acumulador, id) => acumulador + id, 0) > -1
    ) {
      if (data.id.every((id) => id === data.id[0])) {
        image.src = "./check-in-circle-filled_.png";
      } else {
        data.error.forEach((error) => {
          update(error, "nombre o contraseña incorrecta");
        });
      }
    } else {
      cycle(error);
    }
  } else {
    cycle(vacuumError);
  }
}

function vacuumError({ input, error, text }) {
  !input.value ? update(error, `El campo de ${text} está vacío`) : undefined;
}

function error({ id, error, text }) {
  return id === -1 ? update(error, `${text} incorrecto`) : true;
}

let n = 1;
function houndID({ input, text }) {
  n = (n == 1) ? 0 : 1;
  data.id[n] = dataBase.findIndex(obj => obj === undefined ? false : obj[text] === input.value);
}


function update(error, text) {
  error.textContent = text;
  error.style.display = "block";
}

function cycle(función) {
  for (let i = 0; i < data.text.length; i++) {
    let obj = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value[i]])
    );
    función(obj);
  }
}

