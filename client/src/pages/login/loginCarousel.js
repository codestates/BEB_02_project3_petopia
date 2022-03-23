import React from 'react'; 
import { UncontrolledCarousel } from 'reactstrap'; 
import slide1 from './images/slide1.png';
import slide2 from './images/slide2.png'; 
import slide3 from './images/slide3.png'; 

const items = [ 
    { src: slide1}, 
    { src: slide2}, 
    { src: slide3},
    ]; 
    
    function Carousel() { 
        return ( 
            <UncontrolledCarousel items={items}/>
        ) 
    } 
    
export default Carousel;