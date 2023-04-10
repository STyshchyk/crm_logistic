import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import MyTable from "../Components/MyTable/MyTable";
import {collectionType, db, getFireStore, IFireUser} from "../firebase";
import Button from "react-bootstrap/Button";
import MyModal from "../Components/MyModal/MyModal";
import MyForm from "../Components/MyForm/MyForm";

interface IUsers extends IFireUser{
    id: string
}
const Users = () => {
    const headers: string[] = ["id", "name", "email", "number", "role"]
    const [tableData, setTableData] = React.useState<IUsers[]>()
    const [isOpen, setOpen] = React.useState(false)
    React.useEffect(() => {
        getFireStore({db: db, setCollection: collectionType.users})
            .then((result: any) => {
                console.log(result)
                setTableData(result)
            })
    }, [])


    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="h2 mt-3">Users</h2>
                </Col>
                <Col>
                    <Button className={"d-block ml-auto"}
                            onClick={()=> setOpen(true)}
                    >
                        Add new user
                    </Button>
                </Col>
            </Row>
            <MyTable tableHeaders={headers}>
                {tableData && tableData.map((value: any) => {
                    return <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.number}</td>
                        <td>{value.role}</td>
                    </tr>;
                })}
            </MyTable>
            <MyModal isHide={isOpen} setHide={()=>{setOpen(false)}} header={"Add new user"}>
                <MyForm headers={headers}/>
            </MyModal>
        </Container>
    );
};

export default Users;