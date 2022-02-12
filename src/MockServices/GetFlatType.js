import React, { useState, useEffect } from "react";
import axios from "axios";

function GetFlatType({ paramSetFlatType, setFlatTypeID, labelText }) {
  const [MyFlatType, setMyFlatType] = useState([]);

  useEffect(async () => {
    const response = await axios.get(
      "https://private-de332a-insaatapi6.apiary-mock.com/getFlatTypeList"
    );
    // const response = await axios.get("http://localhost:8080/getFlatTypeList");
    setMyFlatType(response.data[0].FlatTypeTable);
    if (paramSetFlatType != undefined) {
      paramSetFlatType(response.data[0].FlatTypeTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>{labelText}</label>
      <select
        id="cmbSuiteType"
        name="cmbSuiteType"
        className="form-control"
        onChange={(e) => setFlatTypeID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen Seçiniz...
        </option>
        {MyFlatType.map((repo) => (
          <option key={repo.FlatTypeID} value={repo.FlatTypeID}>
            {repo.FlatTypeName}
          </option>
        ))}
      </select>
    </div>
    /*<div>
            <center>
                <ul>
                {
                      MyFlatType.map(myArrayItem =>
                        (
                          <span><b>Daire Tipi:</b> {myArrayItem.FlatTypeName}<br/></span>
                        
                        )
                  )
                }
              
              </ul>
            </center>
        </div>*/
  );
}

export default GetFlatType;
