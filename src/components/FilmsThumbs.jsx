import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FilmsThumbs () {

    const [films, setFilms] = useState(null);

    useEffect(() => {
        
        axios
        .get("https://mock-api.driven.com.br/api/v8/cineflex/movies")

        .then((response) => setFilms(response.data))

        .catch((error) => console.log(error.response.data))
        
    }, []);

    if (films === null) {
        return <Loading>Carregando...</Loading>
    }

    return (
        <>
            <Content>

                <h2>Em Cartaz</h2>

                <Images>
                    {films.map(f => {
                        return ( 
                        <Image key={f.id} to={`/movies/${f.id}/showtimes`}>
                            <img src={f.posterURL} alt={`Banner de ${f.title}`} />
                        </Image> 
                        
                    )})}
                </Images>
            </Content>
        </>
    )
}

export default FilmsThumbs;

const Loading = styled.div `
        color: #FADBC5;
        font-family: "Raleway", Arial;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        margin-top: 50%;
`

const Content = styled.div` 
    align-items: center;
    margin-bottom: 30px;
    margin-top: 110px;

    h2 {
        color: #FFFFFF;
        font-family: "Sarala", Arial;
        font-weight: 400;
        font-size: 24px;
        text-align: center;
        line-height: 39.13px;
        letter-spacing: 2px;
    }

`

const Images = styled.div` 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 26px;
    margin-top: 20px;
    
`

const Image = styled(Link) `
    flex-wrap: wrap;
    cursor: pointer;
    transition: transform 0.5s, background-color 0.5s;
    
    img {
        width: 145px;
        height: 210px;
        border-radius: 8px;
        cursor: pointer;
    }

    &:hover {
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
    
`
