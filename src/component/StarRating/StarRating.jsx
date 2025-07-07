import Star from "./Star";
import {useState} from 'react'
import PropTypes from "prop-types";

StarRating.propTypes={
     maxRating: PropTypes.number,
     defaultRating:PropTypes.number,
     color:PropTypes.string,
     size:PropTypes.number,
     message:PropTypes.array,
     className:PropTypes.string,
}

function StarRating({maxRating=5,color="#fcc419",size=48,className="" ,message=[],defaultRating=0,onSetRating}){
    
    const [rating,setRating]=useState(defaultRating);
    const [tempRating,setTempRating]=useState(0)
    const containerStyle={
        display:"flex",
        alignItems:"center",
        gap:"16px",
    };
    const starConainerStyle={
        display:"flex",
    }
    const textStyle={
        lineHeight:"1",
        margin:"0",
        color,
        fontSize:`${size/1.5}px`,
    }
    return(
        <div style={containerStyle} className={className}>
            <div style={starConainerStyle}>
                {Array.from({length:maxRating},(_,i)=>
                <Star 
                key={i} 
                onRate={()=>{setRating(i+1);
                if (onSetRating) onSetRating(i + 1);}} 
                full={tempRating? tempRating>=i+1:rating>=i+1}
                onHoverIn={()=>setTempRating(i+1)}
                onHoverOut={()=>setTempRating(0)}
                color={color}
                size={size}
                />)}
            </div>
            <p style={textStyle}>{message.length===maxRating?message[tempRating?tempRating-1:rating-1]:rating||tempRating||""}</p>
        </div>
    )
}


export default StarRating;