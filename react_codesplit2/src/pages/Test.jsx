import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import useForm from '../hooks/useForm'; // Import custom hook
import InputField from '../components/Form/InputField'; // Import reusable input field component
import SelectField from '../components/Form/SelectField'; // Import reusable select field component
import TextAreaField from '../components/Form/TextAreaField'; // Import reusable textarea field component
import StatesData from '../api/places.json';

const initialData = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  country: 'India',
  pincode: '',
  message: '',
  district: '',
  state: '',
};

const Test = () => {
  const {
    details,
    errors,
    selectedState,
    selectedDistrict,
    handleChange,
    handleStateChange,
    handleDistrictChange,
    handleSubmit,
  } = useForm(initialData);

  const allStates = StatesData.states.map((e) => e.state);
  const districts = StatesData.states.find((e) => e.state === selectedState)?.districts || [];

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={6}>
            <InputField
              name="firstName"
              label="First Name"
              value={details.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              error={errors.firstName}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <InputField
              name="lastName"
              label="Last Name"
              value={details.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              error={errors.lastName}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <InputField
              name="street"
              label="Street"
              value={details.street}
              onChange={handleChange}
              placeholder="Enter street"
              error={errors.street}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <InputField
              name="city"
              label="City"
              value={details.city}
              onChange={handleChange}
              placeholder="Enter city"
              error={errors.city}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <SelectField
              name="country"
              label="Country"
              value={details.country}
              onChange={handleChange}
              options={['India']}
              disabled
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <InputField
              name="pincode"
              label="Pincode"
              value={details.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              error={errors.pincode}
              maxLength={6}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <TextAreaField
              name="message"
              label="Message (Optional)"
              value={details.message}
              onChange={handleChange}
              placeholder="Enter your message"
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <SelectField
              name="state"
              label="State"
              value={selectedState}
              onChange={handleStateChange}
              options={allStates}
              error={errors.state}
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <SelectField
              name="district"
              label="District"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              options={districts}
              error={errors.district}
              disabled={!districts.length}
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Test;
