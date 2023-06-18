
export function BalanceBox({heading, image, data}) {
    return (
        <>
            <img src={image} alt="balance" />
            <div className="balance-box" >
                <h1>{heading}</h1>
                <p>{data}</p>
            </div>
        </>
    )
}