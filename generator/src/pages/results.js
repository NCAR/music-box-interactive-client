import React from "react";
import Layout from "../components/Layout"
import { ThreeCircles } from 'react-loader-spinner';

const Results = () => {

  return (
    <Layout>
      <div style={{display: `flex`, justifyContent: `center`, margin: `auto`}}>
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </Layout>
  )
}

export default Results