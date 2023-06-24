import { Typography} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import './styles/style.css';
import './styles/newstyle.css';
import './styles/gallery.css';
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";

// IMAGES IMPORT


import diss from './assets/images/diss.png'; 
import tweet from './assets/images/tweet.png'; 
import insta from './assets/images/insta.png'; 
import one from './assets/images/1.png'; 
import two from './assets/images/2.png'; 
import trans1 from './assets/images/trans1.png'; 
import trans2 from './assets/images/trans2.png'; 
import poster from './assets/images/poster.png'; 
import WhitePaper from './assets/images/whitepaper.png'; 

import background_cro_2 from "./assets/images/BG_Cro_2";


// import $ from 'jquery'; 
// import shadows from '@material-ui/core/styles/shadows';



function HomePage() {

  
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState();
  const [claimingNft, setClaimingNft] = useState(false);

  const [counter, setCounter] = useState(1);
  let incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  var isWhiteList = false;
  
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  if (counter >= 20) {
    incrementCounter = () => setCounter(20);
  }

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    var address = "0x87Fc368Db5Ab03FCd34626B673dEAef430718637";
    var gasLimitValue = 250000 * _amount;;
    var nftPrice = 850 * _amount;
	
    setFeedback("Preparing your NFT.");
    setClaimingNft(true);


    blockchain.smartContract.methods
      .mint(_amount)
      .send({
        gasLimit: gasLimitValue,
        to: address,

        from: blockchain.account,
        value: blockchain.web3.utils.toWei((nftPrice).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Transaction Cancelled!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "NFT Minted!"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  async function isAddressWhitlisted() {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      if(data.whitelistPeriod == true){
        await blockchain.smartContract.methods.isWhitelist(blockchain.account)
          .call().then((res) => {
            //console.log(res);
            if (res == false){
              if(document.getElementById("WLMint") != null)
              {
                document.getElementById("WLMint").style.visibility = "hidden"; 
                document.getElementById("WLIncDecCounter").style.visibility = "hidden";
                setFeedback(
                  "You are not whitelisted."
                 );
              }
            }
            else {
              //gasLimitCheck();
            }
        });
      }
      else {
        //gasLimitCheck();
      }
    }
  }

  var gasPrice = 0;
  async function gasLimitCheck()
  {
    if(data.whitelistPeriod == true){
    gasPrice = await blockchain.smartContract.methods.whiteListMint(1)
                  .estimateGas({ from: blockchain.account });
    } else {
      gasPrice = await blockchain.smartContract.methods.mint(1)
                  .estimateGas({ from: blockchain.account });
    }
    console.log(gasPrice);
  }

  const claimNFTWL = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    var address = "0x87Fc368Db5Ab03FCd34626B673dEAef430718637";
    var gasLimitValue = 250000 * _amount;
    var nftPrice = 750 * _amount;
	
    setFeedback("Preparing your NFT.");
    setClaimingNft(true);
    
    blockchain.smartContract.methods
      .whiteListMint(_amount)
      .send({
        gasLimit: gasLimitValue,
        to: address,

        from: blockchain.account,
        value: blockchain.web3.utils.toWei((nftPrice).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Transaction Cancelled.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "NFT Minted"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
   
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };


  useEffect(() => {
    getData();
  }, [blockchain.account]);

	
  function Display(props) {
    return (
      <label style={{ marginLeft: '.5rem' }} >{props.message}</label>
    )
  }

  return (

    <main style={{background: `url(${background_cro_2}) no-repeat center center fixed`, backgroundSize: 'cover', height: '100vh'}}>
      <div style={{display: "flex", width: "454px", flexDirection: "column", marginTop: "40px"}}>
        <Typography style={{ fontSize: "96px", fontFamily: "Outfit", fontWeight: "700", lineHeight: "100px"}}>CROtopia</Typography>
          
      </div>



     

      {/* MINT Button 

      <div style={{ paddingLeft: "100px", paddingRight: "100px" }} className='mintstation' >
       

      <div  className='feedback'>{feedback}</div>
        <div className='total_supply' >{data.totalSupply}/1000</div>
        {Number(data.totalSupply) === 1000 ? (
          <>
            <span className='sale'>Sold Out!</span>
          </>
        ) : (
        <>
        {blockchain.account === "" ||
            blockchain.smartContract === null ? (
            <span className='textw'>Please Connect Wallet</span>
            ) : (
              <>     
        <div id="WLIncDecCounter" className='InDe' >
        <div className = 'small_buttons' style = {{ paddingTop: "5px", paddingBottom: "5px", marginBottom: "20px", marginRight: "40px" }} >
          <Button style={{fontWeight:"700", fontSize:"20px" }} onClick={(e) => { e.preventDefault(); decrementCounter(); }}>-</Button>
        </div>
        <span style={{fontSize:"40px" , marginTop:"-14px" , fontWeight:"700"}}>
          <Display message={counter} /> </span>
        <div className='small_buttons' style={{ paddingTop: "5px", paddingBottom: "5px", marginBottom: "20px", marginLeft: "40px" }} >
          <Button style={{fontWeight:"700", fontSize:"20px" }} onClick={(e) => { e.preventDefault(); incrementCounter(); }}> +
          </Button>
        </div>
      </div>

      <div id="WLMint" class="wrapper" onLoad={isAddressWhitlisted()} style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "30px" }} >
        <div class="pard">
        {data.whitelistPeriod === true ? (
              <Button disabled={claimingNft ? 1 : 0} onClick={(e) => { e.preventDefault(); claimNFTWL(counter); getData(); }}>
              <h5>
                  <span >
                    {claimingNft ? "Processing." : "WL MINT"}
                  </span>
                </h5>
              </Button>
                  ) : (   
              <>        
          <Button disabled={claimingNft ? 1 : 0} onClick={(e) => { e.preventDefault(); claimNFTs(counter); getData(); }}>
          <h5>
              <span >
                {claimingNft ? "Processing." : "MINT NFT"}
              </span>
            </h5>
          </Button>
          </>
          )} 
        </div>

      </div>
      </>
            )
              }
              </>
      )}
    </div>
 */}

{/* Mint Button */}



<div class="PP3">
  
</div>


<footer>
  <div className='footerbutt'>
    <div className='foobtu' ><a href='https://cybertron-nft.gitbook.io/mechabros/' target={'blank'}  ><img style={{width:"40px"}} src={WhitePaper} /></a></div>
    <div className='foobtu' ><a href='https://discord.gg/abx8QcJu74' target={'blank'}  ><img style={{width:"60px"}} src={diss} /></a></div>
    <div className='foobtu' ><a href='https://twitter.com/CROtopia_NFT' target={'blank'}  ><img style={{width:"40px"}} src={tweet} /></a></div>
  </div>
</footer>


<div class="text-box" style={{display:"flex" , justifyContent:"center" , paddingTop:"30px" , paddingBottom:"30px" , marginRight:"30px" }} >
    <a href="#buldaar" class="btn btn-white btn-animate ScrollUp ">Scroll Up</a>
</div>



                           
{/* <a href='#buldaar'><div className='espan ScrollUp'>  ScrollUp</div> </a> */}


</main>
  );
}

export default HomePage;
