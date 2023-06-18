
export function TestimonialUserData({user,rating}) {
    return (
        <div className="testimonial-user-data">
            <p>User: {user}</p>
            <img src={rating} alt="rating score" className="rating" />
        </div>
    )
}