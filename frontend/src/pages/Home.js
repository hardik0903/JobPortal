import React, { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import "../styles/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [adsData, setAdsData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch ads
    fetch("http://localhost:3001/api/advertisement")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received adsData:", data);

        // If response is an object with an ads array inside, use that
        if (Array.isArray(data)) {
          setAdsData(data);
        } else if (Array.isArray(data.ads)) {
          setAdsData(data.ads);
        } else {
          console.warn("adsData is not an array:", data);
          setAdsData([]);
        }
      })
      .catch((error) => console.error("Erreur (ads):", error));

    // Fetch user data if token is present and valid
    const token = localStorage.getItem("userToken");
    if (token && token !== "7_DErLsNtMgUCSE_FG0x66dWqWPsP5SJ") {
      fetch("http://localhost:3001/api/client/Client", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Erreur (user):", error));
    }
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="container_advertisements">
        {Array.isArray(adsData) && adsData.length > 0 ? (
          adsData.map((data, i) => (
            <Advertisement
              key={i}
              adID={data.id}
              companyName={data.companyName}
              title={data.title}
              contract={data.contract}
              location={data.location}
              description={data.description}
              salary={data.salary}
              date={data.postDate}
              userData={userData}
            />
          ))
        ) : (
          <p className="no-ads-msg">No advertisements available right now.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
