import React, { useState, useEffect } from "react";
import axios from "axios";
function GetIncomeTypeList({ setIncomeTypeID, paramSetIncomeTypeList }) {
  const [myArrayData, setMyArrayData] = useState([]);
  useEffect(async () => {
    const response = await axios.get(
      "https://private-de332a-insaatapi6.apiary-mock.com/getIncomeTypeList"
    );
    // const response = await axios.get("http://localhost:8080/getIncomeTypeList");
    setMyArrayData(response.data[0].IncomeTypeTable);
    if (paramSetIncomeTypeList != undefined) {
      paramSetIncomeTypeList(response.data[0].IncomeTypeTable);
    }
  }, []);

  return (
    /*
        <div>
            <center>
                <ul>
                    {myArrayData.map((repo,index) => (
                        <div key={index}>
                            <b>Income Type:</b> {repo.IncomeTypeName}
                        </div>
                    ))}
                </ul>
            </center>
        </div>
        */
    <div className="form-group">
      <label>Gelir Durumu</label>
      <select
        id="cmbIncomeStatus"
        name="cmbIncomeStatus"
        className="form-control"
        onChange={(e) => setIncomeTypeID(e.target.value)}
      >
        <option value={0} hidden>
          Lütfen Seçiniz...
        </option>
        {myArrayData.map((repo) => (
          <option key={repo.IncomeTypeID} value={repo.IncomeTypeID}>
            {repo.IncomeTypeName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetIncomeTypeList;
