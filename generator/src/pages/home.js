import React from "react"
import Layout from "../components/Layout"
import EmptySpace from "../components/EmptySpace"
import About from "../components/home_specific/About"
import BehindTheMusic from "../components/home_specific/BehindTheMusic"
import Collaborators from "../components/home_specific/Collaborators"
import Sponsors from "../components/home_specific/Sponsors"
import Developers from "../components/home_specific/Developers"
import Contact from "../components/home_specific/Contact"
import gapImg from "../assets/image_ammann.jpg"
import wrapApp from "../store/WrapWithProvider";

export default function Home() {
  const gapStyle = {
    backgroundImage: `url(${gapImg})`,
    height: "300px"
  }

  return wrapApp({ element: (
    <Layout>
      <main role="main">
        <About />
        <EmptySpace height={150}/>
        <BehindTheMusic />
        <div class="about-section hero-img" style={gapStyle}></div>
        <Collaborators />
        <Sponsors />
        <Developers />
        <Contact />
        <div class="pt-4 px-2">
          <p><small>
            Background images: Copyright University Corporation for Atmospheric Research (UCAR). By Carlye Calvin and Caspar Ammann, licensed under a Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License, via OpenSky.
          </small></p>
        </div>
      </main>
    </Layout>
  )});
}
