import { useEffect, useState } from 'react';

const Home = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [priceFilter, setPriceFilter] = useState<number>(0.1);
  const [priceTemp, setPriceTemp] = useState<number>(0.1);

  useEffect(() => {
    const ws = new WebSocket("wss://pumpportal.fun/api/data");
    let mintAddress: any = undefined;

    ws.onopen = function open() {
      let hasBuy = false;
      let payload = {
        method: "subscribeNewToken",
      };
      if (hasBuy === false) {
        hasBuy = true;
        console.log("has Buy : " + hasBuy);
        ws.send(JSON.stringify(payload));
      }
    };

    ws.onmessage = async function message(event) {
      const json_data = JSON.parse(event.data);
      console.log(json_data);

      if (json_data.txType === "create") {
        if (json_data.solAmount >= priceFilter) {
          console.log("Name : " + json_data.name);
          console.log("Symbol : " + json_data.symbol);
          console.log("Amount : " + json_data.solAmount);
          console.log("Mint Address : " + json_data.mint);
          const uri = json_data.uri;
          const uri_data = await fetch(uri, {
            method: "GET",
          }).then(async (res) => {
            const data = await res.json();
            return data;
          });
          console.log("URI : " + uri_data.image);
          json_data.image = uri_data.image;


          // console.log("URI : " + JSON.stringify(uri_data));


          console.log("Site : https://pump.fun/coin/" + json_data.mint + "/");
          if (mintAddress === undefined) {
            mintAddress = json_data.mint;
          }
          setTokens((prevTokens) => {
            const newTokens = [{ ...json_data, mintAddress }, ...prevTokens];
            return newTokens.slice(0, 10);
          });
          console.log(mintAddress);
          console.log("====================================");
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [priceFilter]);

  return (
    <div className='bg-white rounded-xl p-3 space-y-3'>
      <div className="flex justify-end">
        <input
          type="number"
          className="p-2 border border-gray-300 rounded"
          value={priceTemp}
          onChange={(e) => setPriceTemp(parseFloat(e.target.value))}
          placeholder="Price Filter"
        />
        <button className="p-2 bg-blue-500 text-white rounded-lg ml-2 cursor-pointer" onClick={() => {
          setPriceFilter(priceTemp);
          alert("Price Filter Applied");
        }}> Apply </button>
      </div>
      <div className="space-y-4 bg-white ">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="p-2 bg-gray-100 rounded-lg shadow-sm border border-gray-300"
          >
            <div className="flex gap-2 items-start">
              <div className="">
                <img src={token.image} alt={token.name} className="w-20 h-20 rounded-2xl" />
              </div>
              <div className="">
                <h2 className="text-lg font-semibold">{token.name}</h2>
                <p className="text-sm text-gray-600">Symbol: {token.symbol}</p>
                <p className="text-sm text-gray-600">Amount: {token.solAmount}</p>
                <p className="text-sm text-gray-600">Mint Address: {token.mint}</p>
                <a href={`https://pump.fun/coin/${token.mint}/`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Token
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;