import './locations.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Locations() {
  return (
    <div className="locations">
        <Header />
      <main className="locations-main">
        <div className="locations-container">
          <aside className="locations-sidebar">
            <h2 className="locations-title">Active centers</h2>

            <div className="location-card">
              <p className="location-id">ID 89</p>
              <h3 className="location-name">PoMoyka 1</h3>
              <p className="location-address">13A Gvardeyskaya Street</p>
            </div>

            <div className="location-card">
              <p className="location-id">ID 62</p>
              <h3 className="location-name">PoMoyka 2</h3>
              <p className="location-address">13A Gvardeyskaya Street</p>
            </div>

            <div className="location-card">
              <p className="location-id">ID 39</p>
              <h3 className="location-name">PoMoyka 3</h3>
              <p className="location-address">13A Gvardeyskaya Street</p>
            </div>

            <div className="location-card">
              <p className="location-id">ID 76</p>
              <h3 className="location-name">PoMoyka 4</h3>
              <p className="location-address">13A Gvardeyskaya Street</p>
            </div>

            <div className="location-card">
              <p className="location-id">ID 45</p>
              <h3 className="location-name">PoMoyka 5</h3>
              <p className="location-address">13A Gvardeyskaya Street</p>
            </div>
          </aside>

          <section className="locations-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102079.00908979009!2d30.392609!3d50.450033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5c36fdf0ef%3A0x7b27d4a5f5f6a5f5!2z0JrQvtC80YHRgtGA0L7QstCwLCDQmtC40ZfQsiwg0KHQvtC70YzQutC-0YDQvNCw0Y8!5e0!3m2!1sen!2sua!4v1670000000000!5m2!1sen!2sua"
              width="100%"
              height="100%"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Locations;