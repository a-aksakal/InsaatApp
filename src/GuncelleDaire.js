import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import GetCityList from "./MockServices/GetCityList";
import GetProjectStatusList from "./MockServices/GetProjectStatusList";
import { useSearchParams } from "react-router-dom";
import GetProjectList from "./MockServices/GetProjectList";
import ListeDaire from "./ListeDaire";
import GetFlatType from "./MockServices/GetFlatType";
import GetFlatStatus from "./MockServices/GetFlatStatus";
import GetFlatList from "./MockServices/GetFlatList";
import siteAddress from "./SiteAddress";

function GuncelleDaire({ paramSetOpen }) {
  const [projectName, setProjectName] = useState();
  const [projectID, setProjectID] = useState();
  const [flatTypeID, setFlatTypeID] = useState();
  const [FlatNo, setFlatNo] = useState();
  const [flatStatusID, setFlatStatusID] = useState();
  const [projectList, setProjectList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [flatTypeList, setFlatTypeList] = useState([]);
  const [flatStatusList, setFlatStatusList] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [price, setPrice] = useState();
  GetProjectList({ paramProjectList: setProjectList });
  GetFlatType({ paramSetFlatType: setFlatTypeList });
  GetFlatStatus({ paramSetFlatStatusList: setFlatStatusList });
  GetFlatList({ paramSetFlatList: setFlatList });
  useEffect(() => {
    document.getElementById("txtSuiteNo").value = flatList
      .filter((repofilter) => repofilter.FlatID == searchParam.get("id"))
      .map((repo) => repo.FlatNo);
    document.getElementById("cmbSuiteType").value = flatList
      .filter((repofilter) => repofilter.FlatID == searchParam.get("id"))
      .map((repo) => repo.FlatTypeID);
    document.getElementById("cmbProject").value = flatList
      .filter((repofilter) => repofilter.FlatID == searchParam.get("id"))
      .map((repo) => repo.ProjectID);
    document.getElementById("cmbFlatStatus").value = flatList
      .filter((repofilter) => repofilter.FlatID == searchParam.get("id"))
      .map((repo) => repo.FlatStatusID);
    document.getElementById("txtPrice").value = flatList
      .filter((repofilter) => repofilter.FlatID == searchParam.get("id"))
      .map((repo) => repo.Price);
    setFlatNo(document.getElementById("txtSuiteNo").value);
    setFlatTypeID(document.getElementById("cmbSuiteType").value);
    setProjectID(document.getElementById("cmbProject").value);
    setFlatStatusID(document.getElementById("cmbFlatStatus").value);
    setPrice(document.getElementById("txtPrice").value);
  }, [flatList, flatTypeList, projectList]);

  const Guncelle = async () => {
    const requestBody = {
      FlatID: searchParam.get("id"),
      FlatNo: FlatNo,
      ProjectID: projectID,
      FlatTypeID: flatTypeID,
      FlatStatusID: flatStatusID,
      Price: price,
    };

    const response = await axios.put(siteAddress + "/putFlat", requestBody);
    // const response = await axios.put(
    //   "http://localhost:8080/putFlat",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Daire Bilgileri Güncellenmiştir.");
      console.log(requestBody);
    } else {
      window.alert("Hata Oluştu!");
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12 ">
        {/* BEGIN SAMPLE FORM PORTLET*/}
        <div className="portlet light">
          <div className="portlet-title">
            <div className="caption">
              <i className="fa fa-cogs font-green-sharp" />
              <span className="caption-subject font-green-sharp bold uppercase">
                DAİRE BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Daire Numarası *</label>
                  <input
                    type="number"
                    id="txtSuiteNo"
                    name="txtSuiteNo"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setFlatNo(e.target.value)}
                  />
                </div>
                <GetFlatType
                  setFlatTypeID={setFlatTypeID}
                  labelText={"Daire Türü *"}
                />
                <GetProjectList setProjectID={setProjectID} />
                <GetFlatStatus setFlatStatusID={setFlatStatusID} />
                <div className="form-group">
                  <label>Fiyat *</label>
                  <input
                    className="form-control"
                    id="txtPrice"
                    name="txtPrice"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-actions right">
                <button
                  type="button"
                  className="btn default"
                  id="btnCancel"
                  name="btnCancel"
                  onClick={() => paramSetOpen(false)}
                >
                  Vazgeç
                </button>
                <input
                  className="btn green"
                  id="btnSave"
                  name="btnSave"
                  type="button"
                  onClick={() => Guncelle()}
                  value="Güncelle"
                />
              </div>
            </form>
          </div>
        </div>
        {/* END SAMPLE FORM PORTLET*/}
      </div>
    </div>
  );
}

export default GuncelleDaire;
