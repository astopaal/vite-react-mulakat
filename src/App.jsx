import { useState } from "react";
import "./App.css";

function App() {
  const [prices, setPrices] = useState([]); //fiyat listesi
  //const [balance, setBalance] = useState(0); //bakiye
  // const [activeTransaction, setActiveTransaction] = useState(false)
  let balance = 0
  let activeTransaction = false;
  let transactionBalance = 0
  let maxPurchase = 0

  const buy = (price) => {
    //alış
    balance = (balance - price);
  };

  const sell = (price) => {
    //satış
    balance = (balance + price);
  };

  const handleClick = () => {
    setPrices([
      ...prices,
      Number(document.getElementById("prices-input").value),
    ]),
      (document.getElementById("prices-input").value = "");
  };



  //hesaplama fonksiyonu bir sonraki günü mevcut günle karşılaştırır.
  //fiyat artış veya azalış durumuna göre bir sonraki güne geçer veya mevut günde alım veya satım yapar
  const calculate = (prices) => {
    for (let i = 0; i < prices.length - 1; i++) {
      console.log("mevcut fiyat : ", prices[i]);
      console.log("yarınki fiyat : ", prices[i + 1]);
      //örnek lsitelere dayanarak en fazla 2 gün ileriye kadar kontrol yapar
      if (prices[i] < prices[i + 1]) {
        if (!activeTransaction) {
          console.log(
            "yarın bugünden pahalı ve aktif işlem olmadığı için satın alım yapılıyor"
          );
          if (balance>0) {
            maxPurchase = Math.floor(balance / prices[i]);
            buy(prices[i] * maxPurchase);
            transactionBalance = prices[i] * maxPurchase
          }
          else{
            buy(prices[i]);
          }
          console.log("satın alım yapıldı mevcut bakiye : ", balance);
          activeTransaction = true;
          
        } else {
          console.log(
            "aktif işlem var sonraki gün bekleniyor, mevcut bakiye : ",
            balance
          );
          continue;
        }
      } else {
        if (activeTransaction) {
          console.log(
            "bugün yarından pahalı, fiyat düşecek, satım yapılıyor bakiyeniz : ",
            balance
          );
          if (maxPurchase>0) {
          sell(prices[i] * maxPurchase);

          }
          else {
            sell(prices[i])
          }
          console.log("satış işlemi tamamlandı, bakiye : ", balance);
          activeTransaction = false
          maxPurchase = 0
          transactionBalance = 0
        } else {
          console.log(
            "bugün yarından pahalı, ancak işlem yok, daha uygun fiyattan alım için yarın bekleniyor..."
          );
          continue;
        }
      }
    }
    console.log("Maximum kar : ", balance+transactionBalance)
  };

  return (
    <div>
      <input
        style={{
          padding: 10,
          marginRight: 20,
        }}
        id="prices-input"
        autoFocus
        className="prices-input"
        placeholder="Fiyatları tek tek girin..."
      />

      <button 
      className="btn-calculate" 
      onClick={() => {
        handleClick()
      }}>
        EKLE
      </button>
      <button
        className="btn-calculate"
        onClick={() => {
          console.log("FİYATLAR : ", prices);
          calculate(prices);
        }}
      >
        HESAPLA
      </button>
    </div>
  );
}

export default App;
