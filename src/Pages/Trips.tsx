import React from 'react';
import Button from "react-bootstrap/Button";
import {collectionType, db, getFireStore, IFireTrip} from "../firebase";
import {Col, Container, Row} from "react-bootstrap";
import MyTable from "../Components/MyTable/MyTable";
import MyModal from "../Components/MyModal/MyModal";
import MyForm from "../Components/MyForm/MyForm";

const Trips = () => {

    const headers: string[] = ["driverId", "driverName", "destination", "origin", "passangersAmount", "vehiclePlateNumber"]
    const [tableData, setTableData] = React.useState<IFireTrip[]>()
    const [isSend, setIssend] = React.useState(false)
    const [isOpen, setOpen] = React.useState(false)
    React.useEffect(() => {
        getFireStore({db: db, setCollection: collectionType.trips})
            .then((result: any) => {
                setTableData(result)
                console.log(result)

            })
            .catch(error=>{
                console.log(error)
            })
        setIssend(false)
        console.log('asda')
    }, [isSend])
function getData(data : any){
        setIssend(true)

}
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="h2 mt-3">Trips</h2>
                </Col>
                <Col>
                    <Button className={"d-block ml-auto"} onClick={()=> setOpen(true)}>Add new trip</Button>
                </Col>
            </Row>
            <MyTable tableHeaders={headers}>
                {tableData && tableData.map((value: any) => {
                    return <tr key={value.id}>
                        <td>{value.driverID}</td>
                        <td>{value.driverName}</td>
                        <td>{value.destination}</td>
                        <td>{value.origin}</td>
                        <td>{value.passangersAmount}</td>
                        <td>{value.vehiclePlateNumber}</td>
                    </tr>;
                })}
            </MyTable>
            <MyModal isHide={isOpen} setHide={()=>setOpen(false)} header={"Add new Trip"}>
                <MyForm headers={headers} getData={getData}/>
            </MyModal>
        </Container>
    );
};
export default Trips;