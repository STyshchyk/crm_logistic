import React from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import styles from "./MyForm.module.scss"

interface IForm {
    headers: string[];
}

const MyForm = ({headers}: IForm) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange"
    });
    const onSubmit = (data: any) => console.log(data);

     return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {!!headers && headers.map((elem) => {
                return (
                    <Form.Group key={elem} className="mb-3" controlId="formBasicPassword">
                        <Form.Label>{elem.toUpperCase()}</Form.Label>
                        <Form.Control type="text" placeholder={`Enter ${elem}`} {...register(`${elem}`, {
                            required: true,
                            maxLength: {value: 20, message: "max lenght is 4"},
                            minLength: {value: 3, message: "min lenght is 3"}
                        })}/>
                        {errors?.[`${elem}`] && errors?.[`${elem}`]?.type === "required" &&
                            <span className={styles.error}>This is required</span>}
                        {errors?.[`${elem}`] && errors?.[`${elem}`]?.type === "minLength" &&
                            <span className={styles.error}>Min lenght is 3</span>}
                        {errors?.[`${elem}`] && errors?.[`${elem}`]?.type === "maxLength" &&
                            <span className={styles.error}>Max lenght is 20</span>}
                    </Form.Group>)
            })}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default MyForm;