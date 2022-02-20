class PersistenceFactory {

    static async getPersistenceMethod(pers) {
        switch (pers) {
            case "json":
            const { default: ProductsDaoFs } = await import("./products/ProductsDaoFs")
            const { default: CartsDaoFs } = await import("./carts/CartsDaoFs")
    
            return {
                productosDao: new ProductsDaoFs(),
                carritosDao: new CartsDaoFs()
            }
            case "mongodb":
            const { default: ProductsDaoMongoDb } = await import("./products/ProductsDaoMongoDb")
            const { default: CartsDaoMongoDb } = await import("./carts/CartsDaoMongoDb")
    
            return {
                productosDao: new ProductsDaoMongoDb(),
                carritosDao: new CartsDaoMongoDb()
            }
            default:
            const { default: ProductsDaoMemory } = await import("./products/ProductsDaoMemory")
            const { default: CartsDaoMemory } = await import("./carts/CartsDaoMemory")
    
            return {
                productosDao: new ProductsDaoMemory(),
                carritosDao: new CartsDaoMemory()
            }
        }
    
        }
}

export default PersistenceFactory