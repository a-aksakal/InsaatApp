import { Routes, Route } from "react-router-dom";
import "./App.css";
import FormCalisan from "./FormCalisan";
import FormDaire from "./FormDaire";
import FormMusteri from "./FormMusteri";
import FormProje from "./FormProje";
import FormSatis from "./FormSatis";
import FormZiyaret from "./FormZiyaret";
import GuncelleProje2 from "./GuncelleProje";
import Index2 from "./Index2";
import ListeCalisan from "./ListeCalisan";
import ListeCinsiyet from "./ListeCinsiyet";
import ListeDaire from "./ListeDaire";
import ListeDaireTipi from "./ListeDaireTipi";
import ListeGelirTipi from "./ListeGelirTipi";
import ListeMusteri from "./ListeMusteri";
import ListeProje from "./ListeProje";
import ListeProjeDurumu from "./ListeProjeDurumu";
import ListeSatis from "./ListeSatis";
import ListeSehir from "./ListeSehir";
import ListeZiyaret from "./ListeZiyaret";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/listesehir" element={<ListeSehir />} />
      <Route path="/index2" element={<Index2 />} />
      <Route path="/listeprojedurumu" element={<ListeProjeDurumu />} />
      <Route path="/listegelirtipi" element={<ListeGelirTipi />} />
      <Route path="/listedairetipi" element={<ListeDaireTipi />} />
      <Route path="/listeCinsiyet" element={<ListeCinsiyet />} />
      <Route path="/listesatis" element={<ListeSatis />} />
      <Route path="/formsatis" element={<FormSatis />} />
      <Route path="/listeziyaret" element={<ListeZiyaret />} />
      <Route path="/formziyaret" element={<FormZiyaret />} />
      <Route path="/listemusteri" element={<ListeMusteri />} />
      <Route path="/formmusteri" element={<FormMusteri />} />
      <Route path="/listecalisan" element={<ListeCalisan />} />
      <Route path="/formcalisan" element={<FormCalisan />} />
      <Route path="/listedaire" element={<ListeDaire />} />
      <Route path="/formdaire" element={<FormDaire />} />
      <Route path="/listeproje" element={<ListeProje />} />
      <Route path="/formproje" element={<FormProje />} />
      <Route path="/guncelleproje" element={<GuncelleProje2 />} />
    </Routes>
  );
}

export default App;
