import React from "react"
import Layout from "../components/Layout"
import DocumentMeta from "react-document-meta"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "open-iconic/font/css/open-iconic-bootstrap.css"
import "../styles/global.css"


export default function Home() {
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
      <Layout>
        Home (Placeholder)
      </Layout>
    </DocumentMeta>
  )
}
