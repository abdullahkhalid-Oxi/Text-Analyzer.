import { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import './App.css'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <>Helo</>
//   },
//   {
//     path: "/about",
//     element: <><Textform />  </>
//   },
// ])


function App(props) {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container textform">
        {/* <Navbar title="Heomi" name="Ahmed" /> */}
        <Textform string="PLACE WHERE MAGIC BEGINS" />
      </div>
    </>
  );
}

export default App;
