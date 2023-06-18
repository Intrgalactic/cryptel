export function Benefit({ type, image, description }) {
    return (
        <div className="benefit-box">
            <h2>{type}</h2>
            <img src={image} alt="benefit" />
            <p>{description}</p>
        </div>
    )
}