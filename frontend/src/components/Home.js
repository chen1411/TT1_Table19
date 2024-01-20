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
    const getItineraries = async () => {
        const itinerariesFromServer = await fetchItineraries();
        setItineraries(itinerariesFromServer);
      };

      getItineraries();

    // setItineraries([
    //   {
    //     id: 1,
    //     title: "holiday",
    //     country_name: "singapore",
    //     budget: 1000,
    //     destinations: [
    //       { id: 1, name: "uss", notes: "theme park", cost: 70 },
    //       { id: 2, name: "garden by the bay", notes: "park", cost: 0 },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     title: "grad trip",
    //     country_name: "south korea",
    //     budget: 2000,
    //     destinations: [
    //       { id: 1, name: "lotte world", notes: "theme park", cost: 50 },
    //     ],
    //   },
    // ]);
  }, []);

  const fetchItineraries = async () => {
    const res = await fetch("http://localhost:5000/itinerary");
    const data = await res.json();

    return data;
  };

  const deleteItinerary = async (id) => {
    console.log(id);
    // call delete  itinerary endpoint, input: user id from local storage
    try {
      const res = await fetch(
        `http://localhost:5000/itinerary_destination/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log("");
      alert("Error in deleting itinerary, please try again!")
    }

    // setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
  };

  return (
    // style={{position: 'relative', top: '75px'}}
    <div style={{ backgroundColor: "black" }}>
      {/* {userData.user 
            ? ( */}
      <div className="w-75 mx-auto">
        <Stack direction="horizontal" gap={0} className="py-3">
          <h1 className="text-light">
            <u>My Itineraries</u>
          </h1>
          <h1 className="ms-auto">
            <Link to="/signup">
              <i className="bi bi-plus-circle text-white"></i>
            </Link>
          </h1>
        </Stack>

        <Accordion defaultActiveKey="0">
          {itineraries.map((itinerary) => (
            <Accordion.Item eventKey={itinerary.id}>
              <Accordion.Header>
                <Stack gap={0}>
                  <div className="pe-3 pb-2">
                    <Stack direction="horizontal" gap={0}>
                      <h3>{itinerary.title}</h3>
                      {/* change colours and update link */}
                      <h3 className="ms-auto pe-3">
                        <Link to="/login">
                          <i className="bi bi-pencil-square text-secondary"></i>
                        </Link>
                      </h3>
                      <h3>
                        <i
                          className="bi bi-trash text-danger"
                          onClick={() => deleteItinerary(itinerary.id)}
                        ></i>
                      </h3>
                    </Stack>
                  </div>
                  <div className="pe-3">
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
                <ul>
                  {itinerary.destinations.map((destination) => (
                    <>
                      <li key={destination.id}>
                        <Stack direction="horizontal" gap={0}>
                          <div className="">{destination.name}</div>
                          <div className="ms-auto">
                            Cost: ${destination.cost}
                          </div>
                        </Stack>
                      </li>
                      <span>{destination.notes}</span>
                    </>
                  ))}
                </ul>
                {/* <ListGroup>
                  {itinerary.destinations.map((destination) => (
                    <ListGroup.Item key={destination.id}><li>{destination.name}</li>
                    <p>{destination.notes}</p></ListGroup.Item>
                  ))}
                </ListGroup> */}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* <Feed /> */}
      </div>
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
