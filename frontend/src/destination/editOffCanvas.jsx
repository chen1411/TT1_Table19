import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Form, Row, Button, Alert, Container, Col } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

const EditOffCanvas = (props) => {
  console.log(props)
  const {countries, destinationId, showCanvas, handleClose} = props;

  const [destination, setDestination] = useState({});
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchAllData = async () => {
      const existingDestination = await fetchExistingDestination(destinationId);
      setDestination(existingDestination);
    }

    fetchAllData();
  }, [])

  const fetchExistingDestination = async (destinationId) => {
    // Replace with fetch single destination API call
    const destinationData = {name: 'Test Destination', cost: 70, notes: "This is a description", countryId: 1};
    return destinationData;
  }

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
    console.log('Update!')
    
    const updatedDestination = null;
    if (updatedDestination) {
      setAlert({message: 'Updated destination succesfully'})
      return;
    } else {
      setAlert({message: 'An error occurred while creating the destination. Please refresh the page and try again.'})
      return;
    }

    // Make request
    // Redirect
  }

  const handleDelete = (e) => {
    e.preventDefault();

    // Make request to delete.
    console.log('delete')
    
  }

  return (
    <Offcanvas show={showCanvas} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className='m-3'>
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
        <Row>
            <Col>
            <Button className='mr-2' type="submit">Update Destination</Button>
            <Button className='mx-2' onClick={handleDelete} variant="danger">Delete Destination</Button>
            </Col>
        </Row>
        {alert && <Row>alert</Row>}
        </Form>
    </Offcanvas>
  )
}

export default EditOffCanvas;