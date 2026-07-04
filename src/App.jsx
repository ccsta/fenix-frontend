import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [perfumes, setPerfumes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/catalogo')
      .then((response) => response.json())
      .then(data => setPerfumes(data))
      .catch(error => console.log("Erro ao buscar da API: ", error))
  
  }, [])
  return (
    <div className="container">
      <header className="cabecalho">
        <h1>Fênix Le Parfums</h1>
        <p>O catálogo sombrio está nascendo...</p>
      </header>

      {/* A vitrine onde os cartões vão ficar */}
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