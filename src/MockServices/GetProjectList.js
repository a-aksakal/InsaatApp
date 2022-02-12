import React, { useState, useEffect } from "react";
import axios from "axios";

function GetProjectList({ paramProjectList, setProjectID }) {
  const [myArrayData, setMyArrayData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(async () => {
    const response = await axios.get(
      "https://private-de332a-insaatapi6.apiary-mock.com/getProjectList"
    );
    // const response = await axios.get("http://localhost:8080/getProjectList");
    setMyArrayData(response.data[0].ProjectTable);
    setRefresh(false);
    if (paramProjectList != undefined) {
      paramProjectList(response.data[0].ProjectTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>Proje</label>
      <select
        id="cmbProject"
        name="cmbProject"
        className="form-control"
        onChange={(e) => setProjectID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen seçiniz...
        </option>
        {myArrayData.map((item) => (
          <option key={item.ProjectID} value={item.ProjectID}>
            {item.ProjectName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetProjectList;
