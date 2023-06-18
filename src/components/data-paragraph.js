
export function DataParagraph({image,data}) {
    return (
        <div className="data-paragraph">
            <img src={image}></img>
            <p>{data}</p>
        </div>
    )
}