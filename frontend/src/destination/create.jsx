import React, {useState, useEffect} from 'react';
import { Form, Row, Button, Alert, Col, Container } from 'react-bootstrap';
import axios from "axios";


const DestinationCreate = () => {
  const [destination, setDestination] = useState({});
  const [countries, setCountries] = useState([]);
  const [alert, setAlert] = useState({});
  console.log(destination)

  useEffect(() => {
    // Fetch list of available countries + ids.
    axios.interceptors.request.use(
      async function (config) {
        // Check if accessToken is present
          const sessionCookie = localStorage.getItem('auth-token')
    
          if (sessionCookie !== null && sessionCookie !== undefined) {
            config.headers.Authorization = `Bearer ${sessionCookie}`
          }
    
          return config
        },
        async function (error) {
          return await Promise.reject(error)
        }
      )

      const countriesData = axios.get('localhost:5000/countries');
    
    setCountries(countriesData);
  }, [])

  const handleInputChange = (event) => {
    let updatedDestination;
    if (event.target.id === 'cost') {
      updatedDestination = {...destination, [event.target.id]: Number(event.target.value)}
    } else {
      updatedDestination = {...destination, [event.target.id]: event.target.value}
    }
  
    setDestination(updatedDestination);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.interceptors.request.use(
    async function (config) {
      // Check if accessToken is present
        const sessionCookie = localStorage.getItem('auth-token')
  
        if (sessionCookie !== null && sessionCookie !== undefined) {
          config.headers.Authorization = `Bearer ${sessionCookie}`
        }
  
        return config
      },
      async function (error) {
        return await Promise.reject(error)
      }
    )
    const createDestination = {
      country_id: destination.countryId,
      cost: destination.cost,
      name: destination.name,
      notes: destination.notes
    }
    
    const createdDestination = axios.post("http://localhost:5000/destinations", createDestination);
    if (createdDestination) {
      setAlert({message: 'Please ensure that the destination name, country and cost is selected before submitting.', type: 'success'})
      return;
    } else {
      setAlert({message: 'An error occurred while creating the destination. Please refresh the page and try again.', type: 'danger'})
      return;
    }
  }

  return (
    <Container>
      {alert.message && <Alert key={alert.type} variant={alert.type}>{alert.message}</Alert>}
      <h1 className='mt-1'> Create a new destination </h1>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3' rows={3}>
          <Form.Label>Destination Name</Form.Label>
          <Form.Control required type='text' placeholder='Enter Destination Name' onChange={handleInputChange} id='name' value={destination.name}/>
        </Row>
        <Row className='mb-3' rows={3}>
          <Form.Label>Country</Form.Label>
          <Form.Select placeholder="Select a country" onChange={handleInputChange} id='countryId' value={destination.countryId}>
            {countries.map((country) => {
              return (<option value={country.id}>{country.name}</option>)
            })}
          </Form.Select>
        </Row>
        <Row className='mb-3' rows={3}>
          <Form.Label>Destination Cost</Form.Label>
          <Form.Control required type='number' placeholder='Enter Destination Cost' onChange={handleInputChange} id='cost' value={destination.cost}/>
        </Row>
        <Row className='mb-3'>
          <Form.Label>Destination Notes</Form.Label>
          <Form.Control as='textarea' placeholder='Enter Destination Notes' onChange={handleInputChange} id='notes' value={destination.notes}/>
        </Row>
        <Col>
          <Button type="submit" variant="primary">Create Destination</Button>
        </Col>
      </Form>
    </Container>
  )
}

export default DestinationCreate