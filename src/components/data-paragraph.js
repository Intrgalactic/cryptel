
export function DataParagraph({image,data}) {
    return (
        <div className="data-paragraph">
            <img src={image} alt="data"></img>
            <p>{data}</p>
        </div>
    )
}