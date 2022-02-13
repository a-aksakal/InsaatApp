import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

function FormCinsiyet({ paramSetOpenAdd }) {
  const [genderName, setGenderName] = useState();

  const Ekle = async () => {
    const requestBody = {
      GenderName: genderName,
    };

    // const response = await axios.post(
    //   "http://localhost:8080/postGender",
    //   requestBody
    // );
    const response = await axios.post(
      "https://private-de332a-insaatapi6.apiary-mock.com/postGender",
      requestBody
    );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Cinsiyet Bilgisi Eklenmiştir.");
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
                CİNSİYET BİLGİSİ EKLE
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

export default FormCinsiyet;
