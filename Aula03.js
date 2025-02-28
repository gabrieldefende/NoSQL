//Operadores no mongodb
// use mongo-aula3;
db.createCollection("produtos");

db.produtos.insertMany([
    {
        "_id": 1,
        "nome": "Notebook Dell",
        "categoria": "Eletrônicos",
        "preco": 4500,
        "estoque": 15,
        "avaliacao": 4.7
    },
    {
        "_id": 2,
        "nome": "Smartphone Samsung",
        "categoria": "Eletrônicos",
        "preco": 2500,
        "estoque": 30,
        "avaliacao": 4.5
    },
    {
        "_id": 3,
        "nome": "Cadeira Gamer",
        "categoria": "Móveis",
        "preco": 1200,
        "estoque": 10,
        "avaliacao": 4.8
    }
])

//Exercicio 1
db.produtos.find({         
    preco: { $gte: 2000 }  
  })
  //Busca documentos na coleção produtos.
  //O operador $gte (greater than or equal) Filtra produtos cujo campo 'preco' é maior ou igual a 2000



 
//Exercicio 2
db.produtos.find({
    $and: [
      { categoria: "Móveis" },              
      { avaliacao: { $gt: 4.5 } }           
    ]
  })

// $and: Garante que ambas as condições sejam verdadeiras.
//{ categoria: "Móveis" }: Filtra produtos da categoria "Móveis".
//{ avaliacao: { $gt: 4.5 } }: O operador $gt (greater than) retorna documentos com avaliação superior a 4.5.
 


//Exercicio 3
db.produtos.find({
    $or: [
      { preco: { $lt: 2000 } },             
      { estoque: { $gt: 20 } }              
    ]
  })
  //$or: Retorna documentos que atendam a pelo menos uma das condições.
  //{ preco: { $lt: 2000 } }: $lt (less than) filtra produtos com preço menor que 2000.
  //{ estoque: { $gt: 20 } }: $gt (greater than) filtra produtos com estoque maior que 20.




  //Exercicio 4
  db.produtos.find({
    avaliacao: { $exists: true }           
  })                                       
  // Retorna apenas os documentos que possuem o campo 'avaliacao'
  // $exists: true: Filtra documentos em que o campo avaliacao existe, independentemente do valor



  

  //Exercicio 5
  db.produtos.find({
    $nor: [
      { categoria: "Eletrônicos" },         
      { preco: { $gt: 3000 } }              
    ]                                       
  })
  // Exclui produtos da categoria "Eletrônicos"
  // Exclui produtos com preço maior que 3000
  // $nor: Retorna documentos que não atendem a nenhuma das condições especificadas



$gte: Maior ou igual a (>=)
$gt: Maior que (>)
$lt: Menor que (<)
$and: Ambas as condições precisam ser verdadeiras
$or: Pelo menos uma condição precisa ser verdadeira
$nor: Nenhuma das condições pode ser verdadeira
$exists: Verifica a existência de um campo
