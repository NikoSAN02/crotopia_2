import { Typography} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";

// IMAGES IMPORT

import diss from './assets/images/diss.png'; 
import tweet from './assets/images/tweet.png'; 
import trans2 from './assets/images/trans2.png'; 
import poster from './assets/images/poster.png'; 
import WhitePaper from './assets/images/whitepaper.png'; 
import GBot1 from './assets/images/GBot1.png'; 
import GBot2 from './assets/images/GBot2.png'; 
import GBot3 from './assets/images/GBot3.png'; 
import GBot4 from './assets/images/GBot4.png'; 


// import $ from 'jquery'; 
// import shadows from '@material-ui/core/styles/shadows';



function HomePageM() {

  const marquee ="Metaverse centric project which consists of troops assembled to conquer the metaverse with their own individual identities. Each Crotopia NFT is rigged to make them compatible to be your own personal identities in the metaverse. Crotopia is ready to take the world by storm with their diverse set of weapons, skills and Utilities.";
  const team = "A team is defined as a group of people who perform interdependent tasks to work toward accomplishing a common mission or specific objective. Some teams have a limited life: for example, a design team developing a new product, or a continuous process improvement team organized to solve a particular problem.";
  const BBDes ="Metaverse centric project which consists of troops assembled to conquer the metaverse with their own individual identities. Each Crotopia NFT is rigged to make them compatible to be your own personal identities in the metaverse. Crotopia is ready to take the world by storm with their diverse set of weapons, skills and Utilities.";
  
  const dispatch = useDispatch();
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const [feedback, setFeedback] = useState();
	const [claimingNft, setClaimingNft] = useState(false);

	const [counter, setCounter] = useState(1);
	const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  var isWhiteList = false;

	if (counter <= 1) {
		decrementCounter = () => setCounter(1);
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
    //console.log(gasPrice);
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

<main> 

<div className='Desc'>
<Typography style={{ padding:"15px", fontSize:"15px", fontWeight:'700',  }}>{BBDes}</Typography>
</div>


<div className="photus boxxy">
  <div className="special">
    <div className="imgBx">
      <img style={{width:"160px",}} src={trans2}></img>
    </div>
    <div className="contentBx aniglo">
      <h2>Crotopia</h2>
      <div className="size">
        <h3>Crotopia for life </h3>
      </div>
      <div className="color">
      </div>
      <a href="#mintus">Mint Now!</a>
    </div>
  </div>
</div>


<marquee className='marqueee' id='mintus'>  
{marquee} {marquee} {marquee} {marquee} 
</marquee>

{/* MINT Button */}

      <div className='mintstation mintoo'>


      <div className='feedbackm'>{feedback}</div>
        <div className='total_supplym' style={{paddingBottom:"30px"}} >{data.totalSupply}/1000</div>
        {Number(data.totalSupply) === 1000 ? (
          <>
            <span className='salem'>The sale has ended.</span>
          </>
        ) : (
        <>
        {blockchain.account === "" ||
            blockchain.smartContract === null ? (
            <span className='textwm'>Please Connect Wallet</span>
            ) : (
              <>
<div id="WLIncDecCounter" className='InDe' >
  
<div className='small_buttons' style={{ paddingTop:"5px", paddingBottom:"5px",  marginBottom:"20px", marginRight:"40px"}} >
  <Button onClick={(e) => {e.preventDefault();decrementCounter();}}>-</Button>
  </div>
  <span style={{fontSize:"30px", fontWeight:"800",}} >
     <Display message={counter}/> </span>   
     <div className='small_buttons' style={{ paddingTop:"5px", paddingBottom:"5px",  marginBottom:"20px", marginLeft:"40px" }} >  
     <Button onClick={(e) => {e.preventDefault(); incrementCounter(); }}> + 
     </Button>
     </div>  
  </div>  



<div id="WLMint" class="wrapper" onLoad={isAddressWhitlisted()} style={{ paddingLeft:"60px", paddingRight:"20px" , paddingTop:"30px"}} >
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

{/* Mint Button */}


<img style={{display:"flex", justifyContent:"center", width:"300px" ,height:"auto"}} src={poster} />


<marquee className='marqueee' id="gallery">
{marquee} {marquee} {marquee} {marquee}  
</marquee>


<div className='BroTeam' >#Crotopia-GALLERY</div>
<div className='maingall' >

  <div class="galway">
    <div class="cards">
      <div class="card card-one">
        <p class="date"><img style={{width:"200px"}} src={GBot1} /></p>
        <p class="date">BOT<a style={{color:"rgb(118, 232, 240)"}}>: #TALOS</a></p>
      </div>
      
      <div class="card card-two">
        <p class="date"><img style={{width:"200px"}} src={GBot2} /></p>
        <p class="date">BOT <a style={{color:"rgb(118, 232, 240)"}}>: #NUKE</a></p>
      </div>
      
      <div class="card card-three">
  
        <p class="date"><img style={{width:"200px"}} src={GBot3} /></p>
        <p class="date">BOT <a style={{color:"rgb(118, 232, 240)"}}>: #BUNNIE</a></p>
      </div>
      
      <div class="card card-four">

        <p class="date"><img style={{width:"200px"}} src={GBot4} /></p>
        <p class="date">BOT <a style={{color:"rgb(118, 232, 240)"}}>: #ULTRON</a></p>
      </div>
    </div>
  </div>
  </div>


  <div style={{ fontSize:"15px", fontWeight:"600" ,  display:"flex" , justifyContent:"center" , paddingTop:"20px" , paddingBottom:"20px" }} >More #Bros on Desktop site</div>

<div className='mobo'>
  <marquee className="marqueeTeam" id="theTeam" > {team}{team}{team}{team}</marquee>
  </div>
<div className='BroTeam' style={{}} >#Crotopia-TEAM</div>



                                                {/* TEAM */}

<div class="pepe">
  <div class="phrame phrame0">
    <div class="powder">
      <h2>0xKami<br/>Owner</h2>

      <div className='esocials' >
        <div className='ps1'>
        <a href='https://twitter.com/CROtopia_NFT' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>
        </div>

    </div>
  </div>
  <div class="phrame phrame1">
    <div class="powder">
      <h2>mrSniper <br/>UNITY Dev.</h2>

      <div className='esocials' >


        <div className='ps2'>
        <a href='https://twitter.com/0xmrsniper' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>

        </div>

      
    </div>
  </div>
  <div class="phrame phrame2">
    <div class="powder">
      <h2> Hazard <br/>3D Artist</h2>

      <div className='esocials' >
        <div className='ps2'>
        <a href='https://twitter.com/hazardtln' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>
        

        </div>


    </div>
  </div>
</div>
<div class="pepe2">
  <div class="phrame phrame3">
    <div class="powder">
      <h2>0xDinu <br/>Senior Dev.</h2>

      <div className='esocials' >

        <div className='ps2'>
        <a href='https://twitter.com/0xDinu' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>

        </div>


    </div>
  </div>
  <div class="phrame phrame4">
    <div class="powder">
      <h2>MilitantNoob <br/>UI/UX Design</h2>

      <div className='esocials' >

        <div className='ps2'>
        <a href='https://twitter.com/MilitantNoob' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>
        
        </div>


    </div>
  </div>
  <div class="phrame phrame5">
    <div class="powder">
      <h2>David <br/>Contr. Auditor</h2>

      <div className='esocials' >

        <div className='ps2'>
        <a href='https://twitter.com/davidpius10' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>
        
        </div>


    </div>
  </div>
</div>

<div class="pepe">
  <div class="phrame phrame6">
    <div class="powder">
      <h2>Wavy <br/>Manager</h2>

      <div className='esocials' >
        <div className='ps1'>
        <a href='https://discord.gg/B6UUUzTrvJ' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={diss}/></a>
        </div>

        <div className='ps2'>
        <a href='https://twitter.com/Wavy_Eh' target={"blank"}><img style={{ width:'30px', height:'auto',}} src={tweet}/></a>
        </div>

        </div>

      
    </div>
  </div>
</div>


<footer>
  <div className='footerbutter'>
    <div className='foobtu' ><a href='https://cybertron-nft.gitbook.io/mechabros/' target={'blank'}  ><img style={{width:"15px"}} src={WhitePaper} /></a></div>
    <div className='foobtu' ><a href='https://discord.gg/abx8QcJu74' target={'blank'}  ><img style={{width:"25px"}} src={diss} /></a></div>
    <div className='foobtu' ><a href='https://twitter.com/CROtopia_NFT' target={'blank'}  ><img style={{width:"15px"}} src={tweet} /></a></div>
  </div>
</footer>


<div style={{ display:"flex", justifyContent:"center" }}>
    <a href="#buldaar" class="btn btn-white btn-animate ScrollUp ">Scroll Up</a>
</div>

</main>
  );
}

export default HomePageM;
