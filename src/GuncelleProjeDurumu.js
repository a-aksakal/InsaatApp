import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import GetCityList from "./MockServices/GetCityList";
import GetProjectStatusList from "./MockServices/GetProjectStatusList";
import { useSearchParams } from "react-router-dom";
import ListeProje from "./ListeProje";

function GuncelleProjeDurumu({ paramSetOpen }) {
  const [projectStatusName, setProjectStatusName] = useState();
  const [projectStatusList, setProjectStatusList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  GetProjectStatusList({ paramSetProjectStatusList: setProjectStatusList });

  useEffect(() => {
    document.getElementById("txtProjectStatusName").value = projectStatusList
      .filter(
        (repofilter) => repofilter.ProjectStatusID == searchParam.get("id")
      )
      .map((repo) => repo.ProjectStatusName);

    setProjectStatusName(document.getElementById("txtProjectStatusName").value);
  }, [projectStatusList]);

  const Guncelle = async () => {
    const requestBody = {
      ProjectStatusID: searchParam.get("id"),
      ProjectStatusName: projectStatusName,
    };

    const response = await axios.put(
      "https://private-de332a-insaatapi6.apiary-mock.com/putProjectStatus",
      requestBody
    );
    // const response = await axios.put(
    //   "http://lcoalhost:8080/putProjectStatus",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Proje Durumu Bilgileri Güncellenmiştir.");
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
                PROJE DURUMU BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Proje Durumu Adı *</label>
                  <input
                    type="text"
                    id="txtProjectStatusName"
                    name="txtProjectStatusName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setProjectStatusName(e.target.value)}
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

export default GuncelleProjeDurumu;
