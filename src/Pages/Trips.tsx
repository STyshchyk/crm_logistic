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
    React.useEffect(() => {
        console.log("hello")
        const unsub = onSnapshot(collection(db, "trips"), (col) => {
            let data: any = col.docs.map(elem => {
                return {
                    ...elem.data(),
                    docID: elem.id
                }
            })
            console.log(data)
            setTableData(data)
        })
        return () => {
            unsub();
        }
    }, [])

    async  function handleEdit(docId: string) {
        // const tripsRed = doc(db, "trips", docId);
        // console.log("Doc id", docId)
        // await updateDoc(tripsRed, {
        //     passangersAmount: "20"
        // });
    }
    async  function handleDelete(docId: string) {
        console.log("Doc id", docId)
        const tripsRed = doc(db, "trips", docId);
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
                {tableData && tableData.map((value: any) => {
                    return <tr key={value.docID}>
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
                            disabled
                            onClick={() => handleEdit(value.docID)}
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
                    </tr>;
                })}
            </MyTable>
            <MyModal isHide={isOpen} setHide={() => setOpen(false)} header={"Add new Trip"}>
                <MyForm headers={headers} getData={getValue}/>
            </MyModal>
        </Container>
    );
};
export default Trips;