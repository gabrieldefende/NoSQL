// Seleciona o banco de dados (ou cria se não existir)
use <database>

// Mostra todos os bancos de dados disponíveis no MongoDB
show dbs

// Cria uma coleção chamada "users" dentro do banco de dados atual
db.createCollection("users")

// Insere um único documento na coleção "users"
db.users.insertOne(
    {
        name: "Alice", 
        age: 25, 
        city: "São Paulo"
    }
)

// Insere múltiplos documentos na coleção "users"
db.users.insertMany([
    {
        name: "Bob", 
        age: 30, 
        city: "Rio de Janeiro"
    }, 
    {
        name: "Carlos", 
        age: 22, 
        city: "Belo Horizonte"
    }
])

// Busca todos os documentos onde a idade seja 25 e formata a saída de forma mais legível
db.users.find(
    {
        age: 25
    }
).pretty();

db.Users.find().pretty();

// Busca todos os documentos onde a cidade seja "São Paulo"
// Retorna apenas os campos "name", "state" e "_id"
db.users.find(
    {
        city: "São Paulo"
    },
    {
        name: 1,
        state: 1,
        _id: 1
    }
)

// Atualiza um único documento onde o nome seja "Alice", alterando sua idade para 26
db.users.updateOne(
    { name: "Alice"},
    { $set: {age: 26}}
)

// Atualiza todos os documentos onde a cidade seja "São Paulo", adicionando o campo "state" com valor "SP"
db.users.updateMany(
    { city: "São Paulo"},
    { $set: {state: "SP"}}
)

// Adiciona um novo hobby ao array "hobbies" do documento onde o nome seja "Alice"
db.users.updateOne(
    {name: "Alice"},
    {$push: {hobbies: "reading"}}
)

// Remove um único documento onde o nome seja "Carlos"
db.users.deleteOne({
    name: "Carlos"
})

// Remove todos os documentos onde a idade seja menor que 25
db.users.deleteMany({
    age: {$lt: 25}
})

// Insere um novo documento na coleção "clients", contendo um array de pedidos (orders)
db.clients.insertOne({
    _id: 1,
    name: "João Silva",
    email: "joao@gmail.com",
    orders: [
        {id_order: 101, product: "Notebook", value: 3000},
        {id_order: 102, product: "Smartphone", value: 1500}
    ]
})

// Remove o banco de dados atual
db.dropDatabase()
