import './styles/headerM.css';
import './styles/modalM.css';

import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";
import { connectMM } from "./redux/blockchain/blockchainActions";
import { connectWC } from "./redux/blockchain/blockchainActions";
import { useNavigate } from "react-router-dom";
import BBLogo from "./assets/images/HeadLogo.gif";
import {$} from 'jquery';

import SelectWalletModal from "./ModalM";

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

  
function HeaderM() {


    //const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const [feedback, setFeedback] = useState("Reveal What Your Destiny Holds!");
	const [claimingNft, setClaimingNft] = useState(false);

	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const [selectWalletPopup, setSelectWalletPopup] = useState(false);
	
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
	setError();
	await changeNetwork({ networkName, setError });
	blockchain.smartContract = null;
	dispatch(connectMM());
	getData();
		
    };
    
    const handleDefiConnect = async () => {
	setError();
	blockchain.smartContract = null;
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
    <div>    
<header>
    
<meta  name="viewport" content="width=device-width, initial-scale=1"/>
  <section class="top-nav">
    <div>
        <div  id="buldaar" class="page-title">
        <img  style={{ width:'70px', height:'auto', marginLeft:"-30px" }} src={BBLogo}/>
        </div>
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu">
     <li > <a style={{color:"#fff"}} href="#mintus">MINT</a></li>
      <li> <a style={{color:"#fff"}} href='#gallery'>GALLERY</a> </li>
      <li> <a style={{color:"#fff"}} href='#theTeam'> TEAM</a></li> 
      <li>

        <span  id="accountHolder" onClick={ () => setSelectWalletPopup(true)}>CONNECT WALLET</span>
         
      </li>
    </ul>
  </section>

		</header>
		<div className='whole-modal'>
		<SelectWalletModal trigger={selectWalletPopup} setTrigger={setSelectWalletPopup} handleNetworkSwitch={handleNetworkSwitch} handleDefiConnect={handleDefiConnect}></SelectWalletModal>
		</div>

		</div>
			);
			
  }
  
  export default HeaderM;
