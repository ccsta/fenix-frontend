import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [perfumes, setPerfumes] = useState([])
  
  // Estados para capturar os dados que você digita no formulário
  const [nome, setNome] = useState('')
  const [marca, setMarca] = useState('')
  const [familiaOlfativa, setFamiliaOlfativa] = useState('')

  // Função isolada para buscar os perfumes do backend
  const buscarPerfumes = () => {
    fetch('http://localhost:8080/catalogo')
      .then(response => response.json())
      .then(data => setPerfumes(data))
      .catch(error => console.log("Erro ao buscar da API: ", error))
  }

  // Busca os perfumes assim que a página carrega
  useEffect(() => {
    buscarPerfumes()
  }, [])

  // Função mágica que envia o novo perfume pro Spring Boot (POST)
  const handleCadastrar = (e) => {
    e.preventDefault() // Impede a página de recarregar e quebrar o fluxo

    const novoPerfume = { nome, marca, familiaOlfativa }

    fetch('http://localhost:8080/catalogo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoPerfume)
    })
    .then(response => {
      if (response.ok) {
        buscarPerfumes() // Sucesso! Atualiza a vitrine na hora com o novo perfume
        
        // Limpa os campos do formulário para o próximo cadastro
        setNome('')
        setMarca('')
        setFamiliaOlfativa('')
      } else {
        alert("B.O. ao cadastrar o perfume no backend!")
      }
    })
    .catch(error => console.error("Erro no processo de POST:", error))
  }

  return (
    <div className="container">
      <header className="cabecalho">
        <h1>Fênix Le Parfums</h1>
        <p>O catálogo sombrio está nascendo...</p>
      </header>

      {/* Formulário de Cadastro Superior */}
      <section className="secao-cadastro">
        <form onSubmit={handleCadastrar} className="formulario-cadastro">
          <h2>Inserir Novo Perfume</h2>
          
          <div className="campo-input">
            <label>Nome da Fragrância</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: NEMESIS" 
              required 
            />
          </div>

          <div className="campo-input">
            <label>Marca / Grife</label>
            <input 
              type="text" 
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ex: O Boticário" 
              required 
            />
          </div>

          <div className="campo-input">
            <label>Família Olfativa</label>
            <input 
              type="text" 
              value={familiaOlfativa}
              onChange={(e) => setFamiliaOlfativa(e.target.value)}
              placeholder="Ex: INFERNUS" 
              required 
            />
          </div>

          <button type="submit" className="botao-cadastrar">
            Adicionar ao Catálogo
          </button>
        </form>
      </section>

      {/* A vitrine dos cartões */}
      <main className="vitrine">
        {perfumes.map(perfume => (
          <div key={perfume.id} className="card-perfume">
            <h2>{perfume.nome}</h2>
            
            <div className="info-perfume">
              <span className="label">Marca</span>
              <span className="valor">{perfume.marca}</span>
            </div>
            
            <div className="info-perfume">
              <span className="label">Família</span>
              <span className="valor">{perfume.familiaOlfativa}</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App