import React, { useState, useEffect } from "react";
import axios from "axios";
import SiteAddress from "../SiteAddress";

function GetCustomerList({ setCustomerID, paramSetCustomerList }) {
  const [myArrayData, setMyArrayData] = useState([]);

  useEffect(async () => {
    const response = await axios.get(SiteAddress + "/getCustomerList");
    // const response = await axios.get("http://localhost:8080/getCustomerList");

    setMyArrayData(response.data[0].CustomerTable);
    if (paramSetCustomerList != undefined) {
      paramSetCustomerList(response.data[0].CustomerTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>Müşteri</label>
      <select
        id="cmbCustomer"
        name="cmbCustomer"
        className="form-control"
        onChange={(e) => setCustomerID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen seçiniz...
        </option>
        {myArrayData.map((repo) => (
          <option key={repo.CustomerID} value={repo.CustomerID}>
            {repo.CustomerName} {repo.CustomerSurname}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetCustomerList;
