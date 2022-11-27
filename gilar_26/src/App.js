// kak maff minta tolong sekalian di ajarin caranya nampilin imagenya
// soalnya saya bingung kak sudah pakek id tpi tetep nggk bisa di tampilin jadi gambar malah yang kluar cuman link nya aja
// sekali lagi saya minta maaf kak
import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

function App() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState('')
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('')
  const [age, setAge] = useState(1);

  const [imageEdit, setImageEdit] = useState('')
  const [nameEdit, setNameEdit] = useState('');
  const [ageEdit, setAgeEdit] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const getData = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:7777/employee',
    })
      .then(function (response) {
        setData(response.data.data)
      });
  }

  const handleEdit = () => {
    Axios({
      method: 'put',
      url: `http://localhost:7777/employee/${show}`,
      data: {
        image: imageEdit,
        name: nameEdit,
        age: parseInt(ageEdit)
      }
    })
      .then(function (response) {
        handleClose()
        setImageEdit('')
        setNameEdit('')
        setAgeEdit(1)
        getData()
      });
  }

  const handleAdd = (e) => {
    e.preventDefault()
    Axios({
      method: 'post',
      url: 'http://localhost:7777/employee',
      data: {
        image: image,
        name: name,
        desc: desc,
        age: parseInt(age)
      }
    })
      .then(function (response) {
        setImage('')
        setName('')
        setDesc('')
        setAge(1)
        getData()
      });
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
      Axios({
        method: 'post',
        url: `http://localhost:7777/employee/delete/${id}`,
      })
        .then(function (response) {
          getData()
        });
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Form onSubmit={handleAdd}>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} name="name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>descripsion</Form.Label>
          <Form.Control value={desc} name="descripsion" type="text" onChange={(e) => setDesc(e.target.value)} placeholder="Enter age" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control value={age} name="age" type="number" onChange={(e) => setAge(e.target.value)} placeholder="Enter age" />
        </Form.Group>

        <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                    https://example.com/users/
                </InputGroup.Text>
                <Form.Control value={image} id="basic-url" onChange={(e) => setImage(e.target.value)} aria-describedby="basic-addon3" />
        </InputGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>image</th>
            <th>Name</th>
            <th>descripsion</th>
            <th>harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.image}</td>
              <td>{item.name}</td>
              <td>{item.desc}</td>
              <td>{item.age}</td>
              <td><ButtonGroup aria-label="Action">
                <Button size="sm" variant="primary" onClick={() => handleShow(item.id)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
              </ButtonGroup></td>
            </tr>
          })}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={nameEdit} type="text" onChange={(e) => setNameEdit(e.target.value)} placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control value={ageEdit} type="number" onChange={(e) => setAgeEdit(e.target.value)} placeholder="Enter age" />
            </Form.Group>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                    https://example.com/users/
                </InputGroup.Text>
                <Form.Control value={image} id="basic-url" onChange={(e) => setImageEdit(e.target.value)} aria-describedby="basic-addon3" />
            </InputGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
