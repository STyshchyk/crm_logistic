import React from 'react';
import Button from "react-bootstrap/Button";
import {addFireStore, collectionType, db, getFireStore, IFireTrip} from "../firebase";
import {Col, Container, Row} from "react-bootstrap";
import MyTable from "../Components/MyTable/MyTable";
import MyModal from "../Components/MyModal/MyModal";
import MyForm from "../Components/MyForm/MyForm";
import {collection, onSnapshot, updateDoc, doc, deleteDoc} from "firebase/firestore";

const Trips = () => {

        const headers: string[] = ["driverID", "driverName", "destination", "origin", "passangersAmount", "vehiclePlateNumber"]
        const [tableData, setTableData] = React.useState<IFireTrip[]>()
        const [isOpen, setOpen] = React.useState(false)
        const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
        const [docID, setDocID] = React.useState(-1);
        React.useEffect(() => {
            const unsub = onSnapshot(collection(db, "trips"), (col) => {
                let data: any = col.docs.map(elem => {
                    return {
                        ...elem.data(),
                        docID: elem.id
                    }
                })
                // console.log(data)
                setTableData(data)
            })
            return () => {
                unsub();
            }
        }, [])

        async function handleEdit(data: any, docId?: string) {
            const tripsRef = doc(db, "trips", `${docId}`);
            await updateDoc(tripsRef, {
                ...data
            });
        }

        async function handleDelete(docID: string) {
            console.log("Doc id", docID)
            const tripsRed = doc(db, "trips", docID);
            await deleteDoc(tripsRed);
        }

        function getValue(data: any) {
            addFireStore({db: db, setCollection: collectionType.trips, addTrip: data})
                .then(result => {
                    console.log("data sent to firestore")
                })
                .catch(error => {
                    console.log(error)
                })
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
                        <h2 className="h2 mt-3">Trips</h2>
                    </Col>
                    <Col>
                        <Button className={"d-block ml-auto"} onClick={() => setOpen(true)}>Add new trip</Button>
                    </Col>
                </Row>
                <MyTable tableHeaders={headers}>
                    {tableData && tableData.map((value: any, index: number) => {
                        return <React.Fragment key={value.docID}>
                            <tr>
                                <td>{value.driverID}</td>
                                <td>{value.driverName}</td>
                                <td>{value.destination}</td>
                                <td>{value.origin}</td>
                                <td>{value.passangersAmount}</td>
                                <td>{value.vehiclePlateNumber}</td>
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
                                        onClick={() => handleDelete(value.docID)}
                                    >
                                        Delete
                                    </Button>
                                </td>

                            </tr>

                        </React.Fragment>
                    })}

                </MyTable>
                <MyModal isHide={isEditModalOpen} setHide={handleClose} header={"Edit row"}>
                    <MyForm headers={headers} getData={handleEdit}
                            defaultValues={tableData ? tableData[docID] : undefined}/>
                </MyModal>
                <MyModal isHide={isOpen} setHide={() => setOpen(false)} header={"Add new Trip"}>
                    <MyForm headers={headers} getData={getValue}/>
                </MyModal>
            </Container>
        );
    }
;
export default Trips;