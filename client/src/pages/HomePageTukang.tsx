import "./HomePageTukang.css";
import Logo from "../assets/tukangin.png";

const HomePageTukang: React.FC = () => {
  return (
    <div className="home-page-tukang">
      <header className="header-tukang">
        <img src={Logo} alt="Tukangin Logo" className="logo-tukang" />
        <h1>Selamat Datang Tukang!</h1>
      </header>
      <main className="main-content-tukang">
        <p>Ini adalah halaman utama untuk tukang.</p>
      </main>
    </div>
  );
};

export default HomePageTukang;
