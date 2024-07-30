import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./EnterInfo.module.scss";
const cx = classNames.bind(styles);

interface EnterInfo_Props {
  formName: string;
  setNumberOfForm: Dispatch<SetStateAction<string[]>>;
  network_name: string;
  wallet_version: string;
  setCollectForm:Dispatch<SetStateAction<FormData_Type[]>>;
  getForm: boolean,
}
interface FormData_Type{
     address: string,
     mnemonic: string,
     device: string,
     notes: string,
     wallet_version: string,
     network_name: string,
}
export default function EnterInfo({ formName, setNumberOfForm, network_name, wallet_version, getForm, setCollectForm }: EnterInfo_Props) {
  const [formData, setFormData] = useState<FormData_Type>({
    address: "",
    mnemonic: "",
    device: "",
    notes: "",
    wallet_version: wallet_version,
    network_name: network_name,
  });

  const handleDeleteForm = () => {
    setNumberOfForm((prev: string[]) => {
      const updateData = [...prev];
      const formIndex = prev.findIndex((name) => name === formName);
      if (formIndex !== -1) {
        updateData.splice(formIndex, 1);
      }
      return updateData;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Do something with formData
  };
  useEffect(() =>{
     if(getForm ){
          setCollectForm((prev: any[]) => [...prev, formData]);
     }
  },[getForm])
  return (
    <div className={cx("wrap-enter-info")}>
      <div className={cx("form-name")}>
        <h3>{formName}</h3>
      </div>
      {/* <form className={cx("form-container")}>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>1. Address</div>
          <input className={cx("input-decor")} type="text" name="address" placeholder="Enter address" />
        </div>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>2. Mnemonic</div>
          <input className={cx("input-decor")} type="text" name="address" placeholder="Enter mnemonic" />
        </div>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>3. Device</div>
          <input className={cx("input-decor")} type="text" name="address" placeholder="Enter device" />
        </div>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>4. Notes</div>
          <input className={cx("input-decor")} type="text" name="address" placeholder="Enter any notes" />
        </div>
      </form> */}
      <form className={cx("form-container")}>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>1. Address</div>
          <input
            className={cx("input-decor")}
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>2. Mnemonic</div>
          <input
            className={cx("input-decor")}
            type="text"
            name="mnemonic"
            placeholder="Enter mnemonic"
            value={formData.mnemonic}
            onChange={handleInputChange}
          />
        </div>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>3. Device</div>
          <input
            className={cx("input-decor")}
            type="text"
            name="device"
            placeholder="Enter device"
            value={formData.device}
            onChange={handleInputChange}
          />
        </div>
        <div className={cx("form-field")}>
          <div className={cx("title-field")}>4. Notes</div>
          <input
            className={cx("input-decor")}
            type="text"
            name="notes"
            placeholder="Enter any notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div>
        <button className={cx("btn-decor")} type="submit">
          Submit
        </button>
        <button className={cx("btn-decor")} onClick={handleDeleteForm}>
          Delete Form
        </button>
      </div>
    </div>
  );
}
