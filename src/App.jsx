import Navbar from "./Navbar"
import FilmsThumbs from "./FilmsThumbs"
import SessionsPage from "./SessionsPage"
import { createGlobalStyle } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #212226;
    margin: 0;
    padding: 0;
    font-family: 'Afacad Flux', Arial, sans-serif;
    text-decoration: none;
  }
`;


function App() {
    return (
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
          <Routes>
              <Route path="/" element= {<FilmsThumbs />}/>
              <Route path="/movies/:idFilm/showtimes" element={<SessionsPage />} />
          </Routes>
      </BrowserRouter>
    )
}

export default App;
