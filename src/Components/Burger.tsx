import React, {ReactNode, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import {IsAuth} from "../hooks/IsAuth";
import {GiHamburgerMenu} from "react-icons/all";

interface IBurger {
    children: ReactNode;
    handleClick?: (cb: () => void) => void
}

const Burger = ({children, handleClick}: IBurger) => {
    const [show, setShow] = useState(false);
    const {email, isAuth} = IsAuth();
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };


    return (
        <>
            <Button variant="primary" onClick={handleShow} className={"mt-3"}>
                Menu
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Welcome {email}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Burger;