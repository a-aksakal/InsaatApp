import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import GetCityList from "./MockServices/GetCityList";
import { useSearchParams } from "react-router-dom";

function GuncelleSehir({ paramSetOpen }) {
  const [cityName, setCityName] = useState();
  const [CityList, setCityList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  GetCityList({ paramCityList: setCityList });

  useEffect(() => {
    document.getElementById("txtCityName").value = CityList.filter(
      (repofilter) => repofilter.CityID == searchParam.get("id")
    ).map((repo) => repo.CityName);

    setCityName(document.getElementById("txtCityName").value);
  }, [CityList]);

  const Guncelle = async () => {
    const requestBody = {
      CityID: searchParam.get("id"),
      CityName: cityName,
    };

    const response = await axios.put(
      "https://private-de332a-insaatapi6.apiary-mock.com/putCity",
      requestBody
    );
    // const response = await axios.put(
    //   "http://localhost:8080/putCity",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Şehir Bilgileri Güncellenmiştir.");
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
                ŞEHİR BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Şehir Adı *</label>
                  <input
                    type="text"
                    id="txtCityName"
                    name="txtCityName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setCityName(e.target.value)}
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

export default GuncelleSehir;
