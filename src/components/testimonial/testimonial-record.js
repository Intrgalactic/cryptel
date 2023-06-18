import { TestimonialUserBox } from "./testimonial-user-box";
import { TestimonialUserLiteral } from "./testimonial-user-literal";

export function TestimonialRecord({user,rating}) {
    return (
        <section className="testimonial-record">
            <TestimonialUserBox user={user} rating={rating}/>
            <TestimonialUserLiteral/>
        </section>
    )
}