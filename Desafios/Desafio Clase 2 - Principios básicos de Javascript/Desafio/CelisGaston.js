class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };

    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    };
    
    addMascota(mascota){
        this.mascotas.push(mascota);
    };
    
    countMascotas(){
        return this.mascotas.length;
    };
    
    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    };
    
    getBooksNames(){
        return this.libros.map(libro => ` ${libro.nombre}`);
    };
};

let nuevoUsuario = new Usuario ("Gaston", "Celis", [{nombre: "Mi Planta de Naranja Lima", autor: "José Mauro de Vasconcelos"}], ["Perro"]);

console.log(`Nombre Completo: ${nuevoUsuario.getFullName()}`);
nuevoUsuario.addMascota("Gato");
console.log(`Cantidad de mascotas de ${nuevoUsuario.getFullName()}: ${nuevoUsuario.countMascotas()}`);
nuevoUsuario.addBook("Harry Potter", "J. K. Rowling");
console.log(`Libros que posee ${nuevoUsuario.getFullName()}: ${nuevoUsuario.getBooksNames()}`);
