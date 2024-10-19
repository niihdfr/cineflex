import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Seats() {
  const [seatsData, setSeatsData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); // Array de IDs dos assentos
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const { idSession } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`)
      .then((response) => setSeatsData(response.data))
      .catch((error) => console.log(error.response.data));
  }, [idSession]);

  if (!seatsData) {
    return <Loading>Carregando...</Loading>;
  }

  function toggleSeat(seat) {
    if (!seat.isAvailable) {
      alert("Este assento não está disponível!");
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  }

  function handleSubmit() {
    if (selectedSeats.length === 0 || !name || !cpf) {
      alert("Preencha todos os campos e selecione pelo menos um assento!");
      return;
    }

    navigate("/success", {
      state: {
        hour: seatsData.name,
        movie: seatsData.movie,
        day: seatsData.day,
        selectedSeats: seatsData.seats.filter((seat) =>
          selectedSeats.includes(seat.id)
        ), // Passa os assentos selecionados completos
        buyer: { name, cpf },
      },
    });
  }

  return (
    <Content>
      <h2>Selecione o(s) assento(s)</h2>

      <SeatsContainer>
        {seatsData.seats.map((seat) => (
          <Seat
            key={seat.id}
            available={seat.isAvailable}
            selected={selectedSeats.includes(seat.id)}
            onClick={() => toggleSeat(seat)}
          >
            {seat.name}
          </Seat>
        ))}
      </SeatsContainer>

      <Line />

      <Form>
        <label>Nome do comprador(a)</label>
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>CPF do comprador(a)</label>
        <input
          type="text"
          placeholder="Digite seu CPF..."
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <Button onClick={handleSubmit}>Reservar assento(s)</Button>
      </Form>
    </Content>
  );
}

export default Seats;

const Loading = styled.div`
  color: #fadbc5;
  font-family: "Raleway", Arial;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin-top: 50%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 90px;


  h2 {
    color: #ffffff;
    font-family: "Sarala", Arial;
    font-weight: 400;
    font-size: 24px;
    letter-spacing: 2px;
  }
`;

const SeatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: center;
  width: 90%;
  margin-top: -20px;
`;

const Seat = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 15px;
  background-color: ${(props) =>
    props.available
      ? props.selected
        ? "#FADBC5"
        : "#9DB899"
      : "#2B2D36"};
  color: #2B2D36;
  border: ${(props) => (props.available && props.selected ? "solid 2px #EE897F" : "none")};
  cursor: ${(props) => (props.available ? "pointer" : "not-allowed")};
  font-size: 11px;
  font-family: "Roboto";
  display: flex;
  align-items: center;  
  justify-content: center;
  margin-bottom: 10px;

`;

const Line = styled.div`
  width: 80%;
  border: 1px solid #4e5a65;
  
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 90%;
  margin-top: 3px;
    letter-spacing: 1px;
    font-family: "Sarala";
    font-weight: 400;
    color: #FFFFFF;


  input {
    
    padding: 0px 10px;
    border: 1px solid #D4D4D4;
    border-radius: 8px;
    height: 40px;
    margin: 10px 0px;

    &::placeholder {
        font-family: "Roboto";
        font-size: 16px;
        font-style: italic;
        font-weight: 400;
        line-height: 18.75px;
        text-align: left;
        color: #AFAFAF;
    }
  }
`;

const Button = styled.button`
  background-color: #ee897f;
  color: #2B2D36;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 16px 0px;
  font-family: "Sarala";
  font-size: 18px;
  font-weight: 700;
  transition: transform 0.5s, background-color 0.5s;

  &:hover {
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
  
`;
