import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ThreeDots } from "react-loader-spinner";
import { extract } from "fuzzball";
import districts_of_states from "./constant.jsx";

const validStateNames = Object.keys(districts_of_states);
const validDistrictNames = Object.values(districts_of_states).flat();

const cleanAndFormatNames = (names, validNames) => {
  return names
    .split(",")
    .map((name) => name.trim())
    .map((name) => {
      const [match, score] = extract(name, validNames, {
        scorer: extract.partial_ratio,
      })[0];
      return score > 80 ? match : null;
    })
    .filter((name) => name !== null);
};

const Map = ({ selectedRow, highlightType }) => {
  const [peninsulaData, setPeninsulaData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [highlightedData, setHighlightedData] = useState(null);
  const [loading, setLoading] = useState(true);

  const indiaCenter = [23, 82];

  const defaultStyle = {
    color: "black",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.2,
    fillColor: "green",
  };

  const highlightStyle = {
    color: "white",
    weight: 0.8,
    opacity: 0.6,
    fillOpacity: 0.5,
    fillColor: "orange",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stateResponse, districtResponse] = await Promise.all([
          fetch("assets/India_States_simplified.geojson"),
          fetch("assets/India_Districts_simplified.geojson"),
        ]);

        const stateData = await stateResponse.json();
        const districtData = await districtResponse.json();

        setPeninsulaData(stateData);
        setStateData(stateData);
        setDistrictData(districtData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setHighlightedData(null);

    const updateHighlightedData = () => {
      if (highlightType === "state" && selectedRow && stateData) {
        const stateNames = selectedRow.states
          ? cleanAndFormatNames(selectedRow.states, validStateNames)
          : [];
        const highlighted = stateData.features.filter((feature) =>
          stateNames.includes(feature.properties.ST_NM)
        );
        setHighlightedData({
          type: "FeatureCollection",
          features: highlighted,
        });
      } else if (highlightType === "district" && selectedRow && districtData) {
        const districtNames = selectedRow.districts
          ? cleanAndFormatNames(selectedRow.districts, validDistrictNames)
          : [];
        const highlighted = districtData.features.filter((feature) =>
          districtNames.includes(feature.properties.Dist_Name)
        );
        setHighlightedData({
          type: "FeatureCollection",
          features: highlighted,
        });
      }
    };
    const timer = setTimeout(updateHighlightedData, 0);

    return () => clearTimeout(timer);
  }, [selectedRow, highlightType, stateData, districtData]);

  return (
    <div style={{ position: "relative", height: "650px", width: "100%" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ThreeDots color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <MapContainer
        center={indiaCenter}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        {peninsulaData && <GeoJSON data={peninsulaData} style={defaultStyle} />}
        {highlightedData && (
          <GeoJSON data={highlightedData} style={highlightStyle} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
