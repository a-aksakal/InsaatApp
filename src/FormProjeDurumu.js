import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import SiteAddress from "./SiteAddress";

function FormProjeDurumu({ paramSetOpenAdd }) {
  const [projectStatusName, setProjectStatusName] = useState();

  const Ekle = async () => {
    const requestBody = {
      ProjectStatusName: projectStatusName,
    };

    // const response = await axios.post(
    //   "http://localhost:8080/postProjectStatus",
    //   requestBody
    // );
    const response = await axios.post(
      SiteAddress + "/postProjectStatus",
      requestBody
    );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Proje Durumu Bilgisi Eklenmiştir.");
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
                PROJE DURUMU BİLGİSİ EKLE
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
                  onClick={() => paramSetOpenAdd(false)}
                >
                  Vazgeç
                </button>
                <input
                  className="btn green"
                  id="btnSave"
                  name="btnSave"
                  type="button"
                  value="Ekle"
                  onClick={() => Ekle()}
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

export default FormProjeDurumu;
