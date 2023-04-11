import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import MyTable from "../Components/MyTable/MyTable";
import {addFireStore, collectionType, db, getFireStore, IFireUser} from "../firebase";
import Button from "react-bootstrap/Button";
import MyModal from "../Components/MyModal/MyModal";
import MyForm from "../Components/MyForm/MyForm";
import {collection, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore"
import {set} from "react-hook-form";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface IUsers extends IFireUser {
    id: string
}

const Users = () => {
    const headers: string[] = ["id", "name", "email", "number", "role"]
    const [tableData, setTableData] = React.useState<{}[]>()
    const [isOpen, setOpen] = React.useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
    const [docID, setDocID] = React.useState(-1);
    React.useEffect(() => {
        const unsub = onSnapshot(collection(db, "users"), (col) => {
            let data: any = col.docs.map(elem => {
                return {
                    ...elem.data(),
                    id: elem.id
                }
            })
            setTableData(data)
        })
        return () => {
            unsub();
        }
    }, [])

    function getValue(data: any) {
        addFireStore({db: db, setCollection: collectionType.users, addUser: data})
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    async function handleEdit(data: any, docId?: string) {
        const tripsRef = doc(db, "users", `${data.id}`);
        await updateDoc(tripsRef, {
            ...data
        });
    }

    async function handleDelete(docId: string) {
        console.log("Doc id", docId)
        const tripsRed = doc(db, "users", docId);
        await deleteDoc(tripsRed)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
            })
        console.log(error)
    }

    function openModal(id: number) {
        setIsEditModalOpen(true)
        setDocID(id)
    }

    function handleClose() {
        setIsEditModalOpen(false)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="h2 mt-3">Users</h2>
                </Col>
                <Col>
                    <Button className={"d-block ml-auto"}
                            onClick={() => setOpen(true)}
                    >
                        Add new user
                    </Button>
                </Col>
            </Row>
            <MyTable tableHeaders={headers}>
                {tableData && Array.isArray(tableData) && tableData.map((value: any, index: number) => {
                    return <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.number}</td>
                        <td>{value.role}</td>
                        <td>
                            <Button
                                variant="outline-primary"
                                className={"m0-auto"}
                                onClick={() => openModal(index)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-primary"
                                className={"m0-auto ml-2"}
                                onClick={() => handleDelete(value.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>;
                })}
            </MyTable>
            <MyModal isHide={isEditModalOpen} setHide={handleClose} header={"Edit row"}>
                <MyForm headers={headers} getData={handleEdit}
                        defaultValues={tableData ? tableData[docID] : undefined}/>
            </MyModal>
            <MyModal isHide={isOpen}
                     setHide={() => {
                         setOpen(false)
                     }}
                     header={"Add new user"}
            >
                <MyForm headers={headers} getData={getValue}/>
            </MyModal>
        </Container>
    );
};

export default Users;