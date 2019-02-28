const sha256 = require('sha256');

class Block {
  constructor(index, timestamp, data, prevHash,transactions) {
	    this.index = index;
	    this.timestamp = timestamp;
	    this.data = JSON.stringify(data);
	    this.prevHash = prevHash;
	    this.nonce = 1;
	    this.transactions = transactions;
	    this.thisHash = this.calculateHash()

	   
	}

	createTransaction(transaction){
   		this.pendingTransactions.push(transaction);
	}

	calculateHash () {
			const toReturn = sha256(this.index +this.timestamp + this.data + this.prevHash + this.nonce + this.transactions)
			return toReturn;
	}

	mineBlock(difficulty) {

      while(this.thisHash.substring(0, difficulty) !== Array(difficulty + this.nonce).join("0").substring(0, difficulty)){
      	console.log(this.thisHash.substring(0, difficulty), Array(difficulty + this.nonce).join("0").substring(0, difficulty))
        this.nonce++;
        this.thisHash = this.calculateHash();
      }
      console.log("Block mined: " + this.thisHash);
    }

}


class Blockchain {
	constructor(){
		this.chain = new Array(this.createGenesisBlock())
		this.difficulty = 3
		this.pendingTransactions =[]
		this.miningReward = 100
		//this.previousBlock = this.chain[this.chain.length];

	}

	lastBlock(){
		if(this.chain.length == 1) return this.chain[0]
		else return this.chain[this.chain.length -1]
	}

	createGenesisBlock () {
	 	const toReturn = new Block(0, Date.now(), 'Genesis Block', '0' , []);
	 	return toReturn;
	}
	
	


	checkValid() {

	        for(let i = 1; i < this.chain.length; i++) {
	            const currentBlock = this.chain[i];
	            const previousBlock = this.chain[i - 1];
	            if (currentBlock.thisHash !== currentBlock.calculateHash()) {
	                return false;
	            }
	            if (currentBlock.prevHash !== previousBlock.thisHash) {
	                return false;
	            }
	        }
	        return true;

	 }

	minePendingTransactions(miningRewardAddress){
       let block = new Block(this.chain.length ,Date.now(), 0, this.lastBlock().thisHash,this.pendingTransactions);
      	block.mineBlock(this.difficulty);

       console.log('Block successfully mined!');
       this.chain.push(block);

       this.pendingTransactions =[ new Transaction(null, miningRewardAddress, this.miningReward) ]
   
   }

   getBalanceOfAddress(address){
       let balance = 0;

       for(const block of this.chain){
       	console.log(block.transactions)
           for(const trans of block.transactions){
               if(trans.fromAddress === address){
                   balance -= trans.amount;
               }

               if(trans.toAddress === address){
                   balance += trans.amount;
               }
           }
       }

       return balance;
   }

}



class Transaction{
   constructor(fromAddress, toAddress, amount){
       this.fromAddress = fromAddress;
       this.toAddress = toAddress;
       this.amount = amount;
   }
}

var myChain = new Blockchain()
//myChain.addBlock("hello everyone my name is gift")
//myChain.addBlock("hello everyone ")
myChain.minePendingTransactions("335fafas5asfas4fas")
myChain.minePendingTransactions("335fafas5asfas4fas")
myChain.minePendingTransactions("335fafas5asfas4fas")

console.log(myChain.getBalanceOfAddress("335fafas5asfas4fas"), myChain.checkValid())
