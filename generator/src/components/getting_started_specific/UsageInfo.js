import React from "react";

export default function UsageInfo() {
    return (
        <section id="how-to-use">
            <div className="container">
                <div className="p-3 text-center">
                    <h1 className="pb-2 display-6">How to use MusicBox</h1>
                    <p className="lead">
                        <strong className="about-heading">Step 1.</strong> To start using MusicBox, select one of the starting options above. Each of these starting options is described in more detail below.
                    </p>
                </div>

                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 fw-normal">Start from scratch</h4>
                            </div>
                            <div className="card-body">
                                <p>
                                    This option allows you to build a simulation from the ground up. There are no species, no reactions, and only minimal conditions. You will need to add at least one reaction before you run a simulation.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 fw-normal">Select example</h4>
                            </div>
                            <div className="card-body">
                                <p>
                                    Examples are fully functional MusicBox configurations. You can select an example and immediately run the simulation. Examples are useful for learning how to set up a MusicBox simulation.
                                </p>
                            </div>
                        </div>
                    </div>

                    
                <div className="col">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 fw-normal">Load configuration</h4>
                        </div>
                        <div className="card-body">
                            <p>
                                If you have previously saved a MusicBox configuration from the <a href="/conditions/review.html">review</a> section, you can reload it with this starting option. MusicBox configuration files have a .zip extension and contain the mechanism and conditions for a simulation. Once loaded, you can modify the configuration, re-save it, and/or run the simulation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            
                <div className="p-3 text-center">
                  <p className="lead">
                  <strong className="about-heading">Step 2.</strong> Navigate to the <a href="/mechanism/species.html">Chemical species</a> page in the Mechanism section to add or modify the set of chemical species in the system. At minimum, there will be a single species named 'M' that represents any chemical species, and can be used for third-body reactions. Any number of species can be added to the set by clicking the 'Add' button above the list of species. Clicking on a species in the list will allow you to edit its properties. Some reactions will require specific species properties to be specified, so be sure to set them here.
                  </p>
                  <p className="lead">
                  <strong className="about-heading">Step 3.</strong> Navigate to the <a href="/mechanism/reactions.html">Reactions</a> page in the Mechanism section to add or modify the set of reactions in the system. Any chemical species set in Step 2 will be available to participate in a reaction. In addition to chemical reactions, emissions and loss of chemical species can be included in the set of reactions. Add a reaction by clicking the 'Add' button above the list of reactions, or modify an existing reaction by clicking on it in the list of reactions. At least one reaction must be present to run a simulation.
                  </p>
                  <p className="lead">
                  Several types of reactions include a <code>MUSICA name</code> property. This is a unique name that you choose to identify this reaction in other parts of MusicBox. For example, setting the <code>MUSICA name</code> property of a photolysis reaction, allows you to set the photolysis rate constant in the <a href="/conditions/initial">initial</a> or <a href="/conditions/evolving">evolving</a> conditions pages.
                  </p>
                  <p className="lead">
                  <strong className="about-heading">Step 4.</strong> Navgiate to the <a href="/conditions.html">Conditions</a> section to set model options and physical/chemical conditions for the simulation, and download the MusicBox configuration for future use. Each page of the conditions section is described below.
                  </p>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mb-3 text-center">
                  <div className="col">
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 fw-normal"><a href="conditions/options.html">General</a></h4>
                      </div>
                      <div className="card-body">
                        <p>
                        General model options: total simulation time, time step, output options, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 fw-normal"><a href="conditions/initial.html">Initial</a></h4>
                      </div>
                      <div className="card-body">
                        <p>
                        Starting conditions for chemical species concentrations, environmental conditions, and reaction rates/rate constants for reactions with a <code>MUSICA name</code>. These conditions will remain at the values you set here until they are modified by the chemical solver (species concentrations) or updated from the <a href="conditions/evolving">evolving conditions</a> you specify. You can enter the conditions directly, or load them from a text file following the instructions on the <a href="conditions/initial">initial conditions</a> page.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 fw-normal"><a href="conditions/evolving.html">Evolving</a></h4>
                      </div>
                      <div className="card-body">
                        <p>
                        This section allows you to specify species concentrations, environmental conditions, and reaction rates/rate constants for reactions with a <code>MUSICA name</code> that vary during the simulation. For example, these could include diurnal profiles for photolysis rate constants, or emissions rates that vary during the course of the simulation. Evolving conditions can be set from text or NetCDF files following the instructions on the <a href="conditions/evolving">evolving conditions</a> page.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 fw-normal"><a href="conditions/review.html">Review</a></h4>
                      </div>
                      <div className="card-body">
                        <p>
                        The final step of the MusicBox configuration. This page allows you to review the raw MusicBox configuration data and download the configuration for future use.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <p className="lead">
                  <strong className="about-heading">Step 4.</strong> Click the green 'Run Model' button to run the model with the mechanism and conditions you set in the previous steps. Once the model run is finished, you will see options to plot the results and download the model output for off-line analysis. If you see an error message, you may have to modify your configuration and try again.
                  </p>
                </div>
              </div>
            </section>
    )
}
