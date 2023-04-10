import React from 'react';
// @ts-ignore
import {Alert} from 'bootstrap-4-react';
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthProvider from "../Components/AuthProvider";
import {AiOutlineFacebook, AiOutlineGooglePlus} from "react-icons/all";
import {AuthType_, useSignUp} from "../hooks/useSignUp";
import {Link, useNavigate} from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();
    const [isAuth, email, handleSignup] = useSignUp();
    const googleLogin = () => {
        handleSignup({authType: AuthType_.Google})
    }
    const faceLogin = () => {
        // handleSignup({authType: AuthType_.Face})
        alert("Facebook is not implemented, try another method")
    }
    function handleForm(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(e.target.password.value, e.target.email.value)
        handleSignup({email: e.target.email.value, password: e.target.password.value, authType: AuthType_.EmailPass})
    }


    return (
        <AuthProvider>
            <Container className={"center"}>
                <Row className={"justify-content-md-center"}>
                    <Col xs={12} md={12} lg={6}>
                        <Form className={""} onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                            handleForm(e);
                        }}>
                            <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
                                <Form.Label>Sign Up using Email and Password</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
                                <Form.Label>Or via</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3 text-center justify-content-md-center"
                                        controlId="formBasicEmail">
                                <Form.Label>
                                    <AiOutlineFacebook
                                        className="mr-4 rounded border border-1 svg"
                                        size={50}
                                        onClick={faceLogin}
                                    />
                                    <AiOutlineGooglePlus
                                        className="ml-4 rounded border border-1 svg"
                                        size={50}
                                        onClick={googleLogin}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                              name="email"/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              name="password"/>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex" controlId="formBasicPassword">
                                <Button variant="primary" type="submit">
                                    Log in
                                </Button>
                                <Button variant="primary" className="ml-auto">
                                    <Link to={"/login"}>
                                        Back to Log in
                                    </Link>
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </AuthProvider>
    );
};

export default Signup;