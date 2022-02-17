import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import GetCityList from "./MockServices/GetCityList";
import GetProjectStatusList from "./MockServices/GetProjectStatusList";
import { useSearchParams } from "react-router-dom";
import GetGenderList from "./MockServices/GetGenderList";
import ListeProje from "./ListeProje";
import siteAddress from "./SiteAddress";

function GuncelleCinsiyet({ paramSetOpen }) {
  const [genderName, setGenderName] = useState();
  const [genderID, setGenderID] = useState();
  const [genderList, setGenderList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  GetGenderList({ paramSetGenderList: setGenderList });

  useEffect(() => {
    document.getElementById("txtGenderName").value = genderList
      .filter((repofilter) => repofilter.GenderID == searchParam.get("id"))
      .map((repo) => repo.GenderName);

    setGenderName(document.getElementById("txtGenderName").value);
  }, [genderList]);

  const Guncelle = async () => {
    const requestBody = {
      GenderID: searchParam.get("id"),
      GenderName: genderName,
    };

    // const response = await axios.put(
    //   "http://localhost:8080/putGender",
    //   requestBody
    // );
    const response = await axios.put(siteAddress + "/putGender", requestBody);
    if (response.config.status == 200 || 201) {
      window.alert("Cinsiyet Bilgileri Güncellenmiştir.");
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
                CİNSİYET BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Cinsiyet Adı *</label>
                  <input
                    type="text"
                    id="txtGenderName"
                    name="txtGenderName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setGenderName(e.target.value)}
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

export default GuncelleCinsiyet;
