import notFound from 'assets/images/404.svg';

export default function NotFound() {
    function goBack() {
        window.open('/',"_self");
    }
    return (
        <main id="not-found-page">
            <img src={notFound} alt="not found" id="not-found"></img>
            <h1>Page not found</h1>
            <button onClick={goBack}>Back to the latest page</button>
        </main>
    )
}