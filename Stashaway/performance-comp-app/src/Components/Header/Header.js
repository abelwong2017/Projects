import React from 'react';
import './Header.css';
import logo from './stashaway.png'

export default function Header(props) {
        
        return (
            <div className='Header' >
                <div className="logoSegment">
                    <img src={logo} className="logo" alt="website logo" height="80" margin="10"></img>
                </div>
                <div>
                    <ul> 
                        <li> <a href="test">Home </a></li>
                        <li> <a href="test">Manage Deposits </a></li>
                        <li> <a href="test">Refer a friend </a></li>
                        <li> <a href="test">Support </a></li>
                        <li > <a href="test">My Profile </a></li>
                    </ul>
                </div>

                <p> General Investing </p>

                <div>
                    <ul className="investingDetails"> 
                        <li> <a className="activeHeader" href="test">Overview </a></li>
                        <li> <a href="test">Assets </a></li>
                        <li> <a href="test">Projection</a></li>
                        <li> <a href="test">About portfolio</a></li>
                    </ul>
                </div>
            </div>
        )
    
}