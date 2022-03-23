import { useState } from "react";
// import axios from "axios";

function MyNftList({ dataInfo }) {

    const [nftData, setNftData] = useState(dataInfo);

    return (
        <div>
            <img margin-left="10px" paddig="10%" border="1px" width="600px" height="600px" src={nftData.image}></img>
            {/* <span>{nftData.username}</span> */}
            {/* <span>{nftData.address}</span> */}
        </div>
    )
}

export default MyNftList;