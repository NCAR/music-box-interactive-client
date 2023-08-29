import React from "react";
import { Link } from "gatsby";

const SpeciesInstruction = () => {
    return (
        <p className="lead-muted p-2">Select a chemical species from the list to view/edit its properties, or add a new chemical species to the mechansim. The chemical species you add here will be available to participate in <Link to="mechanism/reactions">reactions</Link> and can be include in the <Link to="conditions">model conditions</Link>.</p>
    )
}

export default SpeciesInstruction;