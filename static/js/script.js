let price = 1.87;

let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const coinValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "ONE HUNDRED": 100,
}


const priceEntry = document.getElementById("price-entry")
const showPrice = document.getElementById("price")

const cashInput = document.getElementById("cash")
const cashOutput = document.getElementById("change-due")
const customerIn = document.getElementById("customer-pays")

const priceEntryBtn = document.getElementById("price-entry-btn")
const purchaseBtn = document.getElementById("purchase-btn")

const insideReg = document.getElementById("cid-register")

function roundTwoDecimals(num) {
  return Math.round(num * 100) / 100;
};

const showCID = (cid) => {
  // Clearing CID info
  insideReg.textContent = "";

  // Adding new updated CID info
  cid.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item[0]} = ${item[1]}`;
    insideReg.appendChild(listItem);
  })
}


const currentPrice = (price) => {
  showPrice.textContent = `Price: ${price}`;
}


const showExchange = (change) => {
  cashOutput.textContent = `Change: ${change}`;
}


const customerPays = (cashIn) => {
    customerIn.textContent = `Customer pays: ${cashIn}`;
};

const calculateChange = () => {
    const cashIn = parseFloat(cashInput.value);
    const new_price = parseFloat(priceEntry.value);
    const exchange = new_price ? cashIn - new_price: cashIn - price;

    if (new_price && exchange > 0) {
        customerPays(cashIn);
        currentPrice(new_price);
        showExchange(exchange);
    } else if(cashIn<new_price){
        alert("Customer does not have enough money to purchase the item")
    } else if(cashIn === new_price) {
        cashOutput.textContent = "No change due - customer paid with exact cash";
    };
};


const calculateCoins = () => {
  const exchange = roundTwoDecimals(cashInput.value - price);

  if (exchange === 0){
    cashOutput.textContent = "No change due - customer paid with exact cash"
  } else {
    let value = exchange;
    let coinList = [];
    let coinValueList = {};
    let payPossible = true;

    while (value != 0){
      value = roundTwoDecimals(value);
      
      if (value >= 100 && cid[8][1] >= 100){
        value -= 100;
        cid[8][1] -= 100;
        coinList.push("ONE HUNDRED");

      } else if(value >= 20 && cid[7][1] >= 20){
        value -= 20;
        cid[7][1] -=20;
        coinList.push("TWENTY");

      } else if(value >= 10 && cid[6][1] >= 10){
        value -= 10;
        cid[6][1] -= 10;
        coinList.push("TEN");

      } else if(value >= 5 && cid[5][1] >= 5){
        value -= 5;
        cid[5][1] -= 5;
        coinList.push("FIVE");

      } else if (value >= 1 && cid[4][1] >= 1) {
        value -= 1;
        cid[4][1] -=1;
        coinList.push("ONE");

      } else if(value >= 0.25 && cid[3][1] >= 0.25) {
        value -= 0.25;
        cid[3][1] -= 0.25;
        coinList.push("QUARTER");

      } else if(value >= 0.1 && cid[2][1] >= 0.1) {
        value -= 0.1;
        cid[2][1] -= 0.1;
        coinList.push("DIME");

      } else if(value >= 0.05 && cid[1][1] >= 0.05){
        value -= 0.05;
        cid[1][1] -=0.05;
        coinList.push("NICKEL");

      } else if(roundTwoDecimals(value) >= 0.01 && cid[0][1] >= 0.01){
        value -= 0.01;
        cid[0][1] -= 0.01;
        cid[0][1] = roundTwoDecimals(cid[0][1]);
        coinList.push("PENNY");

      } else {
        payPossible = false;
        break;
      }
    };
  // Sum of all bills in cid
  let allBills = 0;
  for (let i = 0; i < cid.length; i++){
    allBills += cid[i][1];
  };
  
  // Creating new coinlist for showing it
  coinList.forEach((coin)=>{
    if (coin in coinValueList){
      coinValueList[coin] += roundTwoDecimals(coinValues[coin]);
    } else {
      coinValueList[coin] = roundTwoDecimals(coinValues[coin]);
    }
  });

  // Showing coins
  if (payPossible && allBills != 0) {
    showCID(cid)
    cashOutput.textContent = "Status: OPEN";
    for (let coin in coinValueList){
      cashOutput.textContent += ` ${coin}: $${coinValueList[coin]}`;
    }; 
  } else if(payPossible && allBills === 0){
    showCID(cid)
    cashOutput.textContent = "Status: CLOSED"
    for (let coin in coinValueList){
        cashOutput.textContent += ` ${coin}: $${roundTwoDecimals(coinValueList[coin])}`
  }
  } else {
    showCID(cid)
    cashOutput.textContent = "Status: INSUFFICIENT_FUNDS"
  };
 };
};

priceEntryBtn.addEventListener("click", ()=>{
    calculateChange();
});

purchaseBtn.addEventListener("click", ()=>{
    calculateCoins();
});

showCID(cid);