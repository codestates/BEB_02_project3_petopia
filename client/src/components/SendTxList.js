import { Table } from 'react-bootstrap';
import Nodata from "./Nodata";
import moment from 'moment';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function SendTxList({txList}) {

    return (
        <div className="txSendList">
            <Table bordered>
                <thead>
                    <tr>
                        <th class ="txDate">Date</th>
                        <th class ="txTo">To</th>
                        <th class ="txAmount">Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {   txList.length > 0
                        ?
                        txList.map((tx, idx) => {
                            const txDate = moment.unix(tx.transaction.timestamp).format("YYYY/MM/DD kk:mm");
                            return (
                                <tr key={idx}>
                                    <td class ="txDate">{txDate}</td>
                                    <td class ="txTo">{`${tx.to.slice(0, 4)}···${tx.to.slice(-4)}`}</td>
                                    <td class ="txAmount">{parseInt(tx.value, 16)/1E18}</td>
                                    <td>
                                        <div class="scope"><button class= "scope" className = "scopeButton" onClick={()=>{window.open(`https://baobab.scope.klaytn.com/tx/${tx.transaction.transactionHash}?tabId=tokenTransfer`)}}>Klaytn Scope에서 보기 <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="1.5x" /></button></div>
                                    </td>
                                </tr>
                            )
                        })
                        : <td colSpan={4}><Nodata /></td>
                    }
                </tbody>
            </Table>
        </div >
    )
}

export default SendTxList;
