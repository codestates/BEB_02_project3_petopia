import React from 'react'; 
import { UncontrolledCarousel } from 'reactstrap'; 
import slide1 from '../../css/image/메인_감자.png';
import slide2 from '../../css/image/메인_망고베리.jpg'; 
import slide3 from '../../css/image/메인_봄이.jpg'; 
import slide4 from '../../css/image/메인_브라보.jpg'; 

const items = [ 
    { src: slide1}, 
    { src: slide2}, 
    { src: slide3},
    { src: slide4},
    ]; 
    
    function Carousel() { 
        return ( 
            <UncontrolledCarousel items={items}/>
        ) 
    } 
    
export default Carousel;