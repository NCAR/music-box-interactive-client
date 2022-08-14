import React from "react"
import "react-bootstrap/dist/react-bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "open-iconic/font/css/open-iconic-bootstrap.css"
import "../styles/global.css"

import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function Index() {
  useEffect(() => {
    navigate('/home');
  }, []);
  return null;
};
