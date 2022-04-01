import { Table } from 'react-bootstrap';
import Nodata from "./Nodata";
import moment from 'moment';

function SendTxList({txList}) {

    return (
        <div className="txSendList">
            <Table bordered>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>To</th>
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
                                    <td>{`${tx.to.slice(0, 4)}···${tx.to.slice(-4)}`}</td>
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

export default SendTxList;
