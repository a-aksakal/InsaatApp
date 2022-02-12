import React, { useEffect, useState } from "react";
import axios from "axios";

function GetFlatList({ setFlatID, paramSetFlatList }) {
  const [flatList, setFlatList] = useState([]);

  useEffect(async () => {
    const response = await axios.get(
      "https://private-de332a-insaatapi6.apiary-mock.com/getFlatList"
    );
    // const response = await axios.get("http://localhost:8080/getFlatList");
    setFlatList(response.data[0].FlatTable);
    if (paramSetFlatList != undefined) {
      paramSetFlatList(response.data[0].FlatTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>Daire Bilgisi *</label>
      <select
        id="cmbFlat"
        name="cmbFlat"
        className="form-control"
        onChange={(e) => setFlatID(e.target.value)}
      >
        <option value={0} hidden>
          Lütfen Seçiniz...
        </option>
        {flatList.map((myArrayItem, index) => (
          <option key={index} value={myArrayItem.FlatID}>
            {myArrayItem.FlatNo}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetFlatList;
