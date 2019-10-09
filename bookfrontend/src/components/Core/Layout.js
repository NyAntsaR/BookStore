// Layout dynamically render content depending on the active page
import React from 'react'
import Menu from "./Menu"
import "../../styles.css";

const Layout = ({ title="Title", description="Description", className, children }) => (
    <div style={{fontFamily: 'Big Shoulders Display'}}>
        <Menu />
        <div className="headerPage">
            <h2 className="description container" style={{ textAlign: 'center', marginTop: '15px'}}>{ title }</h2>
            <p className="description" style={{ textAlign: 'center', marginTop: '10px'}}>
                { description }
            </p>
        </div>

        <div className={ className }>
            { children }
        </div>
    </div>
)

export default Layout;