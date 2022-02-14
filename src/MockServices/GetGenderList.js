import React, { useState, useEffect } from "react";
import axios from "axios";
import SiteAddress from "../SiteAddress";

function GetGenderList({ setGenderID, paramSetGenderList }) {
  const [myArrayData, setMyArrayData] = useState([]);
  useEffect(
    //useEffect sayfa ilk açıldığında çalışır
    async () => {
      const response = await axios.get(SiteAddress + "/getGenderList");
      // const response = await axios.get("http://localhost:8080/getGenderList");

      setMyArrayData(response.data[0].GenderTable);
      if (paramSetGenderList != undefined) {
        paramSetGenderList(response.data[0].GenderTable);
      }
    },
    []
  );

  return (
    <div className="form-group">
      <label>Cinsiyet</label>
      <select
        id="cmbGender"
        name="cmbGender"
        className="form-control"
        onChange={(e) => setGenderID(e.target.value)}
      >
        <option value={0} hidden>
          Lütfen Seçiniz...
        </option>
        {myArrayData.map((repo) => (
          <option key={repo.GenderID} value={repo.GenderID}>
            {repo.GenderName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetGenderList;
