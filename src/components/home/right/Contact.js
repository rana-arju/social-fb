import React from 'react';
import {Link} from "react-router-dom"
const Contact = ({user}) => {
    return (
        <Link to={`/profile/${user.username}`} className='contact hover3'>
            <div className='contact_img'>
                <img src={user?.picture} alt="" />
            </div>
            <span>{user?.first_name} {user?.last_name}</span>
        </Link>
    );
};

export default Contact;