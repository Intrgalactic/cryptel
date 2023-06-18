
export function NewsletterForm() {
    return (
        <div id="newsletter-form">
            <h4>SUBSCRIBE TO OUR NEWSLETTER
                AND GET A FREE NFT</h4>
            <input type="text" required placeholder='Enter Your E-mail' />
            <label>
                    <input type="checkbox" required/>
                By checking this box, you are agreeing to our terms of service.
            </label>
            <button type="submit">SUBMIT</button>
            <p>To get a free NFT, you need to create a wallet on your website</p>
        </div>
    )
}