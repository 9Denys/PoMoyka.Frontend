import './Services.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { images } from '../../assets/image';

function Services() {
  return (
    <div className="services">
        <Header />
      <main className="services-main">
        <h1 className="services-title">Top Services</h1>

        <section className="services-block">
          <img src={images.interiorCare} alt="Interior Care" className="services-image" />
          <div className="services-info">
            <h2 className="services-subtitle">Interior Care</h2>
            <h3 className="services-type">Fabric Interior</h3>
            <p className="services-desc">
              Deep cleaning of seats, carpets, floor mats, and door upholstery (4 pcs), trunk area, plastic part detailing and protection using steam, tornado gun, and premium auto cosmetics.
            </p>
            <p className="services-cost">Cost from €70</p>
          </div>
        </section>

        <section className="services-block">
          <img src={images.leatherInterior} alt="Leather Interior" className="services-image" />
          <div className="services-info">
            <h2 className="services-subtitle">Leather Interior</h2>
            <h3 className="services-type">Leather Interior</h3>
            <p className="services-desc">
              Deep cleaning of leather seats, carpets, mats (4 pcs), leather door panels (4 pcs), trunk area, plastic detailing and protection using steam, tornado gun, and high-quality detailing products.
            </p>
            <p className="services-cost">Cost from €70</p>
          </div>
        </section>

        <section className="services-block">
          <img src={images.exteriorCare} alt="Exterior Care" className="services-image" />
          <div className="services-info">
            <h2 className="services-subtitle">Exterior Care</h2>
            <h3 className="services-type">Standard Wash</h3>
            <p className="services-desc">
              Comprehensive exterior wash using pH-neutral shampoo, wheel cleaning, tire dressing, and glass treatment for perfect shine and protection.
            </p>
            <p className="services-cost">Cost from €70</p>
          </div>
        </section>

        <div className="services-watch">
          <a href="#" className="services-watch-link">Watch more</a>
        </div>

        <div className="services-list">
          <div className="services-item">
            <div className="services-item-left">
              <p className="services-item-name">Engine Bay Cleaning</p>
              <p className="services-item-cost">Cost from €70</p>
            </div>
            <div className="services-item-right">
              <p><strong>Detail & Protect</strong><br />
              Thorough cleaning of the engine compartment using steam and specialized degreasers, followed by plastic conditioning for a clean and safe finish.</p>
            </div>
          </div>

          <div className="services-item">
            <div className="services-item-left">
              <p className="services-item-name">Premium Detailing</p>
              <p className="services-item-cost">Cost from €70</p>
            </div>
            <div className="services-item-right">
              <p><strong>Full Restoration Package</strong><br />
              Complete interior and exterior detailing: paint decontamination, clay bar treatment, machine polishing, interior deep clean, plastic restoration, and ceramic protection.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Services;