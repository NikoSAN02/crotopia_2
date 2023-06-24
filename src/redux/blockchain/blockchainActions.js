// constants
import Web3EthContract from "web3-eth-contract";
import { DeFiWeb3Connector } from "deficonnect";
import Web3 from "web3";
import SmartContract from "../../contracts/crotopia.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connectMM = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    await window.ethereum.request({
      method: "eth_requestAccounts",
  });
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        
        // const NetworkData = await SmartContract.networks[networkId];
          if (networkId == 25) {
            const SmartContractObj = new Web3EthContract(
              SmartContract,
              "0x87Fc368Db5Ab03FCd34626B673dEAef430718637"
            );
          
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            try{
              window.location.reload();
            } catch (error)
            {
              console.log(error);
            }
          });
          // Add listeners end
        
          } else {
            window.alert("Change network to Cronos");
      }
      } catch (err) {
        window.alert("Something went wrong");
      }
    } else {
      window.alert("Install Metamask");
    }
  };
};



export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

//defi connect extension
export const connectWC = () => {
  return async (dispatch) => {
    dispatch(connectRequest());

    var accountWC = "";
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [25],
      rpc: {
        [25]:
        "https://evm.cronos.org/",
      },
      pollingInterval: 15000,
    });
    await connector.activate();
    const provider = await connector.getProvider();
    let web3 = new Web3(provider);
    

    Web3EthContract.setProvider(provider);
    
    const accounts = await web3.eth.getAccounts();
    const networkId = await provider.request({
      method: "net_version",
    });
    
    if (networkId  == 25) {
      const SmartContractObj = new Web3EthContract(
        SmartContract,
        "0x87Fc368Db5Ab03FCd34626B673dEAef430718637"
      );

      dispatch(
        connectSuccess({
          account: accounts[0],
          smartContract: SmartContractObj,
          web3: web3,
        })
      );

       // Add listeners start
       provider.on("accountsChanged", (accounts) => {
        dispatch(updateAccount(accounts[0]));
      });
      provider.on("chainChanged", () => {
        try{
          window.location.reload();
        } catch (error)
        {
          console.log(error);
        }
      });

    }
    else {
      window.alert(
        "Switch your Wallet to blockchain network " +
          "Cronos Testnet"
      );
    }
  } 
};