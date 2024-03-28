import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Navbar';
import PokemonList from './components/PokemonListPage';
import PokemonDetail from './components/PokemonDetailPage';
import MyPokemonList from './components/MyPokemonListPage';
import './App.css'; 
import Intro from './components/Intro';

function App() {
  const myBG = {
    height:'100vh' ,
    background: '#171717',
  };
  return (
    <div style={myBG}>

    <Router>
            <Sidebar />
      <Container fluid>
        
       
      
          
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/PokemonList" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/my-pokemon-list" element={<MyPokemonList />} />
            </Routes>
          
        
      </Container>
    </Router>
    </div>
  );
}

export default App;