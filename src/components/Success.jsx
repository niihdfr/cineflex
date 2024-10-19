import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Success() {
  const { state } = useLocation();
  const { movie, day, hour, selectedSeats, buyer } = state;
  const navigate = useNavigate();

  return (
    <Container>
      <h2>Pedido finalizado!</h2>

      <Details>

        <ContDetails>
            <p><strong>Filme e sessão:</strong></p>
            <Line/>
            <Det>
                <p>{movie.title}</p>
                <p>{day.date} às {hour}</p>
            </Det>
            <p><strong>Ingressos:</strong></p>
            <Line/>
            <Det>
                {selectedSeats.map((seat) => (
                  <p key={seat.id}>Assento {seat.name}</p>
                ))}
            </Det>
            <p><strong>Comprador(a):</strong></p>
            <Line/>
            <Det>
                <p>Nome: {buyer.name}</p>
                <p>CPF: {buyer.cpf}</p>
            </Det>
        </ContDetails>

      </Details>

      <Button onClick={() => navigate("/")}>Voltar para tela inicial</Button>
    </Container>
  );
}

export default Success;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  padding: 0;
  
  text-align: center;

  h2 {
    font-family: "Sarala", Arial;
    font-weight: 400;
    font-size: 24px;
    color: #9DB899;
    letter-spacing: 2px;
    padding: 10px 0px;
  }
`;

const Details = styled.div`
  width: 90%;
  padding-bottom: 30px;
  text-align: left;
  font-family: "Roboto", Arial;
  background-color: #2B2D36;
  border-radius: 8px;

  p {
    color: #EE897F;
    font-family: "Sarala";
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-align: left;
  }
`;

const ContDetails = styled.div`
    margin-left: 18px;
`

const Line = styled.div`
    width: 95%;
    border: 1px solid #4e5a65;
    margin-top: -10px;
    margin-bottom: -10px;
`;

const Det = styled.div `

    
    p {
        color: #FFFFFF;
        font-family: Sarala;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0.04em;
        margin-bottom: -18px;
    }
`


const Button = styled.button`
  background-color: #ee897f;
  width: 90%;
  color: #2b2d36;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Sarala", Arial;
  font-size: 18px;
  font-weight: 700;
  margin-top: 22px;
  margin-bottom: 50px;
  transition: transform 0.5s, background-color 0.5s;

    &:hover {
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
`;
