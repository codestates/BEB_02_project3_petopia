<div style={{
             display: 'flex', justifyContent: 'center', alignItems: 'center'
             , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <img src="https://media.istockphoto.com/photos/cute-puppy-picture-id598175960" alt="W3Schools.com"></img>                 */}
                    

                    <div class="card-body">
                        <h5 class="card-title">My Pet</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Connect Wallet</a>
                        <br>
                        </br>
                        <br>
                        </br><p>지갑이 없으신가요?</p><Link to= "/wallet-download">지갑 다운로드</Link>
                    </div>

                
            </form>
        </div>


// useEffect(() => {
    //     if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
    //         try {
    //             const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
    //             setWeb3(web);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // }, []);

    // const connectWallet = async () => {
    //     const accounts = await window.ethereum.request({
    //         method: "eth_requestAccounts",
    //     });

    //     setAccount(accounts[0]);
    // };

      {/* <a class="btn btn-dark download-wallet" 
                  href="#" 
                  style={{width: '439px', height: '66px', paddingTop: '20px', fontSize: '15px', fontWeight: '700', marginTop:'20px'}} 
                  role="button" 
                  onClick={() => {}}>Login with Wallet</a> */}


                             {/* <a class="btn btn-dark connect-wallet" href="#" role="button" onClick={() => {
                    connectWallet(); setVisible(!visible);}}>{visible ? "Hide Address" : "Show Address"}</a> */}