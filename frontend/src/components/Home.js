import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  // const { userData } = useContext(UserContext);

  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    setItineraries([
      {
        id: 1,
        title: "holiday",
        country_name: "singapore",
        budget: 1000,
        destinations: [{ name: "uss", notes: "theme park", cost: 70 }],
      },
      {
        id: 2,
        title: "grad trip",
        country_name: "south korea",
        budget: 2000,
        destinations: [{ name: "lotte world", notes: "theme park", cost: 50 }],
      },
    ]);
  }, []);

  return (
    <div>
      {/* {userData.user 
            ? ( */}
      <>
        <h1>My Itineraries</h1>
        <Accordion defaultActiveKey="0">
          {itineraries.map((itinerary) => (
            <Accordion.Item eventKey={itinerary.id}>
              <Accordion.Header>
                <Stack gap={0}>
                  <div className="pe-2 pb-2">
                    <Stack direction="horizontal" gap={0}>
                      {/* increase font size for this chunk */}
                      <b className="">{itinerary.title}</b>
                      {/* change colours */}
                      <div className="ms-auto pe-2">
                        <i class="bi bi-pencil-square"></i>
                      </div>
                      <div className="">
                        <i class="bi bi-trash"></i>
                      </div>
                    </Stack>
                  </div>
                  <div className="pe-2">
                    <Stack direction="horizontal" gap={0}>
                      <div className="">{itinerary.country_name}</div>
                      <div className="ms-auto">Budget: ${itinerary.budget}</div>
                    </Stack>
                  </div>
                </Stack>
              </Accordion.Header>
              <Accordion.Body>
                {/* margin bottom doesnt work */}
                <b className="mb-3">Destinations:</b>
                <ListGroup>
                {itinerary.destinations.map((destination) => (
                  <ListGroup.Item>{destination.name}</ListGroup.Item>
                ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* <Feed /> */}
      </>
      {/* ) 
            : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )} */}
    </div>
  );
}

export default Home;
