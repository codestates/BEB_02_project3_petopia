import { Table } from 'react-bootstrap';
import Nodata from "./Nodata";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function ReceiptTxList({txList}) {

    return (
        <div className="txReceiptList">
            <Table bordered>
                <thead>
                    <tr>
                        <th class ="txDate">Date</th>
                        <th class ="txFrom">From</th>
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
                                    <td class ="txFrom">{`${tx.from.slice(0, 4)}···${tx.from.slice(-4)}`}</td>
                                    <td class ="txAmount">{parseInt(tx.value, 16)/1E18}</td>
                                    <td>
                                        <div class="scope"><button className = "scopeButton" onClick={()=>{window.open(`https://baobab.scope.klaytn.com/tx/${tx.transaction.transactionHash}?tabId=tokenTransfer`)}}>Klaytn Scope에서 보기 <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="1.5x" /></button></div>
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

export default ReceiptTxList;
