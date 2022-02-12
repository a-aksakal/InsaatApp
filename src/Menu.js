import { Link } from "react-router-dom";
function Menu() {
  return (
    <div className="hor-menu ">
      <ul className="nav navbar-nav">
        <li>
          <Link to="/index2">Dashboard</Link>
        </li>
        <li className="menu-dropdown classic-menu-dropdown ">
          <a
            data-hover="megamenu-dropdown"
            data-close-others="true"
            data-toggle="dropdown"
            href="#;"
          >
            Proje Yönetimi <i className="fa fa-angle-down" />
          </a>
          <ul className="dropdown-menu pull-left">
            <li className=" dropdown-submenu">
              <a href="#">
                <i className="icon-briefcase" />
                Proje{" "}
              </a>
              <ul className="dropdown-menu">
                <li className=" ">
                  <Link to="/formproje">Yeni Giriş </Link>
                </li>
                <li className=" ">
                  <Link to="/listeproje">Liste </Link>
                </li>
              </ul>
            </li>
            <li className=" dropdown-submenu">
              <a href="#">
                <i className="icon-home" />
                Daire{" "}
              </a>
              <ul className="dropdown-menu">
                <li className=" ">
                  <Link to="/formdaire">Yeni Giriş</Link>
                </li>
                <li className=" ">
                  <Link to="/listedaire">Liste </Link>
                </li>
              </ul>
            </li>
            <li className=" dropdown-submenu">
              <a href="#">
                <i className="icon-user" />
                Çalışan{" "}
              </a>
              <ul className="dropdown-menu">
                <li className=" ">
                  <Link to="/formcalisan">Yeni Giriş </Link>
                </li>
                <li className=" ">
                  <Link to="/listecalisan">Liste </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="menu-dropdown classic-menu-dropdown ">
          <a
            data-hover="megamenu-dropdown"
            data-close-others="true"
            data-toggle="dropdown"
            href="#;"
          >
            Müşteri Yönetimi <i className="fa fa-angle-down" />
          </a>
          <ul className="dropdown-menu pull-left">
            <li className=" dropdown-submenu">
              <a href="#">
                <i className="icon-user-female" />
                Müşteri{" "}
              </a>
              <ul className="dropdown-menu">
                <li className=" ">
                  <Link to="/formmusteri">Yeni Giriş </Link>
                </li>
                <li className=" ">
                  <Link to="/listemusteri">Liste </Link>
                </li>
              </ul>
            </li>
            <li className=" dropdown-submenu">
              <a href="#">
                <i className="icon-eye" />
                Ziyaret{" "}
              </a>
              <ul className="dropdown-menu">
                <li className=" ">
                  <Link to="/formziyaret">Yeni Giriş </Link>
                </li>
                <li className=" ">
                  <Link to="/listeziyaret">Liste </Link>
                </li>
              </ul>
            </li>
            <li className=" dropdown-submenu">
              <a href="#">
                <i className="icon-rocket" />
                Satış{" "}
              </a>
              <ul className="dropdown-menu">
                <li className=" ">
                  <Link to="/formsatis">Yeni Giriş </Link>
                </li>
                <li className=" ">
                  <Link to="/listesatis">Liste </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="menu-dropdown classic-menu-dropdown ">
          <a
            data-hover="megamenu-dropdown"
            data-close-others="true"
            data-toggle="dropdown"
            href="#;"
          >
            İçerik Yönetimi <i className="fa fa-angle-down" />
          </a>
          <ul className="dropdown-menu pull-left">
            <li className=" mega-menu-submenu">
              <Link to="/listecinsiyet">
                <i className="icon-settings" />
                Cinsiyet{" "}
              </Link>
            </li>
            <li className=" mega-menu-submenu">
              <Link to="/listedairetipi">
                <i className="icon-settings" />
                Daire Tipi{" "}
              </Link>
            </li>
            <li className=" mega-menu-submenu">
              <Link to="/listegelirtipi">
                <i className="icon-settings" />
                Gelir Tipi{" "}
              </Link>
            </li>
            <li className=" mega-menu-submenu">
              <Link to="/listeprojedurumu">
                <i className="icon-settings" />
                Proje Durumu{" "}
              </Link>
            </li>
            <li className=" mega-menu-submenu">
              <Link to="/listesehir">
                <i className="icon-settings" />
                Şehir{" "}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default Menu;
