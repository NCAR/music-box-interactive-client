import React from "react"
import Layout from "../components/Layout"
import EmptySpace from "../components/EmptySpace"
import { QuickStart, UsageInfo } from "../components/GettingStarted"

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