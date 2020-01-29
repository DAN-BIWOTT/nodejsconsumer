import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { Container, Row, Col, ButtonGroup,Button, Modal,Navbar } from 'react-bootstrap';
import DisplayArticles from './components/DisplayArticles';
import { CustomMargin } from './stylesheets/Mainstyle';
import { getArticles, createArticle } from './controllers/MainController';



const Main = () =>
{   
    // DECLARATIONS
    const[myth,setMyth] = useState([]);
    const[newTitle,setNewTitle] = useState("");
    const[newBody,setNewBody] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const data = {
        title: newTitle,
        body: newBody
    }
    const URL = `http://localhost:4000/api/v1/`


    // CONSTRUCTOR
    useEffect(
        ()=>{showArticles()},
        []
    );

    // CRUD
    const showArticles = async() => {
        setMyth((await getArticles(URL)).data);
    }
    const addArticle = () =>{
        createArticle(URL,data);
    }

    // HELPERS
    const updateNewTitle = (e) => {
        setNewTitle(e.target.value);
    }
    const updateNewBody = (e) =>{
        setNewBody(e.target.value);
    }
    const handleOpen = async (e) => {
        setShow(true);
    }
    return(
        <div>
            <Navigation></Navigation>
            <main id="page-wrap">
            <Navbar bg="light" expand="lg">
            </Navbar>
            <Container><CustomMargin></CustomMargin>
                     <Row>
                        <Col md="4"></Col>
                        <Col md="6"><h3>Diary</h3></Col>
                        <Col md="2"><ButtonGroup><Button onClick={handleOpen} className="pull-right">Add Entry</Button></ButtonGroup></Col>
                    </Row>
                    <Modal show = {show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header>
                            <Modal.Title>Add New Entry</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={addArticle}>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col md="2"></Col>
                                    <Col md="8">
                                        <div className="form-group">
                                            <label>New Title</label>
                                            <input value={newTitle} onChange={updateNewTitle} type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>New Body</label>
                                            <input value={newBody} onChange={updateNewBody} type="text" className="form-control" />
                                        </div>
                                    </Col>
                                    <Col md="2"></Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonGroup>
                                <Button variant="outline-success" type="submit">Submit</Button>
                                <Button variant="outline-info" onClick={handleClose}>Close</Button>
                            </ButtonGroup>
                        </Modal.Footer>
                        </form>
                    </Modal>
                <Row className="justify-content-md-center">
                    <Col md="12">
                        <table className="table table-bordered table-striped table-responsive-md text-center">
                            <thead >
                                <tr>
                                    <td>Title</td>
                                    <td>Body</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                            myth.map( mth => <DisplayArticles
                                    pkey = {mth.id}
                                    key = {mth.id}
                                    ptitle = {mth.title}
                                    pbody = {mth.body}
                            ></DisplayArticles>)}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
            </main>
        </div>
    );
}

export default Main;