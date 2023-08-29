import React, { useState } from "react"
import { connect } from 'react-redux'
import Layout from "../components/Layout";
import {BasicConfigurationTab, InitialConditionsTab, EvolvingConditionsTab} from "../components/Conditions";

function Conditions(props) {
  const BASIC = 0
  const INITIAL = 1
  const EVOLVING = 2
  const [tab, setTab] = useState(BASIC)

  const tabSelected = "btn btn-primary btn-ncar-active"
  const tabNotSelected = "btn btn-secondary"

  return (
    <Layout>
      <main role="main">
        <div className="container text-center">
          <div className="navbox pt-2">
            <button className={tab === BASIC ? tabSelected : tabNotSelected} onClick={() => setTab(BASIC)}>
              Basic
            </button>
            <button className={tab === INITIAL ? tabSelected : tabNotSelected} onClick={() => setTab(INITIAL)}>
              Initial
            </button>
            <button className={tab === EVOLVING ? tabSelected : tabNotSelected} onClick={() => setTab(EVOLVING)}>
              Evolving
            </button>
          </div>
        </div>
        {tab === BASIC    ? <BasicConfigurationTab /> : null}
        {tab === INITIAL  ? <InitialConditionsTab />  : null}
        {tab === EVOLVING ? <EvolvingConditionsTab /> : null}
      </main>
    </Layout>
  );
}

export default connect()(Conditions)

