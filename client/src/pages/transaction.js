import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

import TxList from '../components/txList';

function Transaction() {

    const address = '0x152A9b3624F522efD3e94eBb97315614d666034C'
    const [myTxList, setMyTxList] = useState([{ id: '1', txhash: '0x', from: '0x11111111', to: '0x22222222', value: '2' }]);

    const getTxList = () => {
        axios.get('http://localhost:4000/transaction', {
            params: {
                address: address
            }
        })
            .then(res => res.data)
            .then(data => {
                setMyTxList(data.reverse());
            })
    }

    useEffect(() => {
        getTxList();
    }, [])

    return (
        <div className="Transaciton">
            <h1 style={{ marginLeft: "10%", marginTop: "3%" }}>Transaction Page</h1>
            <div style={{ marginLeft: "10%", marginRight: "10%" }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TxHash</th>
                            <th>To </th>
                            <th>From </th>
                            <th>Value </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myTxList.length === 0 ? '' : myTxList.map((TransactionInfo) => {
                                return <TxList key={TransactionInfo.id} dataInfo={TransactionInfo} />
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Transaction;