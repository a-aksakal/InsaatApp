import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import GetCityList from "./MockServices/GetCityList";
import GetProjectStatusList from "./MockServices/GetProjectStatusList";
import { useSearchParams } from "react-router-dom";
import GetProjectList from "./MockServices/GetProjectList";
import ListeProje from "./ListeProje";

function GuncelleProje({ paramSetOpen }) {
  const [projectName, setProjectName] = useState();
  const [cityID, setCityID] = useState();
  const [projectStatusID, setProjectStatusID] = useState();
  const [projectList, setProjectList] = useState([]);
  const [projectStatusList, setProjectStatusList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  GetProjectList({ paramProjectList: setProjectList });
  GetProjectStatusList({ paramSetProjectStatusList: setProjectStatusList });

  useEffect(() => {
    document.getElementById("txtProjectName").value = projectList
      .filter((repofilter) => repofilter.ProjectID == searchParam.get("id"))
      .map((repo) => repo.ProjectName);
    document.getElementById("cmbCity").value = projectList
      .filter((repofilter) => repofilter.ProjectID == searchParam.get("id"))
      .map((repo) => repo.CityID);
    document.getElementById("cmbStatus").value = projectList
      .filter((repofilter) => repofilter.ProjectID == searchParam.get("id"))
      .map((repo) => repo.ProjectStatusID);

    setProjectName(document.getElementById("txtProjectName").value);
    setCityID(document.getElementById("cmbCity").value);
    setProjectStatusID(document.getElementById("cmbStatus").value);
  }, [projectList, projectStatusList]);

  const Guncelle = async () => {
    const requestBody = {
      ProjectID: searchParam.get("id"),
      ProjectName: projectName,
      CityID: cityID,
      ProjectStatusID: projectStatusID,
    };

    const response = await axios.put(
      "https://private-de332a-insaatapi6.apiary-mock.com/putProject",
      requestBody
    );
    // const response = await axios.put(
    //   "http://localhost:8080/putProject",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Proje Bilgileri Güncellenmiştir.");
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
                PROJE BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Proje Adı *</label>
                  <input
                    type="text"
                    id="txtProjectName"
                    name="txtProjectName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <GetCityList setCityID={setCityID} />
                <GetProjectStatusList setProjectStatusID={setProjectStatusID} />
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
                  value="Güncelle"
                  onClick={() => Guncelle()}
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

export default GuncelleProje;
