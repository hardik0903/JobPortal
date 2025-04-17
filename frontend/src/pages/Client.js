import React, { useEffect } from "react";
import ClientEdit from "../components/ClientEdit";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ClientApplicationList from "../components/ClientApplicationList";
import "../styles/Client.css";

function Client() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/");
    } else if (token === "7_DErLsNtMgUCSE_FG0x66dWqWPsP5SJ") {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="client-page">
        <ClientEdit />
        <ClientApplicationList />
      </div>
      <Footer />
    </div>
  );
}

export default Client;
