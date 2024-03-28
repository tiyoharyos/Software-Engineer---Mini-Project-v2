import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Intro = () => {
  const Title = {
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1',
    textShadow: '2px 2px black',
    color: "white",
  };

  const containerStyle = {
    paddingTop: '100px', // Add some padding top for better visual appearance
  };

  return (
    <div>
      <Container style={containerStyle}>
        <Row className="justify-content-center">
          <Col xs={12} md={9} lg={8} className="text-center">
            <h1 style={Title}>Selamat datang di Dunia Pokémon!</h1>
            <h3 style={{ color: 'white' }}>Mari jelajahi dunia yang penuh petualangan dan keajaiban bersama Pokémon.</h3>
            <div className="mt-4">
              <Button as={Link} to="/PokemonList" variant="dark" size="lg">Lihat Semua List Pokémon</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Intro;
