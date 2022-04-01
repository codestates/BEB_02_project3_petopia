import { Table } from 'react-bootstrap';
import Nodata from "./Nodata";
import moment from 'moment';

function ReceiptTxList({txList}) {

    return (
        <div className="txReceiptList">
            <Table bordered>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>Amount</th>
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
                                    <td>{txDate}</td>
                                    <td>{`${tx.from.slice(0, 4)}···${tx.from.slice(-4)}`}</td>
                                    <td>{parseInt(tx.value, 16)/1E18}</td>
                                    <td>
                                        <button onClick={()=>{window.open(`https://baobab.scope.klaytn.com/tx/${tx.transaction.transactionHash}?tabId=tokenTransfer`)}}>SCOPE</button>
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
