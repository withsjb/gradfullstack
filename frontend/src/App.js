import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Secret from "./pages/Secret";
import "react-toastify/dist/ReactToastify.css";
import Problem from "./pages/problem";
import Page2 from "./pages/page2";
import Mainpage from "./pages/mainpage";
import Roadmap from "./pages/roadmap";
import Linuxstudy from "./pages/Linuxstudy";
import Roadmapdetail from "./component/Roaddetail/Roaddetail";
import Roaddetaila from "./component/Roaddetail/Roaddetaila";
import Roaddetailb from "./component/Roaddetail/Roaddetailb";
import Roaddetailc from "./component/Roaddetail/Roaddetailc";
import Roaddetaild from "./component/Roaddetail/Roaddetaild";
import Navbar from "./component/Navbar";
import Slidemain from "./component/Slidemain";
import Modal from "./component/Modal";
import Book from "./component/Book";
import Libook from "./component/Libook";
import Modalknow from "./component/Modalknow";
import Side from "./component/Side";
import Page from "./component/Page";
import Select from "./pages/select/select";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Secret />} />
        <Route path="/mainpage" element={<Mainpage />}></Route>
        <Route path="/problem" element={<Problem />}></Route>
        <Route path="/page2" element={<Page2 />}></Route>
        <Route path="/linuxstudy" element={<Linuxstudy />}></Route>
        <Route path="/roadmap" element={<Roadmap />}></Route>
        <Route path="/roadmapdetail" element={<Roadmapdetail />}></Route>
        <Route path="/roaddetaila" element={<Roaddetaila />}></Route>
        <Route path="/roaddetailb" element={<Roaddetailb />}></Route>
        <Route path="/roaddetailc" element={<Roaddetailc />}></Route>
        <Route path="/roaddetaild" element={<Roaddetaild />}></Route>
        <Route path="/header" element={<Navbar />}></Route>
        <Route path="/slidemain" element={<Slidemain />}></Route>
        <Route path="/Modal" element={<Modal />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/libook" element={<Libook />}></Route>
        <Route path="/modalknow" element={<Modalknow />}></Route>
        <Route path="/side" element={<Side />}></Route>
        <Route path="/page" element={<Page />}></Route>
        <Route path="/select" element={<Select />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
