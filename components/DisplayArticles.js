import React, { useState } from 'react';
import { Button, ButtonGroup, Modal, Col,Row } from 'react-bootstrap';
import { deleteArticle,showArticle,editArticle } from '../controllers/MainController';

const DisplayArticles = ({pkey,ptitle,pbody}) =>
{  
    // DECLARATIONS
    const URL = `http://localhost:4000/api/v1/`
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[titleVal,setTitleVal] = useState("");
    const[bodyVal,setBodyVal] = useState("");
    const data = {
        title: titleVal,
        body: bodyVal
    }

    // HELPERS
    const updateTitle = (e) =>{setTitleVal(e.target.value);}
    const updateBody = (e) =>{setBodyVal(e.target.value);}
    const setValues = (e) =>{e.preventDefault();editMe();}

    // CRUD
    const deleteMe = async e =>{
        let myURL = URL.concat(pkey);
        deleteArticle(myURL);
        window.location.reload();
    }
    const onShowArticle = async () => {
        let myURL = URL.concat(pkey);
        const response = await showArticle(myURL);
        setTitleVal(response.data.TITLE);
        setBodyVal(response.data.BODY);
      
        setShow(true);
    }
    const editMe  = async(e)=>{
        let myURL = URL.concat(pkey);
        editArticle(myURL,data);
        window.location.reload();
    }

    return(
        <>
            <tr>
                <td>{ptitle}</td>
                <td>{pbody}</td>
                <td>
                    <ButtonGroup>
                        <Button onClick={deleteMe} size="md" className="bg-danger">Delete</Button>
                        <Button onClick={onShowArticle} size="md" className="bg-primary">Edit</Button>
                    </ButtonGroup>
                    
                </td>
            </tr>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <form className="form-group" onSubmit={setValues}>
            <Modal.Body>
                <div className="container-fluid">
                    <Row>
                        <Col md="1"></Col>
                        <Col md="10">
                            
                                <div>
                                    <label>Title:</label>
                                    <input type="text" value={titleVal} onChange={updateTitle} className="form-control" />
                                </div>
                                <div>
                                    <label>Body:</label>
                                    <textarea type="text" value={bodyVal} onChange={updateBody} className="form-control" />
                                </div>
                            
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
            <Button variant="success" onClick={handleClose} type="submit">
                Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </ButtonGroup>
            </Modal.Footer>
            </form>
        </Modal>
        </>
    );
}

export default DisplayArticles;