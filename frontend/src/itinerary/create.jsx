import React, {useState, useEffect} from 'react';
import { Form, Row, Button, Alert, Container, Col, Badge } from 'react-bootstrap';

const ItineraryCreate = () => {
  const userData = localStorage.getItem('user');

  const [itinerary, setItinerary] = useState({countryId: 1});
  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedDest, setSelectedDest] = useState([]);
  const [alert, setAlert] = useState({});

  console.log(destinations)

  console.log(itinerary);

  useEffect(() => {
    const fetchAllData = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
      const destinationData = await fetchReleventDestinations();
      setDestinations(destinationData);
    }

    fetchAllData();
  }, [])

  const fetchCountries = async () => {
    // Replace with fetch all countries API call.
    const countriesData = [{id: 1, name: "Singapore"}, {id: 2, name: "Malaysia"}]
    return countriesData;
  }

  const fetchReleventDestinations = async (countryId) => {
    // Fetch all destinations in country
    const destinations = [
      {name: 'Test Destination', cost: 70, notes: "This is a description", countryId: 1, id: 1},
      {name: 'Test Destination2', cost: 70, notes: "This is a description2", countryId: 1, id: 2},
      {name: 'Test Destination3', cost: 70, notes: "This is a description3", countryId: 2, id: 3}];
    const countryDestinations = destinations.filter((d) => d.countryId === itinerary.countryId);
    return countryDestinations;
  }

  const handleInputChange = (event) => {
    let updatedItinerary;
    if (event.target.id === 'countryId') {
      // Should reset selected itineraryDestinations if country is changed.
      updatedItinerary = {...itinerary, itineraryDestinationsIds: [], [event.target.id]: Number(event.target.value)};
      setDestinations(destinations.filter((d) => d.countryId === updatedItinerary.countryId))
      console.log(destinations.filter((d) => d.countryId === updatedItinerary.countryId))
    } else if (event.target.id === 'budget') {
      updatedItinerary = {...itinerary, [event.target.id]: Number(event.target.value)}
    } else {
      updatedItinerary = {...itinerary, [event.target.id]: event.target.value}
    }
  
    setItinerary(updatedItinerary);
  }

  const selectDestination = (event) => {
    //check if its default
    console.log(event.target.value)
    const id = event.target.value
    if (id!=='Open this select menu'){
      // add to itinerary.itineraryDestination
      const currDest = destinations.find((destination) => destination.id === Number(id))
      console.log(destinations)
      const list = [...selectedDest];
      list.push(currDest)
      const updatedList = list;
      setSelectedDest(updatedList)
      //remove from destinations
      const filtered = destinations.filter((destination) => destination.id !== Number(id))
      setDestinations(filtered)
      console.log(updatedList)
      event.target.value = 'Open this select menu'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Create!')

    const updatedItinerary = {}
    if (updatedItinerary) {
      setAlert({message: 'Successfully created the itinerary.', type: 'success'})
      // Redirect to homepage.
      return;
    } else {
      setAlert({message: 'An error occurred while creating the itinerary. Please refresh the page and try again.', type: 'danger'})
      return;
    }

    // Make request
    // Redirect
  }


  return (
  <Container>    
    {alert.message && <Alert key={alert.type} variant={alert.type} className='my-2'>{alert.message}</Alert>}
    <h1 className='mt-1'>Create New Itinerary</h1>
    <Form onSubmit={handleSubmit} className='m-3'>
      <Row className='mb-3' rows={3}>
        <Form.Label>Itinerary Title</Form.Label>
        <Form.Control required type='text' placeholder='Enter Itinerary Title' onChange={handleInputChange} id='name' value={itinerary.title}/>
      </Row>
      <Row className='mb-3' rows={3}>
        <Form.Label>Country</Form.Label>
        <Form.Select placeholder="Select a country" onChange={handleInputChange} id='countryId' value={itinerary.countryId}>
          {countries.map((country) => {
            return (<option value={country.id}>{country.name}</option>)
          })}
        </Form.Select>
      </Row>
      <Row className='mb-3' rows={3}>
        <Form.Label>Itinerary Budget</Form.Label>
        <Form.Control required type='number' placeholder='Enter Budget' onChange={handleInputChange} id='cost' value={itinerary.budget}/>
      </Row>
      <Row className='mb-3'>
        <Form.Label>Itinerary Destinations</Form.Label>
        <Form.Select aria-label="Default select example" onChange={selectDestination}>
          <option>Open this select menu</option>
          {destinations.map((dest) => (
            <option value={dest.id}>{dest.name}</option>
          ))}
        </Form.Select>
        {selectedDest && selectedDest.map((itinDest) => (
          <Col xs={3}><Badge bg='secondary' style={{display: 'flex'}}>{itinDest.name}</Badge></Col>
        ))}

      </Row>
      <Row>
        <Col>
          <Button className='mr-2' type="submit">Create Itinerary</Button>
        </Col>
      </Row>
    </Form>
  </Container>
  )
}

export default ItineraryCreate;