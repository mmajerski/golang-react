import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  useEffect(() => {
    props.setPathname(window.location.pathname);
  }, []);

  return (
    <div>{props.pathname === "/" ? <Link to="/create">Add New</Link> : ""}</div>
  );
};

export default Nav;
