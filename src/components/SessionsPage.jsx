import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SessionsPage() {

    const [sessions, setSessions] = useState(null);
    const {idFilm} = useParams();

    useEffect(() => {
        
        axios
        .get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilm}/showtimes`)

        .then((response) => setSessions(response.data))

        .catch((error) => console.log(error.response.data))
        
    }, [idFilm]);

    if (!sessions) {
        return <Loading>Carregando...</Loading>;
    }

    return (
        <Content>   
            <h2>Selecione o horário</h2>
            
            {sessions.days.map(s => 
                (
                    <Day key={s.id}>

                        <Date>{s.weekday}, {s.date}</Date>

                        <Line/>

                        <Times>
                        {s.showtimes.map((showtime) => (
                            <Time key={showtime.id} to={`/showtimes/${showtime.id}/seats`}>
                                {showtime.name}
                            </Time>

                        ))}
                        </Times>
                </Day>
                )
            )}
            
        </Content>
    )
}

export default SessionsPage;

const Loading = styled.div `
        color: #FADBC5;
        font-family: "Raleway", Arial;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        margin-top: 50%;
`

const Content = styled.div `
    
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

        h2 {
            font-family: "Sarala", Arial;
            font-weight: 400;
            font-size: 24px;
            color: white;
            letter-spacing: 2px;
        }
`


const Line = styled.div `
        width: 302px;
        border: 1px solid #4E5A65;
        margin-bottom: 19px;
`

const Day = styled.div`

    background-color: #2B2D36;
    width: 338px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;

const Date = styled.h3`
    color: #FFFFFF;
    font-family: "Raleway", Arial;
    font-weight: 400;
    font-size: 22px;
    text-align: center;
`;

const Times = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    
`;

const Time = styled(Link)`
    color: #FADBC5;
    background-color: #2B2D36;
    font-family: "Raleway", Arial;
    font-weight: 400;
    font-size: 18px;
    border: solid #EE897F 2px;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 16px;
    transition: transform 0.5s, background-color 0.5s;

    &:hover {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }

`;