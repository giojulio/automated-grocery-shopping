import React, { useState } from "react";
import picture from '../../assets/feed.png'
import { ButtonContainer, Container, CounterInput, InfoContainer, ProdImg} from "./StyledProductCard";
// import { useNavigate } from 'react-router-dom';

export const ProductCard = ({props}) => {
    const [counter, setCounter] = useState(0)

    const onClickMinus = () => {
        if ( counter === 0 ){
            setCounter(0)
        } else {
            setCounter(counter-1)
        }
    };

    const onClickPlus = () => {
        if ( counter === props.stock_qty ){
            alert('You have selected all the stock')
        } else {
            setCounter(counter+1)
        }
    };

    return(
        <>  <Container>
                <ProdImg src={ picture } alt='basket of products'/>

                <InfoContainer>
                    <h3><b>{props.name}</b></h3>
                    
                    <h4><b>Stock: {props.stock_qty}</b></h4>

                    <h4><b>${props.price}</b></h4>
                </InfoContainer>
            
                <ButtonContainer>
                    <div>
                        <button onClick={() => onClickPlus()}><b>+</b></button>

                        <CounterInput readOnly value={counter}/>

                        <button onClick={() => onClickMinus()}><b>-</b></button>
                    </div>
                
                    <button>Add to Shopping List</button>
                </ButtonContainer>
            
            </Container>
        </>
    );
};