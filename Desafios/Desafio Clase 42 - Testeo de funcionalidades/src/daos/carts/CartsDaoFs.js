const ContainerFs= require("../../containers/ContainerFs");

class CartsDaoFs extends ContainerFs {

    constructor() {
        super('carritos.json')
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CartsDaoFs