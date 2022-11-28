import React from "react";

export default function Footer() {
    return (
        <footer className="pb-0 mb-0 pt-3 border-top">
            <div className="row justify-content-around">
              <div className="col-md offset-md-1">
                <a className="footer-link" href="/home#behind-the-music"><h5>About</h5></a>
                <ul className="list-unstyled text-small">
                  <a className="footer-link" href="/home#collaborators"><li>Collaborators</li></a>
                  <a className="footer-link" href="/home#sponsors"><li>Sponsors</li></a>
                  <a className="footer-link" href="/home#contact"><li>Contact us</li></a>

                </ul>
              </div>
              <div className="col-md">
                <a className="footer-link" href="/getting_started#how-to-use"><h5>How to use</h5></a>
              </div>
              <div className="col-md">
                <a className="footer-link" href="/home#report-a-bug"><h5>Report a bug</h5></a>
              </div>
            </div>
          </footer>
    )
}