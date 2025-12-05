import React, { useEffect, useMemo, useState } from "react";
import "./Locations.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import {
  getCenters,
  getCenterById,
  getCenterPriceList,
} from "../../api/locationsApi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function Locations() {
  const [centers, setCenters] = useState([]);
  const [selectedCenterId, setSelectedCenterId] = useState(null);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [error, setError] = useState("");

  const [centerInfo, setCenterInfo] = useState(null);
  const [services, setServices] = useState([]);

  const googleMapsApiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    "AIzaSyA1czl45ui5mLXnrCSG8ff9E1p3M0DhOi0";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const defaultCenter = { lat: 50.4501, lng: 30.5234 };

  const loadCenterServices = async (centerId) => {
    try {
      setLoadingServices(true);
      const priceList = await getCenterPriceList(centerId);

      setCenterInfo({
        name: priceList.centerName,
        address: priceList.address,
      });

      setServices(priceList.services || []);
    } catch (e) {
      console.error("Failed to load center services", e);
      setCenterInfo(null);
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    const loadCenters = async () => {
      try {
        setLoadingCenters(true);
        setError("");

        const list = await getCenters();

        if (!list || list.length === 0) {
          setCenters([]);
          setSelectedCenterId(null);
          return;
        }

        const detailed = await Promise.all(
          list.map(async (c) => {
            try {
              const full = await getCenterById(c.id);
              return {
                ...c,
                address: full.address,
                averageRating: full.averageRating,
                totalRatings: full.totalRatings,
              };
            } catch (e) {
              console.error("Failed to load center details", e);
              return c;
            }
          })
        );

        setCenters(detailed);
        setSelectedCenterId(detailed[0].id);

        await loadCenterServices(detailed[0].id);
      } catch (e) {
        console.error(e);
        setError("Failed to load centers");
      } finally {
        setLoadingCenters(false);
      }
    };

    loadCenters();
  }, []);

  const currentCenter = useMemo(() => {
    if (!centers || centers.length === 0) {
      return defaultCenter;
    }

    const selected =
      centers.find((c) => c.id === selectedCenterId) || centers[0];

    return {
      lat: selected.latitude || defaultCenter.lat,
      lng: selected.longitude || defaultCenter.lng,
    };
  }, [centers, selectedCenterId]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const handleCenterClick = async (centerId) => {
    setSelectedCenterId(centerId);
    await loadCenterServices(centerId);
  };

  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.round(rating || 0);

    return (
      <>
        {Array.from({ length: maxStars }).map((_, index) => (
          <span
            key={index}
            className={
              index < fullStars
                ? "location-star location-star--filled"
                : "location-star"
            }
          >
            ★
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="locations">
      <Header />

      <main className="locations-main">
        <div className="locations-container">
          <aside className="locations-sidebar">
            <h2 className="locations-title">Active centers</h2>

            {loadingCenters && <p className="locations-info">Loading centers...</p>}
            {error && <p className="locations-error">{error}</p>}

            {!loadingCenters && !error && centers.length === 0 && (
              <p className="locations-info">No centers found</p>
            )}

            {!loadingCenters &&
              !error &&
              centers.map((center) => (
                <div
                  key={center.id}
                  className={
                    "location-card" +
                    (center.id === selectedCenterId
                      ? " location-card--active"
                      : "")
                  }
                  onClick={() => handleCenterClick(center.id)}
                >
                {/*  <p className="location-id">ID {center.id}</p> */}
                  <h3 className="location-name">{center.name}</h3>

                  <p className="location-address">
                    {center.address || "Address not specified"}
                  </p>

                  <div className="location-rating">
                    {center.totalRatings > 0 ? (
                      <>
                        <span className="location-stars">
                          {renderStars(center.averageRating)}
                        </span>
                        <span className="location-rating-count">
                          ({center.totalRatings})
                        </span>
                      </>
                    ) : (
                      <span className="location-rating-empty">
                        No ratings yet
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </aside>

          <section className="locations-map">
            {loadError && <p className="locations-error">Map failed to load</p>}
            {!loadError && !isLoaded && (
              <p className="locations-info">Loading map...</p>
            )}

            {!loadError && isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentCenter}
                zoom={13}
              >
                {centers.map((center) => (
                  <Marker
                    key={center.id}
                    position={{
                      lat: center.latitude || defaultCenter.lat,
                      lng: center.longitude || defaultCenter.lng,
                    }}
                    onClick={() => handleCenterClick(center.id)}
                  />
                ))}
              </GoogleMap>
            )}
          </section>

          <section className="locations-details">
            {loadingServices && <p className="locations-info">Loading services...</p>}

            {!loadingServices && centerInfo && (
              <>
                <h2 className="details-title">{centerInfo.name}</h2>
                <p className="details-address">{centerInfo.address}</p>

                <h3 className="details-subtitle">Available services</h3>

                {services.length > 0 ? (
                  <ul className="service-list">
                    {services.map((s) => (
                      <li
                        key={s.centerServiceId || s.id}
                        className="service-item"
                      >
                        <p className="service-name">{s.serviceName}</p>
                        <p className="service-row">
                          <span className="service-label">Car type:</span>{" "}
                          <span>{s.carType}</span>
                        </p>
                        <p className="service-row">
                          <span className="service-label">Price:</span>{" "}
                          <span>{s.price} ₴</span>
                        </p>
                        {s.description && (
                          <p className="service-description">{s.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="locations-info">
                    No services found for this center
                  </p>
                )}
              </>
            )}

            {!loadingServices && !centerInfo && (
              <p className="locations-info">
                Select a center on the left or on the map to see details
              </p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Locations;
