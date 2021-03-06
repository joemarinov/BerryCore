// /** 
// * This tests the oracle upgrade functions
// */
// const Web3 = require('web3')
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
// const helper = require("./helpers/test_helpers");
// const BerryMaster = artifacts.require("./BerryMaster.sol");
// const Berry = artifacts.require("./Berry.sol"); // globally injected artifacts helper
// var oracleAbi = Berry.abi;
// var oracleByte = Berry.bytecode;
// var OldBerry = artifacts.require("./oldContracts/OldBerry.sol")
// var oldBerryABI = OldBerry.abi;

// var OldBerry2 = artifacts.require("./oldContracts2/OldBerry2.sol")
// var oldBerry2ABI = OldBerry2.abi;
// var UtilitiesTests = artifacts.require("./UtilitiesTests.sol")
// var masterAbi = BerryMaster.abi;
// var api = "json(https://api.gdax.com/products/BTC-USD/ticker).price";
// var api2 = "json(https://api.gdax.com/products/ETH-USD/ticker).price";

// contract('Upgrade Tests', function(accounts) {
//   let oracleBase;
//   let oracle;
//   let oracle2;
//   let master;
//   let oldBerry;
//   let oldBerry2;
//   let utilities;

//     it("Test upgrade no Q", async function () {
//               //deploy old, request, update address, mine old challenge.
//         oldBerry = await OldBerry.new()    
//         oracle = await BerryMaster.new(oldBerry.address);
//         master = await new web3.eth.Contract(masterAbi,oracle.address);
//         oracle2 = await new web3.eth.Contract(oldBerryABI,oldBerry.address);
//         for(var i = 0;i<6;i++){
//             //print tokens 
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[i],web3.utils.toWei('1100', 'ether')).encodeABI()})
//         }

//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,"i",1000,0).encodeABI()})
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
//         oldBerry2 = await OldBerry2.new()    
//         await oracle.changeBerryContract(oldBerry2.address)
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oldBerry2.address);
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData("api2","i2",5000,0).encodeABI()})
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",2,1200).encodeABI()})
//         }
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.addTip(1,0).encodeABI()})
//         for(var i=0; i<52;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(apix,x,1000,0).encodeABI()})
//         }
//         //Deploy new upgraded Berry
//         oracleBase = await Berry.new();
//         oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//         await oracle.changeBerryContract(oracleBase.address)
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
//         vars =  await oracle2.methods.getNewCurrentVariables().call()
//         for(var i = 0;i<5;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods.testSubmitMiningSolution("nonce",vars['1'],[1200,1300,1400,1500,1600]).encodeABI()})
//         }
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oracleBase.address);
//     });
//    it("Test upgrade with full queue", async function () {
//   		              //deploy old, request, update address, mine old challenge.
//         oldBerry = await OldBerry.new()    
//         oracle = await BerryMaster.new(oldBerry.address);
//         master = await new web3.eth.Contract(masterAbi,oracle.address);
//         oracle2 = await new web3.eth.Contract(oldBerryABI,oldBerry.address);
//         utilities = await UtilitiesTests.new(oracle.address)
//         for(var i = 0;i<6;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[i],web3.utils.toWei('1100', 'ether')).encodeABI()})
//         }
//         for(var i=0; i<52;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(apix,x,1000,50+i).encodeABI()})
//         }

//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
 
//         oldBerry2 = await OldBerry2.new()    
//         oracle2 = await new web3.eth.Contract(oldBerry2ABI,oracle.address);
//         await oracle.changeBerryContract(oldBerry2.address)
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oldBerry2.address);
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",52,1200).encodeABI()})
//         }
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.addTip(51,1).encodeABI()})
        
//         oracleBase = await Berry.new();
//         oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//         await oracle.changeBerryContract(oracleBase.address)
// 		for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",51,1200).encodeABI()})
//         }
//         vars =  await oracle2.methods.getNewCurrentVariables().call()
//         for(var i = 0;i<5;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods.testSubmitMiningSolution("nonce",vars['1'],[1200,1300,1400,1500,1600]).encodeABI()})
//         }
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oracleBase.address);

//    });
//     it("Test upgrade halfway through mining", async function () {
//                     //deploy old, request, update address, mine old challenge.
//         oldBerry = await OldBerry.new()    
//         oracle = await BerryMaster.new(oldBerry.address);
//         master = await new web3.eth.Contract(masterAbi,oracle.address);
//         oracle2 = await new web3.eth.Contract(oldBerryABI,oldBerry.address);
//         for(var i = 0;i<6;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[i],web3.utils.toWei('1100', 'ether')).encodeABI()})
//         }
//         for(var i=0; i<58;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(apix,x,1000,50+i).encodeABI()})
//         }

//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
//         oldBerry2 = await OldBerry2.new()    
//         await oracle.changeBerryContract(oldBerry2.address)
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oldBerry2.address);

//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",58,1200).encodeABI()})
//         }
//         oracleBase = await Berry.new();
//         oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//                for(var i = 0;i<3;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",57,1200).encodeABI()})
//         }
//         await oracle.changeBerryContract(oracleBase.address)
//         for(var i = 3;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",57,1200).encodeABI()})
//         }

//         vars =  await oracle2.methods.getNewCurrentVariables().call()
//         for(var i = 0;i<5;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods.testSubmitMiningSolution("nonce",vars['1'],[1200,1300,1400,1500,1600]).encodeABI()})
//         }
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oracleBase.address);
   
//     });
//    it("Test upgrade halfway through dispute", async function () {
//                         //deploy old, request, update address, mine old challenge.
//         oldBerry = await OldBerry.new()    
//         oracle = await BerryMaster.new(oldBerry.address);
//         master = await new web3.eth.Contract(masterAbi,oracle.address);
//         oracle2 = await new web3.eth.Contract(oldBerryABI,oldBerry.address);
//         for(var i = 0;i<6;i++){
//             //print tokens 
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[i],web3.utils.toWei('1100', 'ether')).encodeABI()})
//         }
//         for(var i=0; i<57;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(apix,x,1000,i).encodeABI()})
//         }
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
//         oldBerry2 = await OldBerry2.new()    
//         await oracle.changeBerryContract(oldBerry2.address)
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oldBerry2.address);
//         for(var i = 0;i<5;i++){
//           res = await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",57,1200+i).encodeABI()})
//         }
//         for(var i=0; i<52;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(apix,x,1000,0).encodeABI()})
//         }

//         //dispute piece
//         balance1 = await oracle.balanceOf(accounts[2]);
//         res = web3.eth.abi.decodeParameters(['uint256','uint256','uint256','bytes32'],res.logs['1'].data)
//         blocknum = await oracle.getMinedBlockNum(1,res[0]);
//         await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[1],web3.utils.toWei('5000', 'ether')).encodeABI()})
//         dispBal1 = await oracle.balanceOf(accounts[1])
//         await  web3.eth.sendTransaction({to: oracle.address,from:accounts[1],gas:7000000,data:oracle2.methods.beginDispute(57,res[0],2).encodeABI()});
//         count = await oracle.getUintVar(web3.utils.keccak256("disputeCount"));
//          assert(await oracle.isInDispute(57,res[0]), "should be in dispute")
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[3],gas:7000000,data:oracle2.methods.vote(1,true).encodeABI()});
//         await helper.advanceTime(86400 * 22);
//                 //Deploy new upgraded Berry
//         oracleBase = await Berry.new();
//         oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//         assert(await oracle.isInDispute(57,res[0]), "should still be in dispute1")
// 			await oracle.changeBerryContract(oracleBase.address)
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.tallyVotes(1).encodeABI()});
//                 await helper.advanceTime(86400 * 2 )
//                 assert(await oracle.isInDispute(57,res[0]), "should still be in dispute2")
//         await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:9000000,data:oracle2.methods.unlockDisputeFee(1).encodeABI()})
//          assert(await oracle.isInDispute(57,res[0]), "should still be in dispute3")
//          dispInfo = await oracle.getAllDisputeVars(1);
//         assert(dispInfo[7][0] == 57)
//         assert(dispInfo[7][1] == res[0])
//         assert(dispInfo[7][2] == 1202,"dispute info should be correct")
//         assert(dispInfo[2] == true,"Dispute Vote passed")
//         voted = await oracle.didVote(1, accounts[3]);
//         assert(voted == true, "account 3 voted");
//         voted = await oracle.didVote(1, accounts[5]);
//         assert(voted == false, "account 5 did not vote");
//         apid2valueF = await oracle.retrieveData(57,res[0]);
//         assert(apid2valueF == 1202 ,"value should now be zero this checks updateDisputeValue-internal fx  works");//note this will not be fixed if upgraded during
//         assert(await oracle.isInDispute(57,res[0]), "should still be in dispute")
//         balance2 = await oracle.balanceOf(accounts[2]);
//         dispBal2 = await oracle.balanceOf(accounts[1])
//         assert(balance1 - balance2 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")),"reported miner's balance should change correctly");
//         assert(dispBal2 - dispBal1 == await oracle.getUintVar(web3.utils.keccak256("stakeAmount")), "disputing party's balance should change correctly")
//         s =  await oracle.getStakerInfo(accounts[2])
//         assert(s != 1, " Not staked" );
//        await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[6],web3.utils.toWei('5000', 'ether')).encodeABI()})
//        await web3.eth.sendTransaction({to: oracle.address,from:accounts[6],gas:7000000,data:oracle2.methods.depositStake().encodeABI()})
//         for(var i = 0;i<6;i++){
//         	if(i !=2){
//         		  await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",56,1200).encodeABI()})
//         	}
//         }
//         vars =  await oracle2.methods.getNewCurrentVariables().call()
//         for(var i = 0;i<6;i++){
//         	if(i !=2){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods.testSubmitMiningSolution("nonce",vars['1'],[1200,1300,1400,1500,1600]).encodeABI()})
//         	}
//         }
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oracleBase.address);
//    });
//    it("Test switch partially through with tips added before new block", async function () {
//                 oldBerry = await OldBerry.new()    
//         oracle = await BerryMaster.new(oldBerry.address);
//         master = await new web3.eth.Contract(masterAbi,oracle.address);
//         oracle2 = await new web3.eth.Contract(oldBerryABI,oldBerry.address);
//         for(var i = 0;i<6;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.theLazyCoon(accounts[i],web3.utils.toWei('1100', 'ether')).encodeABI()})
//         }
//         for(var i=0; i<58;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(apix,x,1000,50+i).encodeABI()})
//         }

//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
//         oldBerry2 = await OldBerry2.new()    
//         await oracle.changeBerryContract(oldBerry2.address)
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oldBerry2.address);

//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",58,1200).encodeABI()})
//         }
//         //Deploy new upgraded Berry
//         oracleBase = await Berry.new();
//         oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//         for(var i = 0;i<3;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",57,1200).encodeABI()})
//         }
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.addTip(31,1000).encodeABI()})
//         await oracle.changeBerryContract(oracleBase.address)
//         await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.addTip(41,20000).encodeABI()})
//         for(var i = 3;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",57,1200).encodeABI()})
//         }
//         vars =  await oracle2.methods.getNewCurrentVariables().call()
//         for(var i = 0;i<5;i++){
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods.testSubmitMiningSolution("nonce",vars['1'],[1200,1300,1400,1500,1600]).encodeABI()})
//         }
//         assert(await oracle.getAddressVars(web3.utils.keccak256("berryContract")) == oracleBase.address);
//         data = await oracle2.methods.getNewVariablesOnDeck().call();
//         var x =0
//         for(var i = 0; i < 5; i++){
//         	if(data[0][i] == '41'){
//         		x = x+1
//         		assert(data[1][i] >20000, 'Th');
//         	}
//         	if(data[0][i] == '31'){
//         		x = x+1
//         		assert(data[1][i] >1000, 'The');
//         	}
// 	    }
//    });
//       it("Test initial difficulty drop", async function () {
//    	           //deploy old, request, update address, mine old challenge.
//         oldBerry = await OldBerry.new()    
//         oracle = await BerryMaster.new(oldBerry.address);
//            oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//         master = await new web3.eth.Contract(masterAbi,oracle.address);
//         oldBerryinst = await new web3.eth.Contract(oldBerryABI,oldBerry.address);
//         for(var i = 0;i<6;i++){
//             //print tokens 
//             await web3.eth.sendTransaction({to:oracle.address,from:accounts[0],gas:7000000,data:oldBerryinst.methods.theLazyCoon(accounts[i],web3.utils.toWei('1100', 'ether')).encodeABI()})
//         }
//         for(var i=0; i<57;i++){
//             x = "USD" + i
//             apix = api + i
//             await web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oldBerryinst.methods.requestData(apix,x,1000,i).encodeABI()})
//         }
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",1,1200).encodeABI()})
//         }
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",57,1200).encodeABI()})
//         }
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",56,1200).encodeABI()})
//         }
//         diff1 = await oracle.getCurrentVariables();
//         //Deploy new upgraded Berry
//         oracleBase = await Berry.new();
//         oracle2 = await new web3.eth.Contract(oracleAbi,oracle.address);
//         await oracle.changeBerryContract(oracleBase.address)
//         for(var i = 0;i<5;i++){
//           await web3.eth.sendTransaction({to:oracle.address,from:accounts[i],gas:7000000,data:oracle2.methods['testSubmitMiningSolution(string,uint256,uint256)']("nonce",55,1200).encodeABI()})
//         }
//         diff2 = await oracle.getCurrentVariables();
//         assert(diff2[2] < diff1[2]/ 2,"difficulty should drop")
//    });
//  });    