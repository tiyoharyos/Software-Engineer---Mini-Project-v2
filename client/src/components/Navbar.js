import {Navbar, Container, Nav, NavbarBrand, NavLink} from "react-bootstrap" 


import { Link } from 'react-router-dom';
const NAVBAR = () =>{
    return(
       <div>
        <Navbar variant="dark" bg="dark" >
            <Container>
                <NavbarBrand>
                    POKEMON APP
                </NavbarBrand>
                <Nav>
                    <NavLink as={Link} to ="/">Home</NavLink>
                    <NavLink as={Link} to ="/PokemonList">Pokemon List</NavLink>
                    <NavLink as={Link} to ="/my-pokemon-list">MY Pokemon List</NavLink>
                </Nav>
            </Container>
        </Navbar>
       </div>
    )
}

export default NAVBAR