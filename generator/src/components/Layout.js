import React from "react";
import Header from "./Header"
import NavBar from "./NavBar"
import Footer from "./Footer"
import DocumentMeta from "react-document-meta"

export default function Layout({ children }) {
    var layoutClasses = ["layout"]
    var layoutClassName = layoutClasses.join(' ')

    var contentClasses = ["content", "col-md-9 ms-sm-auto col-lg-10 px-0"]
    var contentClassName = contentClasses.join(' ')
    
    const meta = {
        title: "MusicBox",
        meta: {
          charset: "UTF-8",
          name: "viewport",
          content: "idth=device-width, initial-scale=1"
        }
      }

    return (
        <DocumentMeta {...meta}>
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
        </DocumentMeta>
    )
}