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
      <h1> Fênix Le Parfums</h1>
      <p>O catálogo sombrio está nascendo...</p>
      <div className="perfume-list">
        {perfumes.map(perfume => (
          <div key={perfume.id} className="perfume-card">
            <h2>{perfume.nome}</h2>
            <p><strong>Marca:</strong> {perfume.marca}</p>
            <p><strong>Família:</strong> {perfume.familiaOlfativa}</p>
            </div>

        ))}
      </div>
    </div>
  )
}

export default App