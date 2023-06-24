


import HomePage from './HomePage'
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";
import { connectMM } from "./redux/blockchain/blockchainActions";
import { connectWC } from "./redux/blockchain/blockchainActions";

import { useNavigate } from "react-router-dom";
import BBLogo from "./assets/images/HeadLogo.gif";
import { $ } from 'jquery';


import SelectWalletModal from "./Modal";



 /*  MAIN MAIN MAIN MAIN MAIN         */
var networkName = "CRO";

const networks = {
	CRO: {
		chainId: `0x${Number(25).toString(16)}`,
        chainName: "Cronos Mainnet Beta",
        nativeCurrency: {
          name: "Cronos Mainnet Beta",
          symbol: "CRO",
          decimals: 18
        },
        rpcUrls: ["https://evm.cronos.org"],
        blockExplorerUrls: ["https://cronoscan.com/"]
      },
};

const changeNetwork = async ({ networkName, setError }) => {
	try {
	  if (!window.ethereum) throw new Error("No crypto wallet found");
	  await window.ethereum.request({
	    method: "wallet_addEthereumChain",
	    params: [
	      {
		...networks[networkName]
	      }
	    ]
	  });
	  
	} catch (err) {
	  console.log(err.message);
	}
      };



function Header() {

    //const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const [feedback, setFeedback] = useState("Reveal What Your Destiny Holds!");
	const [claimingNft, setClaimingNft] = useState(false);

    const [selectWalletPopup, setSelectWalletPopup] = useState(false);

   	const [counter, setCounter] = useState(1);
	
	var accountSelected = "";

	const getData = () => {
		if (blockchain.account !== "" && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account));

			accountSelected = blockchain.account;

            document.getElementById('accountHolder').textContent = shorten(accountSelected);
        }
    };

    const shorten = (str) => {
        if (str.length < 10) return str;
        return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
      }
    
    const [error, setError] = useState();

    const handleNetworkSwitch = async () => {
        //alert("metamask");
        blockchain.smartContract = null;
        setError();
        await changeNetwork({ networkName, setError });
	    dispatch(connectMM());
        getData();
    };

    const handleDefiConnect = async () => {
        blockchain.smartContract = null;
        setError();
	    dispatch(connectWC());
        getData();
    }
    


	const networkChanged = (chainId) => {
	console.log({ chainId });
    };
    
    const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};

	useEffect(() => {

		//getBrowser();
		getData();
    }, [blockchain.account]);

	return (

        

      <div style={{ background: "#000000", height: "60px", display: "flex", alignContent: "center", justifyContent:"space-between"}}>
     
        <div>
            <a>
                <span style={{  marginLeft: "800px", color: "#FFF", fontSize: "20px", fontFamily: "Outfit", fontWeight: "700", textTransform: "lowercase"}}>
                    crotopia 2.0</span>
            </a>
        </div>
        <div>
            <a>
                <span style={{ color: "#FFF", fontSize: "20px", fontFamily: "Outfit", fontWeight: "700", textTransform: "lowercase"}}>
                    home</span>
            </a>
        </div>
       
        <div>
            <a class="">
                <span style={{ color: "#FFF", fontSize: "20px", fontFamily: "Outfit", fontWeight: "700", textTransform: "lowercase"}}>
                    team</span>
            </a>
        </div>
        <div>
            <a class="">
                <span style={{ color: "#FFF", fontSize: "20px", fontFamily: "Outfit", fontWeight: "700", textTransform: "lowercase"}}>
                    gallary</span>
            </a>
        </div>
        <div>
            <a class="" onClick={ () => setSelectWalletPopup(true)}>
                <span style={{ color: "#FFF", fontSize: "20px", fontFamily: "Outfit", fontWeight: "700", textTransform: "lowercase" }} class="title titlee" id="accountHolder">
                    CONNECT WALLET</span>
            </a>
      </div>
        

                  <div className='whole-modal'>
                  <SelectWalletModal trigger={selectWalletPopup} setTrigger={setSelectWalletPopup} handleNetworkSwitch={handleNetworkSwitch} handleDefiConnect={handleDefiConnect}></SelectWalletModal>
                  </div>

        </div>  
	);
  }
  
  export default Header;
