const user = {
  name: "Jhon",
  lastname: "Doe",
  //Metodos: cuando la property de un objeto es una funcion se llama metodo
  transferir(amount) {
    this.cuenta = this.cuenta - amount;
    return this.cuenta;
  },
  age: 30,
  cuenta: 100,
  isFrecuentlyClient: true,
  hobbies: ["read", "programming", "run"],
  address: {
    street: "Pine Street",
    city: "New York",
    country: "USA",
  },
};

//Accede al div con id cuenta y se asigna a una variable
let cuenta = document.getElementById("cuenta");

let userData = document.getElementById("userData");

userData.innerHTML = `<div class="userContainer"> 
<p>${user.name} ${user.lastname}</p>
</div>`;

cuenta.innerHTML = "Saldo actual: $" + user.cuenta; // Muestra el valor de la property cuenta

//Obtenemos el id de movimientos
let movimientos = document.getElementById("movementsList");

//Tras el evento click del boton se ejecuta el bloque de codigo

document.getElementById("btn").addEventListener("click", function () {
  let monto = prompt("Ingrese un monto");
  if (monto > user.cuenta) {
    alert("Saldo insuficiente");
  } else if (monto < 0 || monto == "") {
    alert("Monto no valido");
  } else {
    if (confirm("¿Desea realizar la transferencia?")) {
      user.transferir(monto);
      movimientos.innerHTML += `0${new Date().getDate()}/0${new Date().getMonth()+1}/${new Date().getFullYear()}
      a las  ${new Date().getHours()}:${new Date().getMinutes()}<li>Transferencia de $${monto}</li>`;

    }
  }
  cuenta.innerHTML = "Saldo actual: $" + user.cuenta;
});



//#region Clases y Objetos

//Contructores: Permiten crear objetos con properties y methods

function Person() {
  this.name = "";
  this.lastname = "";
  this.age = 0;
  this.showFullName = function () {
    return `${this.name} ${this.lastname}`;
  };
}

const user2 = new Person();
user2.name = "Elliot";
user2.lastname = "Alderson";
user2.age = 30;

console.log(user2);

//Object() es un constructor predefinido de JS

const user3 = Object();
user3.name = "Elliot";
user3.lastname = "Alderson";

console.log(Object.values(user3));

//Prototype

function User(name, lastname, age) {
  this.name = name;
  this.lastname = lastname;
  this.age = age;
  this.fullName = function () {
    return `${this.name} ${this.lastname}`;
  };
}

const Curtis = new User("Curtis", "Ross", 30);
console.log(Curtis.fullName());

//Agregando un metodo nuevo al objeto Curtis creado a traves de la clase User
/* 
User.greet = function(){
  return `Hello  I'm ${this.fullName()}`;
}

console.log(Curtis.greet()); */

//Para agregar un metodo nuevo y hacer que este disponible en todos los objetos despues de haber sido creados agregamos la
// property prototype

User.prototype.greet = function () {
  return `Hello  I'm ${this.fullName()}`;
};

// Creando un objeto con clase Animal (sugar sintax)
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello I'm ${this.name} and I'm ${this.age} years old`;
  }
}

const dog = new Animal("Rex", 3);
console.log(dog.greet());

//Asociacion: Relacion entre objetos

class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
}

const car = new Vehicle("Honda", "Civic");
const motorcycle = new Vehicle(`${car.brand}`, "Cargo");

//relation
car.subtype = motorcycle;
console.log(car);
console.log(motorcycle);

//Agregattion: Relaciona objetos pero algunos objetos tienen un rol mucho mayor que otros

const company = {
  name: "Acme",
  products: [],
};

function addProduct(product) {
  company.products.push(product);
}

addProduct(car);
addProduct(motorcycle);

console.log(company);

//Composition un componente no tiene vida independiente del objeto que lo contiene, tal es el caso el objeto address

const client = {
  name: "Martin",
  lastname: "Madrazo",
  address: {
    street: "Philbox 1",
    city: "Los Santos",
    country: "EUA",
  },
};

//Principios de la POO: Encapsulacion, herencia, polimorfismo

//Encapsulacion es la propiedad de ocultar los detalles de la implementacion de un objeto
/* 
const empresa = {
  name: 'Cyborg Tech',
  employees: [],
  sortEmployees(){
    return this.employees.sort();
  }
}

empresa.employees.push('Juan', 'Pedro', 'Aria');
console.log(empresa.sortEmployees()); */

function Empresa(name) {
  let employees = [];
  this.name = name;
  this.getEmployees = function () {
    return employees;
  };

  this.addEmployee = function (employee) {
    employees.push(employee);
  };
}

const empresa1 = new Empresa("Empresa 1");
const empresa2 = new Empresa("Empresa 2");

console.log(empresa1);
console.log(empresa2);

empresa1.addEmployee({ name: "ryan" });
empresa2.addEmployee({ name: "Sally" });

console.log(empresa1.getEmployees());
console.log(empresa2.getEmployees());

//Herencia es la propiedad de heredar propiedades y metodos de un objeto a otro

//Sintaxis normal

/* 
function Guy() {
  this.name = "";
  this.lastname = "";
}

function Programmer() {
  this.language = "";
}

Programmer.prototype = new Guy();

const programador = new Programmer();
programador.name = "Erik";
programador.lastname = "Perez";
programador.language = "JavaScript";

console.log(
  `El nombre del programador es ${programador.name} ${programador.lastname} y el lenguaje que domina es ${programador.language}`
); */

//Sintaxis con class


class Guy {
  constructor(name,lastname){
    this.name = name;
    this.lastname = lastname;
  }
}

class Programmer extends Guy {
  constructor(name, lastname,language){
    super(name,lastname);
    this.language = language;
  }
}

const guy = new Guy('Trevor', 'Phillips');
const programador = new Programmer('Erik','Perez', 'JavaScript');

console.log(guy);
console.log(programador);

//Polimorfismo es la  propiedad de utilizar multiples formas de un mismo metodo


//overloading

function countItems(x){
  return x.toString().length;
}

console.log(countItems('HOla'))
console.log(countItems(10))

//suma

function sum(x = 0, y=0, z = 0){
  let result = x + y + z;
  return `${result} has ${countItems(result)} digits`;
}


console.log(sum(1,20,333));

//polimormorfismo parametrico(funciona con parametros de diferentes tipos)


function Stack(){
  this.items = [];
  this.push = function(item){
    this.items.push(item);
  }
}

const stack = new Stack();
stack.push(1)
const stack2 = new Stack();
stack2.push('hola')

console.log(stack);
console.log(stack2);


//Subtipos de polimorfismo: 


class PersonOne {
  constructor(name, lastname){
    this.name = name,
    this.lastname = lastname
  }
}

class ProgrammerOne extends PersonOne {
  constructor(name, lastname,language){
    super(name,lastname);
    this.language = language;
  }
}


const nombre1 = new PersonOne('Jean', 'Reno');
const programador1 = new ProgrammerOne('Mark', 'Zuckerberg', 'PHP');

console.log(programador1);
console.log(nombre1);


/* function writeFullName(p){
  console.log(p.name + '' + p.lastname);
} */