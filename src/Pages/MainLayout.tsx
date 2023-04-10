import React from 'react';
import {IsAuth} from "../hooks/IsAuth";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useLogOut} from "../hooks/useLogOut";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../app/Slices/userSlice";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {GiHamburgerMenu} from "react-icons/all";
import Burger from "../Components/Burger";
import {Container, ListGroup} from "react-bootstrap";
import {routes} from "../router";

const MainLayout = () => {
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();
    const {isAuth, email} = IsAuth();
    const {isError, errorMsg, handleLogOut} = useLogOut();
    const user = useAppSelector(selectUser)

    React.useEffect(()=>{
        if (!isAuth)navigate(`${routes.login}`)
    }, [])

    if (isError)console.log(errorMsg)
    return (
        <div className={"app"}>
            <Container>
                <Burger>
                    <ListGroup variant="flush">
                        <ListGroup.Item><Link to={`${routes.trips}`}>Trips</Link></ListGroup.Item>
                        <ListGroup.Item><Link to={`${routes.users}`}>Users</Link></ListGroup.Item>
                        <ListGroup.Item><Link to={`${routes.about}`}>About</Link></ListGroup.Item>
                        <ListGroup.Item>
                            <Button variant="danger"
                                    onClick={handleLogOut}
                            >
                                Logout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Burger>
                <Outlet/>
            </Container>
        </div>
    )
};

export default MainLayout;