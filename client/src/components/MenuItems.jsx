import React , {useState} from "react"; 
import styled from "styled-components"; 
import MenuItem from "./MenuItem.jsx"; 
import {useSelector} from "react-redux"; 
import {selectItems} from "../redux/directory/directory.selector.js";
import {Row, Col} from "react-bootstrap";


const Container = styled.div`
padding:50px 10px;
border:1px solid black;
margin:10px;
`;

const MenuItems = (props) => {

    const itemsArr = useSelector(selectItems); 


    const displayMenuItems = () => {
        const tempArr = []; 
        
        itemsArr.map( (item , index) => {
         
          tempArr.push(
            item.size === "large" ?
                (<Col md="6" key={item.title}>
                    <MenuItem key= {index} title= {item.title} imageUrl={item.imageUrl} routeUrl={item.routeUrl} size={item.size} />
                </Col>) :
                (<Col md="4" key={item.title}>
                    <MenuItem key= {index} title= {item.title} imageUrl={item.imageUrl} routeUrl={item.routeUrl} size={item.size} />
                </Col>)

                
          );  
        } );         

         return tempArr;
    } 

    return (
        <Container {...props}>
            <Row style={{width:"100%"}}>
            {displayMenuItems()}
            </Row>
        </Container>
    ); 
}


/**
 * {displayMenuItems()}
 */
export default MenuItems; 