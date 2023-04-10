import React, {ComponentPropsWithRef} from 'react';
import {Button, Modal} from "react-bootstrap";

interface IModal extends ComponentPropsWithRef<any>{
    isHide: boolean,
    setHide: ()=> void

}

const MyModal = ({isHide, setHide, ...rest}: IModal) => {
    return (
        <div>
            <Modal
                show = {isHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {rest.header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {rest.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={setHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyModal;