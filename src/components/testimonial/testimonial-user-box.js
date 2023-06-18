import userLogo from 'assets/images/user-logo.png';
import { TestimonialUserData } from './testimonial-user-data';

export function TestimonialUserBox({user,rating}) {

    return (
        <div className="testimonial-user-box">
            <img src={userLogo} alt="user" className="user-image"/>
            <TestimonialUserData user={user} rating={rating}/>
        </div>
    )
}