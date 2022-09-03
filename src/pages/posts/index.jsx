import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import "./style.scss";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

/*
Name: Name of image
About : About Image
CoverImg = Link for cover image
Description: Long Description of image
Images = [Array of images]
Date: Date of image
PostedOn = Date

*/

const PostForm = () => {
  const [postedOn, setPostedOn] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date(postedOn);
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

    var imageIds = [];
    imageIds = formDataObj["images"].split(",");

    const images = imageIds.map(
      (element) => "https://drive.google.com/uc?export=view&id=" + element
    );

    const data = {
      Name: formDataObj["shot-name"],
      About: formDataObj["about-shot"],
      CoverImage:
        "https://drive.google.com/uc?export=view&id=" +
        formDataObj["cover-image"],
      Images: images,
      Description: formDataObj["description"],
      CapturedOn: date.getTime() / 1000,
      PostedOn: Timestamp.now()["seconds"],
    };

    try {
      await addDoc(collection(db, "Posts"), data);
      alert("Image Posted Successfully");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container className="m-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-5" controlId="shot-name">
          <Row>
            <Col>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="string"
                name="shot-name"
                placeholder="Enter Name of Shot"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="captured-on">
          <Row>
            <Col>
              <Form.Label>Image Captured On</Form.Label>
            </Col>
            <Col>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={postedOn}
                  onChange={(newValue) => {
                    setPostedOn(newValue);
                  }}
                />
              </LocalizationProvider>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="about-shot">
          <Row>
            <Col>
              <Form.Label>Brief Details about shot</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="string"
                name="about-shot"
                placeholder="Enter About"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="cover-image">
          <Row>
            <Col>
              <Form.Label>Cover Image</Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="cover-image"
                type="string"
                placeholder="Enter URL for Cover Image"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="images">
          <Row>
            <Col>
              <Form.Label>Images</Form.Label>
            </Col>
            <Col>
              <Form.Control name="images" as="textarea" rows={3} />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="description">
          <Row>
            <Col>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col>
              <Form.Control name="description" as="textarea" rows={10} />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
