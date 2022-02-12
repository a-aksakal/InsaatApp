import React, { useState, useEffect } from "react";
import axios from "axios";

function GetProjectStatusList({
  paramSetProjectStatusList,
  setProjectStatusID,
  selectedValue,
}) {
  const [myArrayData, setMyArrayData] = useState([]);

  useEffect(async () => {
    const response = await axios.get(
      "https://private-de332a-insaatapi6.apiary-mock.com/getProjectStatusList"
    );
    // const response = await axios.get(
    //   "http://localhost:8080/getProjectStatusList"
    // );
    setMyArrayData(response.data[0].ProjectStatusTable);
    if (paramSetProjectStatusList != undefined) {
      paramSetProjectStatusList(response.data[0].ProjectStatusTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>Proje Durumu</label>
      <select
        id="cmbStatus"
        name="cmbStatus"
        className="form-control"
        value={selectedValue}
        onChange={(e) => setProjectStatusID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen seçiniz...
        </option>
        {myArrayData.map((item) => (
          <option key={item.ProjectStatusID} value={item.ProjectStatusID}>
            {item.ProjectStatusName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetProjectStatusList;
