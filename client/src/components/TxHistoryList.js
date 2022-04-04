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
            { !isSend  
            ? <div className="txReceipt" style={{fontSize:"18px", fontWeight:"bold", width:"220px", borderRadius:"10px", padding:"0px", background:"white", color:"black"}}>
                Receiving Transaction
              </div>
            : <div className="txSend" style={{fontSize:"18px",  fontWeight:"bold", width:"220px", borderRadius:"10px", padding:"0px", background:"white", color:"black"}}>
                Sending Transaction
              </div>
            }
            { !isSend
            ? <div className ="txReceiptButton1" onClick={()=>{setIsSend(!isSend)}} style={{fontSize:"14px", marginTop:"5px", marginBottom:"30px", color:"gray", textDecoration:"underline"}}>
                Click to View Your <b>Sending Transaction</b>
              </div>
            : <div className ="txSendButton1" onClick={()=>{setIsSend(!isSend)}} style={{fontSize:"14px", marginTop:"5px", marginBottom:"30px", color:"gray", textDecoration:"underline"}}>
                Click to View Your <b>Receiving Transaction</b>
              </div>
            }
            { !isSend  
            ? <ReceiptTxList txList={receiptList} /> 
            : <SendTxList txList={sendList} /> 
            }
        </div >
    )
}

export default TxHistoryList;
