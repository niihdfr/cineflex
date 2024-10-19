import Navbar from "./components/Navbar"
import FilmsThumbs from "./components/FilmsThumbs"
import SessionsPage from "./components/SessionsPage"
import Seats from "./components/Seats"
import Success from "./components/Success"
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
              <Route path="/showtimes/:idSession/seats/" element={<Seats />} />
              <Route path="/success" element={<Success/>}/>
          </Routes>
      </BrowserRouter>
    )
}

export default App;
