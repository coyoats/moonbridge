document.getElementById("con").addEventListener("click", function() {
    attemptConnect();
  });

document.getElementById("go1").addEventListener("click", function() {
    if (document.getElementById("quantity").value == '') {
        alert("Amount field cannot be empty!")
    }
    amt = new web3.utils.BN(web3.utils.toWei(document.getElementById("quantity").value,'ether'));
    intbrickbalance = new web3.utils.BN(brickbalance);
    if (amt.lte(intbrickbalance)) {
        web3.eth.getAccounts().then(function(acc){
        
            accounts = acc;
            BRICKcontract.methods.allowance(accounts[0], bridge1.options.address).call().then(function(res){
                
                allowance = new web3.utils.BN(res);

                if (amt.gt(allowance)) {
                    BRICKcontract.methods.approve(bridge1.options.address, "99999999999999999999999999").send();
                }

                bridge1.methods.relayTokens(accounts[0], amt).send();
                
            });

            
        })
    }
    else{

        alert("Error! Please ensure that you have enough Bricks to bridge!");

    }

    
});

document.getElementById("go2").addEventListener("click", function() {
    if (document.getElementById("quantity2").value == '') {
        alert("Amount field cannot be empty!")
    }
    amt = new web3.utils.BN(web3.utils.toWei(document.getElementById("quantity").value,'ether'));
    intbrickbalance = new web3.utils.BN(brickbalance);
    if (amt.lte(intbrickbalance)) {
        web3.eth.getAccounts().then(function(acc){
        
            accounts = acc;
            BRICKcontract.methods.allowance(accounts[0], bridge1.options.address).call().then(function(res){
                
                allowance = new web3.utils.BN(res);

                if (amt.gt(allowance)) {
                    BRICKcontract.methods.approve(bridge1.options.address, "99999999999999999999999999").send();
                }

                bridge1.methods.relayTokens(accounts[0], amt).send();
                
            });

            
        })
    }
    else{

        alert("Error! Please ensure that you have enough Bricks to bridge!");

    }

    
});

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);

  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
  }

function attemptConnect() {
      try {
          ethereum.request({
              method: 'eth_requestAccounts'
          }).then(function(res) {
              updateBalance(res[0]);
              update();
          });
          web3 = new Web3(web3.currentProvider);

      } catch (error) {
          document.getElementById("status").innerHTML = "Connection fail, try again";
      }


      if (window.ethereum === undefined) {
        document.getElementById("con").hidden=true;
        document.getElementById("connected").hidden=true;
        document.getElementById("status").innerHTML = "Please install Metamask to continue";
    } 
    else {
        if (window.ethereum.networkVersion==="4"){
          document.getElementById("status").innerHTML = "Connected to Rinkeby! Good to go!";
          document.getElementById("con").hidden=true;
          document.getElementById("connected").hidden=false;   
        setInterval(function() {
        update();
        }, 3000);
        ethereum.on('accountsChanged', function(accounts) {
            if (web3.eth.accounts[0] === undefined) {
                document.getElementById("con").hidden=false;
                document.getElementById("connected").hidden=true;
                document.getElementById("status").innerHTML = "Wallet disconnected";
            } else {
                updateBalance(web3.eth.accounts[0]);
            }
        });
        }
        else{
            document.getElementById("con").hidden=true;
            document.getElementById("connected").hidden=true;
            document.getElementById("status").innerHTML = "Wrong network! Please set network to Rinkeby in Metamask";
        }
    }
  }

function updateBalance(add){
   
    address = add
    ercabi = JSON.parse(`[
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]`)

    bridge1abi = JSON.parse(`[{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_value","type":"uint256"}],"name":"relayTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"version","type":"uint256"},{"name":"implementation","type":"address"}],"name":"upgradeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"implementation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"upgradeabilityOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"version","type":"uint256"},{"name":"implementation","type":"address"},{"name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferProxyOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"previousOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"ProxyOwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"version","type":"uint256"},{"indexed":true,"name":"implementation","type":"address"}],"name":"Upgraded","type":"event"}]`)
     BRICKaddress = "0xe0d8d7b8273de14e628d2f2a4a10f719f898450a"
     brick1add = "0xD925002f88279776dEB4907bA7F8dC173e2EA7a7"
     BRICKcontract=new web3.eth.Contract(ercabi, BRICKaddress, {from:add, gasPrice:1000000000})
     BRICKcontract.methods.balanceOf(add).call().then(function(res){brickbalance = new web3.utils.BN(res);document.getElementById("brickbalance").innerHTML = "Your BRICK balance: "+(web3.utils.fromWei(brickbalance));})
     bridge1=new web3.eth.Contract(bridge1abi, brick1add, {from:add, gasPrice:1000000000})

}
function update(){
    if (typeof(address) !== "undefined"){
    updateBalance(address);
}
}