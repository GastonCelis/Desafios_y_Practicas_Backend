const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    };

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.file, "");
        }
        catch(error) {
            console.error("Error:", error);
        }
    };

    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            const productos = JSON.parse(contenido);
            const filtroPorId = productos.filter(element => element.id != id)

            const productosStrings = JSON.stringify(filtroPorId, null, 2);
            await fs.promises.writeFile(this.file, productosStrings);
        }
        catch(error) {
            console.error('Error:', error);
        }
    };

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            const productos = JSON.parse(contenido);
            return productos;
        } 
        catch(error) {
            console.error('Error:', error);
        }
    };

    async getById(id){
        try{
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            const productos = JSON.parse(contenido);
            return productos.filter(element => element.id === id)
        }
        catch (error) {
            console.error('Error:', error);
        };
    };

    async save(object) {
        try {
            let productos = [];
            const contenido = await fs.promises.readFile(this.file, "utf-8");

            if (contenido === '') {
                object.id = 1;
                productos.push(object);
            }
            else {
                const listaDeProducto = JSON.parse(contenido);
                object.id = listaDeProducto[listaDeProducto.length - 1].id + 1;
                listaDeProducto.push(object);
                productos = listaDeProducto;
            }

            const productosStrings = JSON.stringify(productos, null, 2);
            await fs.promises.writeFile(this.file, productosStrings);
            return object.id;
        } 
        catch (error) {
            console.error('Error:', error);
        };
    };
};

module.exports = Contenedor;