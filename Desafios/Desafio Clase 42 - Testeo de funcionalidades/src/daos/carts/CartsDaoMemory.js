const ContainerMemory = require("../../containers/ContainerMemory")

class CartsDaoMemory extends ContainerMemory {

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CartsDaoMemory