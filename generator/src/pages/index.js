import React from "react"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "open-iconic/font/css/open-iconic-bootstrap.css"
import "../styles/global.css"

import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default () => {
  useEffect(() => {
    navigate('/home');
  }, []);
  return null;
};
