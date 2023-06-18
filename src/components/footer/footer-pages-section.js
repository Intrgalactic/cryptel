import { Link } from "react-router-dom"
export function FooterPagesSection() {
    return (
        <div className="footer-pages-section">
            <div className="pages">
                <h1>First Column</h1>
                <Link to='/'>First Page</Link>
                <Link to='/'>Second Page</Link>
                <Link to='/'>Third Page</Link>
            </div>
        </div>
    )
}