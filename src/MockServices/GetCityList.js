import React, { useState, useEffect } from "react";
import axios from "axios";

function GetCityList({ setCityID, paramCityList, selectedValue }) {
  const [myArrayData, setMyArrayData] = useState([]);

  useEffect(async () => {
    const response = await axios.get(
      "https://private-de332a-insaatapi6.apiary-mock.com/getCityList"
    );
    // const response = await axios.get("http://localhost:8080/getCityList");
    setMyArrayData(response.data[0].CityTable);
    if (paramCityList != undefined) {
      paramCityList(response.data[0].CityTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>Şehir *</label>
      <select
        id="cmbCity"
        name="cmbCity"
        className="form-control"
        required
        value={selectedValue}
        onChange={(e) => setCityID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen seçiniz...
        </option>
        {myArrayData.map((item) => (
          <option key={item.CityID} value={item.CityID}>
            {item.CityName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetCityList;
