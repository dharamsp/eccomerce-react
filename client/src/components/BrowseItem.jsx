import React, {useEffect} from "react"; 
import styled from "styled-components";
import {Row,Col} from "react-bootstrap";
import Button from "./CustomButton.jsx";

const Container = styled.div`
border-bottom:1px solid black;
margin-bottom:25px;
padding-bottom:10px;

.img-thumbnail {
    width:200px;
    height:250px;
}

.content{
    float:right;
    width:80%;
    height:100%;
    }
 
    .name {
        text-align:center;
    }

    .featured{
        float:right;
        margin-right:20px;
    }

    .price {
        position:absolute;
        bottom:10px;
        margin-left:50px;
    }
.
`;

const AddToCartButton = styled(Button)`
width: 200px;
height:50px;
opacity: 0.7;
position: absolute;
bottom:20px;
right:35px;
font-size:0.6rem;
font-weight:700;
min-width:unset;
min-width:unset;
padding:0px 10px;
`;




const BrowseItem = props => {
 
    const {name, price, isFeatured, primaryImageUrl, type, _id} = props.item;  
    return (
            <Col as={Container} key={_id} lg={12}>
               <img className="img-thumbnail" src={primaryImageUrl} alt={name}/>
                <div className="content"> 
                    <h5 className="name">{name}</h5>
                         <p style={{display:"inline"}}>Sold by {"Rupmalya Kumar"}</p>
                         {isFeatured ? <i className= "featured">FEATURED</i> : <></>}
                        <i style={{display:"block"}}>in {type}</i>
                         <div className="price"><h4>${price}</h4></div>
                      <AddToCartButton>Add to Cart</AddToCartButton>  
                </div>
            </Col>
            );
}

export default BrowseItem; 
