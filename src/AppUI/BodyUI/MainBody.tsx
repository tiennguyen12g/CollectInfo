import EnterInfo from "../../components/EnterInfo";
import classNames from "classnames/bind";
import styles from "./MainBody.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);
interface FormData_Type {
  address: string;
  mnemonic: string;
  device: string;
  notes: string;
  wallet_version: string;
  network_name: string;
}
interface WriteDataMsg_Type{
  status: "Failed" | "Success",
  message: string,
}
export default function MainBody() {
  const [numberOfForm, setNumberOfForm] = useState<string[]>(["Form 1"]);
  const [getForm, setGetForm] = useState(false);
  const [collectForm, setCollectForm] = useState<FormData_Type[]>([]);
  const handleAddForm = () => {
    setNumberOfForm([...numberOfForm, `Form ${numberOfForm.length + 1}`]);
  };
  const [selectedNetworkName, setSelectedNetworkName] = useState<string>("Ton Mainnet");
  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const networkName = e.target.value;
    setSelectedNetworkName(networkName);
  };
  const [selectedWalletVersion, setSelectedWalletVersion] = useState<string>("v4R2");
  const handleWalletVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const version = e.target.value;
    setSelectedWalletVersion(version);
  };
  const handleCollectAndSent = () => {
    console.log("getform", getForm);
    setGetForm(true);
  };
  const api = "https://sheet.best/api/sheets/e6a0b37e-5051-48bc-8f59-6b0709094d04";
  async function WriteDataToGoogleSheet(data: FormData_Type[]) {
    // console.log('writeData',writeData);
    try {
      const writeData = await axios.post(api, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("writeData", writeData);
      return await writeData.data;
    } catch (error) {
      console.log("WriteDataToGoogleSheet error:", error);
      setWriteDataMsg({
        status: "Failed",
        message: "Request post error"
      });
    }
  };

  const [writeDataMsg, setWriteDataMsg] = useState<WriteDataMsg_Type | null>(null);
  const [missingField, setMissingField] = useState();
  useEffect(() => {
    console.log("collectForm.length", collectForm.length);
    console.log("numberOfForm.length", numberOfForm.length);
    if (collectForm.length === numberOfForm.length && getForm && collectForm.length > 0) {
      console.log(collectForm);
      const data = [...collectForm];
      WriteDataToGoogleSheet(data).then((res: any) => {
        console.log("res", res);
        if(res){
          setWriteDataMsg({
            status:"Success",
            message: "Write data successful"
          });
        }
      });
      setGetForm(false);
      setCollectForm([]);
    }
  }, [collectForm, getForm]);
  return (
    <div className={cx("wrap-main-body")}>
      <h2>Enter Information</h2>
      <div>
        <h4>Select network</h4>
        <select className={cx("select-network")} onChange={handleNetworkChange} value={selectedNetworkName}>
          <optgroup label="Ethereum" className={cx("optgroup-ethereum")}>
            <option value="Ethereum Mainnet">Ethereum Mainnet</option>
            <option value="BSC Mainnet">BSC Mainnet</option>
            <option value="BSC Testnet">BSC Testnet</option>
            <option value="Avax Mainnet">Avalanche Mainnet</option>
            <option value="Sepolia Testnet">Sepolia Testnet</option>
          </optgroup>
          <optgroup label="Ton">
            <option value="Ton Mainnet">Ton Mainnet</option>
            <option value="Ton Testnet">Ton Testnet</option>
          </optgroup>
        </select>
      </div>
      <div>
        <h4>Select wallet version (required for TON)</h4>
        <select className={cx("select-network")} value={selectedWalletVersion} onChange={handleWalletVersionChange}>
          <option value="none">None</option>
          <option value="v4R2">v4R2</option>
          <option value="v5">v5</option>
        </select>
      </div>
      {numberOfForm.map((form: string, i: number) => {
        return (
          <EnterInfo
            key={i}
            formName={form}
            setNumberOfForm={setNumberOfForm}
            network_name={selectedNetworkName}
            wallet_version={selectedWalletVersion}
            setCollectForm={setCollectForm}
            getForm={getForm}
          />
        );
      })}
      <div>
        <button className={cx("btn-decor")} onClick={handleAddForm}>
          Add form
        </button>
      </div>
      {writeDataMsg?.status === "Failed" && <div style={{color:"red"}}>{writeDataMsg.message}</div>}
      {writeDataMsg?.status === "Success" && <div style={{color:"green"}}>{writeDataMsg.message}</div>}
      <div className={cx("div-btn")}>
        <button className={cx("btn-decor-primary")} onClick={handleCollectAndSent}>
          Collect all form and send
        </button>
      </div>
    </div>
  );
}
