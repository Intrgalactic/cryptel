import { Link } from "react-router-dom";

export function JourneySelectBox({heading,image,button,redirect,handleClick}) {
    return (
        <div className="journey-select-box">
            <h4>{heading}</h4>
            <img src={image} alt="wallet"/>
            <button onClick={handleClick}><Link to={redirect}>{button}</Link></button>
        </div>
    )
}