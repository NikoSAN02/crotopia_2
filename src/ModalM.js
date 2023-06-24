import React from "react";
import Button from "@material-ui/core/Button";
import './styles/modal.css';
import './styles/modalM.css';

import metamask from './assets/images/metamask.png';
import defi from './assets/images/defi.png';

export default function SelectWalletModal(props) {
    const { handleNetworkSwitch, handleDefiConnect } = props;
    return (props.trigger)? (
        <div>
        <p className='writtenm' >Please Select Wallet</p>
      <div className="two-walletsm" >
          <Button style={{  padding:"5px" }}
            onClick={() => {
            handleNetworkSwitch();
                props.setTrigger(false)
            }}
            w="100%">
              <span className="wallet-metam" > <img className="wall-imgm" style={{width:"30px", height:"auto", paddingRight:"4px",}} src={metamask}></img> Metamask</span>
          </Button>
          <Button style={{  padding:"5px"}}
            variant="outline"
            onClick={() => {
            handleDefiConnect();
                props.setTrigger(false)
            }}
            w="100%">
              <span className="wallet-defim" > <img className="wall-imgm" style={{width:"30px", height:"auto", paddingRight:"4px",}} src={defi}></img> Defi-Wallet</span>
        </Button>
        {/* <Button onClick={() => props.setTrigger(false)}>Close</Button> */}
        </div>
        </div>
    ) : "";
}