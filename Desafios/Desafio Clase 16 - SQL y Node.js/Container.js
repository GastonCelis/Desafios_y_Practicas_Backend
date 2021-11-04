class Container{
    constructor(option){
        this.option = option
    }


    async deleteAll(table){
        try {
            await this.option(table).del()
        }
        catch(error) {
            error => { console.log(error); throw error }
        }
        finally{this.option.destroy}
    }


    async deleteById(table, id){
        try{
            await this.option.from(table).where("id", "=", id)
        }
        catch(error) {
            error => { console.log(error); throw error }
        }
        finally{this.option.destroy}
    }


    async getAll(table){
        try{
            const rows = await this.option.from(table).select("*")
            return rows
        } 
        catch(error) {
            error => { console.log(error); throw error }
        }
        finally{this.option.destroy}
    }


    async getById(table, id){
        try{
            const rows = await this.option.from(table).select("*").where("id", "=", id)
            return rows
        }
        catch (error) {
            error => { console.log(error); throw error }
        }
        finally{this.option.destroy}
    }


    async save(table, object) {
        try {
            await this.option(table).insert(object)
        } 
        catch (error) {
            error => { console.log(error); throw error }
        }
        finally{this.option.destroy}
    }


    async update(table, id, object){
        try{
            await this.option.from(table).where("id", "=", id).update(object)
        }
        catch(error){
            error => { console.log(error); throw error }
        }
        finally{this.option.destroy}
    }
}

module.exports = Container