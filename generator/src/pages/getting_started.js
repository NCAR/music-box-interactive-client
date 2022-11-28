import React from "react"
import Layout from "../components/Layout"
import EmptySpace from "../components/EmptySpace"
import QuickStart from "../components/getting_started_specific/QuickStart"
import UsageInfo from "../components/getting_started_specific/UsageInfo"

export default function GettingStarted() {
  return (
    <Layout>
        <main role="main">
            <QuickStart />
            <EmptySpace height={0} />
            <UsageInfo />
        </main>
    </Layout>
  )
}