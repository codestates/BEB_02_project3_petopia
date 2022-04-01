import { useState } from "react";
import SendTxList from './SendTxList';
import ReceiptTxList from './ReceiptTxList';

function TxHistoryList({txHistoryList}) {

    const account = JSON.parse(localStorage.getItem('account'));
    const sendList = txHistoryList.filter(tx => tx.from === account)
    const receiptList = txHistoryList.filter(tx => tx.to === account);
    const [isSend, setIsSend] = useState(false);

    return (
        <div className="txHistoryList">
            <button onClick={()=>{setIsSend(!isSend)}}>receipt</button>
            <button onClick={()=>{setIsSend(!isSend)}}>Send</button>
            { isSend ? <ReceiptTxList txList={receiptList} /> : <SendTxList txList={sendList} /> }
        </div >
    )
}

export default TxHistoryList;
