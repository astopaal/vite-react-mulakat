import { useState } from "react";
import "./App.css";

function App() {
  const [prices, setPrices] = useState([]); //fiyat listesi
  //const [balance, setBalance] = useState(0); //bakiye
  // const [activeTransaction, setActiveTransaction] = useState(false)
  let balance = 0;
  let activeTransaction = false;
  let transactionBalance = 0;
  let maxPurchase = 0;

  const buy = (price) => {
    //alış
    balance = balance - price;
  };

  const sell = (price) => {
    //satış
    balance = balance + price;
  };

  //hesaplama fonksiyonu bir sonraki günü mevcut günle karşılaştırır.
  //fiyat artış veya azalış durumuna göre bir sonraki güne geçer veya mevut günde alım veya satım yapar
  const calculate = (prices) => {
    console.log("FİYATLAR : ", prices);

    for (let i = 0; i < prices.length - 1; i++) {
      console.log("mevcut fiyat : ", prices[i]);
      console.log("yarınki fiyat : ", prices[i + 1]);
      //örnek lsitelere dayanarak en fazla 2 gün ileriye kadar kontrol yapar
      if (prices[i] < prices[i + 1]) {
        if (!activeTransaction) {
          console.log(
            "yarın bugünden pahalı ve aktif işlem olmadığı için satın alım yapılıyor"
          );
          if (balance > 0) {
            maxPurchase = Math.floor(balance / prices[i]);
            buy(prices[i] * maxPurchase);
            transactionBalance = prices[i] * maxPurchase;
          } else {
            buy(prices[i]);
          }
          console.log("satın alım yapıldı mevcut bakiye : ", balance);
          activeTransaction = true;
        } else {
          if (i+1 !== prices.length-1) {
            console.log(
              "aktif işlem var sonraki gün bekleniyor, mevcut bakiye : ",
              balance
            );
            continue;
          } else {
            console.log(
              "son gün olduğu için satış yapılıyor, şu an bakiye : ",
              balance
            );
            if (maxPurchase > 0) {
              sell(prices[i+1] * maxPurchase);
            } else {
              sell(prices[i+1]);
            }
            console.log('satış işlemi tamamlandı')
          }
        }
      } else {
        if (activeTransaction) {
          console.log(
            "bugün yarından pahalı, fiyat düşecek, satış yapılıyor bakiyeniz : ",
            balance
          );
          if (maxPurchase > 0) {
            sell(prices[i] * maxPurchase);
          } else {
            sell(prices[i]);
          }
          console.log("satış işlemi tamamlandı, bakiye : ", balance);
          activeTransaction = false;
          maxPurchase = 0;
          transactionBalance = 0;
        } else {
          console.log(
            "bugün yarından pahalı, ancak işlem yok, daha uygun fiyattan alım için yarın bekleniyor..."
          );
          continue;
        }
      }
    }
    console.log("Maximum kar : ", balance + transactionBalance);
  };

  return (
    <div>
      <input
        style={{
          padding: 10,
          marginRight: 20,
          minWidth: 300,
        }}
        id="prices-input"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setPrices([...prices, Number(e.target.value)]);
            e.target.autoFocus;
            e.target.value = "";
            console.log(prices);
          }
        }}
        className="prices-input"
        placeholder="Fiyatları sırayla girin ve ENTER'a basın..."
      />
      <button
        className="btn-calculate"
        onClick={() => {
          calculate(prices);
        }}
      >
        HESAPLA
      </button>
    </div>
  );
}

export default App;
