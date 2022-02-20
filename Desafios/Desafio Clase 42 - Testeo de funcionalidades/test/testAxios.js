import axios from "axios"
import got from "got"

axios.get("http://localhost:8080/")
    .then(({ data })=> console.log(data))
    .catch(({ message })=> console.error(`Error: ${message}`))

axios.post("http://localhost:8080/")
.then(({ data })=> console.log(data))
.catch(({ message })=> console.error(`Error: ${message}`))

axios.put("http://localhost:8080/:id")
.then(({ data })=> console.log(data))
.catch(({ message })=> console.error(`Error: ${message}`))

axios.delete("http://localhost:8080/")
.then(({ data })=> console.log(data))
.catch(({ message })=> console.error(`Error: ${message}`))

got.get("http://localhost:8080/")
    .then(({ body }) => console.log(body))
    .catch(({ message })=> console.error(`Error: ${message}`))

got.post("http://localhost:8080/")
.then(({ body }) => console.log(body))
.catch(({ message })=> console.error(`Error: ${message}`))

got.put("http://localhost:8080/:id")
.then(({ body }) => console.log(body))
.catch(({ message })=> console.error(`Error: ${message}`))

got.delete("http://localhost:8080/")
.then(({ body }) => console.log(body))
.catch(({ message })=> console.error(`Error: ${message}`))