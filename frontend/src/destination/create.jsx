import React, {useState, useEffect} from 'react';
import { Form, Row, Button, Alert } from 'react-bootstrap';


const DestinationCreate = () => {
  const [destination, setDestination] = useState({});
  const [countries, setCountries] = useState([]);
  const [alert, setAlert] = useState({});
  console.log(destination)

  useEffect(() => {
    // Fetch list of available countries + ids.
    const countriesData = [{id: 1, name: "Singapore"}, {id: 2, name: "Malaysia"}]
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

    const createdDestination = {'a': 1};
    if (createdDestination) {
      setAlert({message: 'Please ensure that the destination name, country and cost is selected before submitting.', type: 'success'})
      return;
    } else {
      setAlert({message: 'An error occurred while creating the destination. Please refresh the page and try again.', type: 'danger'})
      return;
    }
    // Make request
    // Redirect
  }

  return (
  <>
    {alert.message && <Alert key={alert.type} variant={alert.type}>{alert.message}</Alert>}
    <Form onSubmit={handleSubmit}>
      <Row className='mb-3' rows={3}>
        <Form.Label>Destination Name</Form.Label>
        <Form.Control required type='text' placeholder='Enter Destination Name' onChange={handleInputChange} id='name'/>
      </Row>
      <Row className='mb-3' rows={3}>
        <Form.Label>Country</Form.Label>
        <Form.Select placeholder="Select a country" onChange={handleInputChange} id='countryId'>
          {countries.map((country) => {
            return (<option value={country.id}>{country.name}</option>)
          })}
        </Form.Select>
      </Row>
      <Row className='mb-3' rows={3}>
        <Form.Label>Destination Cost</Form.Label>
        <Form.Control required type='number' placeholder='Enter Destination Cost' onChange={handleInputChange} id='cost'/>
      </Row>
      <Row className='mb-3'>
        <Form.Label>Destination Notes</Form.Label>
        <Form.Control as='textarea' placeholder='Enter Destination Notes' onChange={handleInputChange} id='notes'/>
      </Row>
      <Button type="submit">Create new destination</Button>
    </Form>
  </>
  )
}

export default DestinationCreate