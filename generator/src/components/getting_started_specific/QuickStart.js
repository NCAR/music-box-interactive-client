import React, {useState, useEffect} from "react";
import { navigate } from 'gatsby';
import MethodButton from "./MethodButton";
import Examples from "./Examples"
import LoadFile from "./LoadFile"
import utils from "../../utils"

export default function QuickStart() {
    const [method, setMethod] = useState(utils.methods.NONE_SELECTED)
    // toggle the component related to the method selected
    const setMethodWrapper = (method_selected) => {
        if (method !== method_selected) {
            setMethod(method_selected)
        } else {
            setMethod(utils.methods.NONE_SELECTED)
        }
    }

    useEffect(() => {
        if (method === utils.methods.START_FROM_SCRATCH) {
            navigate('/mechanism')
        }
        console.log(method)
    }, [method])

    return (
        <section className="jumbotron text-center">
            <div className="container">
                <h1 className="jumbotron-heading ">Getting Started</h1>
                <p className="lead text-muted">
                    To get started with MusicBox, you can try out one of our example configurations, start a new mechanism from scratch, or load a configuration file you saved from a previous run.
                    For a collection of pre-made stratospheric <br />
                    and tropospheric configurations, visit <a target="_blank" href="https://github.com/NCAR/musicbox_curriculum_exercises" rel="noreferrer">this respository</a> 
                </p>
                <p>
                    <MethodButton clickHandler={() => setMethodWrapper(utils.methods.USE_TEMPLATE)}>Select example</MethodButton>
                    <MethodButton clickHandler={() => setMethodWrapper(utils.methods.START_FROM_SCRATCH)}>Start from scratch</MethodButton>
                    <MethodButton clickHandler={() => setMethodWrapper(utils.methods.UPLOAD_CONFIG)}>Upload configuration file</MethodButton>
                    {method === utils.methods.USE_TEMPLATE ? <Examples /> : null}
                    {method === utils.methods.UPLOAD_CONFIG ? <LoadFile /> : null}
                </p>
            </div>
        </section>
    )
}
