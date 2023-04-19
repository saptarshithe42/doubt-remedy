import React, {useState} from "react"

// components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "./Dropdown";


function FilterModal(props) {

    const {show, onHide, subjectList, setSubject, applyFilter} = props

    const [subjectName, setSubjectName] = useState("Subject")


    return (
        <Modal
            show={show}
            onHide={() => {onHide()}}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Apply Filters
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Dropdown
                    name="Sort"
                    itemList={sortOptionsList}
                    setItem={setOrder}
                /> */}
                <Dropdown
                    name="Subject"
                    itemList={subjectList}
                    setItem={setSubject}
                />

            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
                <Button onClick={() => {onHide()}}>Close</Button>
                <Button onClick={applyFilter}>Apply</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterModal