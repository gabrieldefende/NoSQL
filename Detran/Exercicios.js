//1. Modelo com mais multas
db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "id_veiculo",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $lookup: {
      from: "modelos",
      localField: "veiculo.id_modelo",
      foreignField: "_id",
      as: "modelo"
    }
  },
  { $unwind: "$modelo" },
  {
    $group: {
      _id: "$modelo.nome",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  { $limit: 1 }
])


//2. Multas por cidade (simplificado)
db.multas.aggregate([
  {
    $lookup: {
      from: "cidades",
      localField: "id_cidade",
      foreignField: "_id",
      as: "cidade"
    }
  },
  { $unwind: "$cidade" },
  {
    $group: {
      _id: "$cidade.nome",
      total: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])



//3. Infração mais aplicada (otimizada)
db.multas.aggregate([
  {
    $group: {
      _id: "$id_infracao",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "infracoes",
      localField: "_id",
      foreignField: "_id",
      as: "infracao"
    }
  },
  { $unwind: "$infracao" },
  {
    $project: {
      _id: 0,
      infracao: "$infracao.descricao",
      total: 1
    }
  }
])



//4. Mês com mais multas
db.multas.aggregate([
  {
    $project: {
      mes: { $month: "$data_multa" }
    }
  },
  {
    $group: {
      _id: "$mes",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
])



//5. Cor mais multada
db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "id_veiculo",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: "$veiculo.id_cor",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "cores",
      localField: "_id",
      foreignField: "_id",
      as: "cor"
    }
  },
  { $unwind: "$cor" },
  {
    $project: {
      _id: 0,
      cor: "$cor.nome",
      totalMultas: "$total"
    }
  }
])



//6. Agente que mais multou (consulta direta)
db.multas.aggregate([
  {
    $group: {
      _id: "$id_agente",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "agentes",
      localField: "_id",
      foreignField: "_id",
      as: "agente"
    }
  },
  { $unwind: "$agente" },
  {
    $project: {
      _id: 0,
      agente: "$agente.nome",
      totalMultas: "$total"
    }
  }
])



//7. Sexo mais multado (consulta completa)
db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "id_veiculo",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $lookup: {
      from: "proprietarios",
      localField: "veiculo.id_proprietario",
      foreignField: "_id",
      as: "proprietario"
    }
  },
  { $unwind: "$proprietario" },
  {
    $group: {
      _id: "$proprietario.id_sexo",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "sexos",
      localField: "_id",
      foreignField: "_id",
      as: "sexo"
    }
  },
  { $unwind: "$sexo" },
  {
    $project: {
      _id: 0,
      sexo: "$sexo.nome",
      totalMultas: "$total"
    }
  }
])



//8. Marca preferida por homens (consulta otimizada)
db.proprietarios.aggregate([
  { $match: { id_sexo: 1 } },
  {
    $lookup: {
      from: "veiculos",
      localField: "_id",
      foreignField: "id_proprietario",
      as: "veiculos"
    }
  },
  { $unwind: "$veiculos" },
  {
    $lookup: {
      from: "modelos",
      localField: "veiculos.id_modelo",
      foreignField: "_id",
      as: "modelo"
    }
  },
  { $unwind: "$modelo" },
  {
    $group: {
      _id: "$modelo.id_marca",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "marcas",
      localField: "_id",
      foreignField: "_id",
      as: "marca"
    }
  },
  { $unwind: "$marca" },
  {
    $project: {
      _id: 0,
      marca: "$marca.nome",
      totalVeiculos: "$total"
    }
  }
])



//9. Cor preferida por mulheres (consulta similar)
db.proprietarios.aggregate([
  { $match: { id_sexo: 2 } },
  {
    $lookup: {
      from: "veiculos",
      localField: "_id",
      foreignField: "id_proprietario",
      as: "veiculos"
    }
  },
  { $unwind: "$veiculos" },
  {
    $group: {
      _id: "$veiculos.id_cor",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "cores",
      localField: "_id",
      foreignField: "_id",
      as: "cor"
    }
  },
  { $unwind: "$cor" },
  {
    $project: {
      _id: 0,
      cor: "$cor.nome",
      totalVeiculos: "$total"
    }
  }
])



//10. Ranking de veículos mais multados (consulta direta)
db.multas.aggregate([
  {
    $group: {
      _id: "$id_veiculo",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  {
    $lookup: {
      from: "veiculos",
      localField: "_id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $project: {
      _id: 0,
      placa: "$veiculo.placa",
      totalMultas: 1
    }
  }
])



db.veiculos.createIndex({ id_modelo: 1 })
db.multas.createIndex({ id_veiculo: 1 })
// Repita para outros campos de relacionamento
