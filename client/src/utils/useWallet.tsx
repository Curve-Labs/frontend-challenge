import { useEffect, useState } from "react";
// web3
import web3 from "web3";
// Manage wallet connection
const useWallet = () => {
  // Save the web3 instance
  const [wallet, setWallet] = useState<web3 | null>(null);

  // Set effects
  useEffect(() => {
    // Set provider for web3
    const web3Instance = new web3("http://localhost:9545");
    setWallet(web3Instance);
  }, []);

  return { wallet };
};
export default useWallet;
