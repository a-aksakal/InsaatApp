import React, { useState, useEffect } from "react";
import axios from "axios";
import SiteAddress from "../SiteAddress";

function GetFlatStatus({ paramSetFlatStatusList, setFlatStatusID }) {
  const [MyFlatStatus, setMyFlatStatus] = useState([]);

  useEffect(async () => {
    const response = await axios.get(SiteAddress + "/getFlatStatusList");
    // const response = await axios.get("http://localhost:8080/getFlatStatusList");
    setMyFlatStatus(response.data[0].FlatStatusTable);
    if (paramSetFlatStatusList != undefined) {
      paramSetFlatStatusList(response.data[0].FlatStatusTable);
    }
  }, []);
  return (
    <div className="form-group">
      <label>Satış Durumu *</label>
      <select
        id="cmbFlatStatus"
        name="cmbFlatStatus"
        className="form-control"
        onChange={(e) => setFlatStatusID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen Seçiniz...
        </option>
        {MyFlatStatus.map((repo) => (
          <option key={repo.FlatStatusID} value={repo.FlatStatusID}>
            {repo.FlatStatusName}
          </option>
        ))}
      </select>
    </div>
    /*<div>
            <center>
                <ul>
                {
                      MyFlatStatus.map(myArrayItem =>
                        (
                          <span><b>Daire Durumu:</b> {myArrayItem.FlatStatusName}<br/></span>
                        
                        )
                  )
                }
              
              </ul>
            </center>
        </div>*/
  );
}

export default GetFlatStatus;
