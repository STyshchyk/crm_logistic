import React from 'react';
import {Table} from "react-bootstrap";
import {retry} from "@reduxjs/toolkit/query";
import {collectionType, db, getFireStore, IFireTrip, IFireUser} from "../../firebase";
import {collection} from "firebase/firestore/lite";
import {IUser} from "../../app/Slices/userSlice";
import login from "../../Pages/Login";


interface IMyTable {
    children?:  | JSX.Element
        | JSX.Element[]
        | React.ReactChild
        | React.ReactChild[]
        | React.ReactNode
        | React.ReactNode[]
        | string
        | string[];
    tableHeaders?: string[];
}

const MyTable = ({tableHeaders, children}: IMyTable) => {

    return (
        <Table striped bordered className={"mt-5"}>
            <thead>
            <tr>
                {tableHeaders  && tableHeaders.map((elem: string): JSX.Element => {
                    return <th key={elem}>{elem}</th>
                })}
            </tr>
            </thead>
            <tbody>
                    {children}
            </tbody>
        </Table>
    );
};

export default MyTable;