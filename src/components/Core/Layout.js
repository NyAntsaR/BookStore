import React from "react";
import Menu from "./Menu";
import "../../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="description" style={{height: '100px', margin : '10px', padding: '15px', backgroundColor:'#BCB0BA', textAlign: 'center'}}>
            <h2>{title}</h2>
            <p className="description">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
