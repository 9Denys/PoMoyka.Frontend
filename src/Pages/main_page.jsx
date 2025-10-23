import './main_page.css';
import Header from '../Components/Header/Header.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import { images } from '../assets/image.jsx';

function MainPage() {
  return (
    <div className="main-body">
        <Header />
      <section className="main-hero" aria-label="Intro">
        <div className="main-hero-head">
          <h1 className="main-quote">
            Perfection is not attainable, but if<br />
            we chase perfection we can catch<br />
            excellence
            <br /><span className="main-author">– Vince Lombardi</span>
          </h1>

          <h2 className="main-logo">PoMoyka</h2>

          <div className="main-hero-circle">
            <span>It's not<br />just<br />cleaning</span>
          </div>
        </div>

        <div className="main-hero-car">
          <img src={images.porsche} alt="Porsche" />
        </div>

        <div className="main-hero-rule"></div>
      </section>

      <section className="main-services">
        <div className="main-services-left">
          <img src={images.wash1} alt="wash1" />
        </div>

        <div className="main-services-divider"></div>

        <div className="main-services-right">
          <img src={images.wash2} alt="wash2" className="main-services-small" />

          <div className="main-services-columns">
            <div className="main-services-left-text">
              <h3 className="main-services-title">Crafted Care for Every Car</h3>
              <p className="main-services-desc">
                We believe that perfection lives in the smallest things. That's why we don't stop at what's visible — 
                we clean, polish, and treat even the places you don't see
              </p>
            </div>

            <div className="main-services-right-text">
              <h4>What We Offer</h4>
              <ul>
                <li>Exterior Detailing</li>
                <li>Interior Detailing</li>
                <li>Ceramic Coating</li>
                <li>Paint Correction</li>
                <li>Engine Bay Cleaning</li>
                <li>Headlight Restoration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="main-stats">
        <div className="main-stats-top">
          <h2 className="main-stats-title">NOTHING<br />COMPARES</h2>

          <div className="main-stats-box">
            <div className="main-stat">
              <h3>5</h3>
              <p>stages of professional detailing — from deep-cleaning to ceramic coating perfection</p>
            </div>

            <div className="main-stat">
              <h3>3+</h3>
              <p>years of professional detailing experience</p>
            </div>

            <div className="main-stat highlight">
              <h3>500+</h3>
              <p>cars detailed with precision and passion — every vehicle leaves shining like new</p>
            </div>
          </div>
        </div>

        <div className="main-divider"></div>

        <div className="main-map-section">
          <div className="main-map-text">
            <h3>Detailing excellence<br /><span>across Ukraine</span></h3>
            <ul>
              <li>Kyiv</li>
              <li>Lviv</li>
              <li>Odesa</li>
              <li>Dnipro</li>
              <li>Donetsk</li>
              <li>Kharkiv</li>
              <li>Zaporizhzhia</li>
              <li>Ivano-Frankivsk</li>
            </ul>
          </div>

          <div className="main-map-img">
            <img src={images.ukraineMap} alt="Ukraine map" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;