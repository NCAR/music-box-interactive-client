import React from "react";
import Header from "./Header"
import NavBar from "./NavBar"
import Footer from "./Footer"

export default function Layout({ children }) {
    var layoutClasses = ["layout"]
    var layoutClassName = layoutClasses.join(' ')

    var contentClasses = ["content", "col-md-9 ms-sm-auto col-lg-10 px-0"]
    var contentClassName = contentClasses.join(' ')

    return (
        <div className={ layoutClassName }>
            <Header />
            <NavBar />
            <div className="container-fluid">
                <div className="row">
                    <div className={ contentClassName }>
                        { children }
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}