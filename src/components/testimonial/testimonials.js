import { TestimonialHeading } from "./testimonial-heading";
import { TestimonialImage } from "./testimonial-image";
import { TestimonialRecord } from "./testimonial-record";
import rating from 'assets/images/rating.png';
export function Testimonials() {
    return (
        <section id="testimonials">
            <div id="testimonials-intro">
                <TestimonialHeading />
                <TestimonialImage />
            </div>
            <section id="testimonials-records">
                <TestimonialRecord user="Helixo" rating={rating} />
                <TestimonialRecord user="Kerplunk" rating={rating} />
                <TestimonialRecord user="Klabe21" rating={rating} />
            </section>
        </section>
    )
}