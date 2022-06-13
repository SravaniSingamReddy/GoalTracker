import React from 'react';
import { Link } from "react-router-dom";

const NavBarP =()=>{

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <Link to="/" className="navbar-brand">Goals Tracker</Link>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link active">Home</Link>
                <Link to="/admin" className="nav-item nav-link">Profile</Link>
                </div>
            <div className="navbar-nav ms-auto">
            {
                    localStorage.getItem("token")?
                    <>
                    <Link to="/" className="nav-item nav-link" onClick={()=>{localStorage.removeItem("token");console.log("hello logout")}}>Logout </Link>                   
                    </>
                :
                <>
                    
                 <Link to="/register" className="nav-item nav-link navitem">Sign Up</Link>
                <Link to="/login" className="nav-item nav-link navitem"> Login </Link>                                                        
            
                </>
                }


                </div>
        </div>
    </div>
</nav>

</div>
    );
 
}
export default NavBarP;
