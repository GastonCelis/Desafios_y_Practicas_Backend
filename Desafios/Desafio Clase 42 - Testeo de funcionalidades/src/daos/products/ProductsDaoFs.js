const ContainerFs= require("../../containers/ContainerFs");

class ProductsDaoFs extends ContainerFs {

    constructor() {
        super('productos.json')
    }

}

export default ProductsDaoFs