"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const position = [23.8103, 90.4125];
const Coverage = () => {
  const [search, setSearch] = useState("");
  const serviceCenters = useLoaderData();
  console.log("serviceCenters", serviceCenters);

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Search:", search);
  };

  return (
    <section className="w-full bg-[#eef0f1] px-5 py-6 pb-20">
      <div
        className="
        container mx-auto rounded-[20px] bg-white px-16 py-18"
      >
        {/* =========================================
            Heading
        ========================================= */}
        <h2
          className="
            m-0
            text-[32px]
            font-bold
            leading-[1.2]
            tracking-[-0.7px]
            text-[#003f45]

            max-lg:text-[28px]
            max-md:text-[25px]
            max-sm:text-[23px]
          "
        >
          We are available in 64 districts
        </h2>

        {/* =========================================
            Search
        ========================================= */}
        <form
          onSubmit={handleSearch}
          className="
            mt-[30px]
            flex
            h-10
            w-[325px]
            items-center
            overflow-hidden
            rounded-full
            bg-[#f1f4f5]
            max-md:w-full
            max-md:max-w-[325px]
          "
        >
          {/* Search Input */}
          <div className="flex h-full flex-1 items-center pl-3 text-[#111b1d]">
            <Search size={15} strokeWidth={2} className="shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here"
              className="
                h-full
                w-full
                border-0
                bg-transparent
                px-2
                text-[14px]
                text-[#172022]
                outline-none
                placeholder:text-[#899193]
              "
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="
              h-full
              min-w-[72px]
              shrink-0
              rounded-full
              border-0
              bg-[#c5ef4c]
              px-[18px]
              text-[10px]
              font-semibold
              text-[#0b2527]
              transition-all
              duration-200
              hover:bg-[#b5e63d]
              active:scale-[0.98]
            "
          >
            Search
          </button>
        </form>

        {/* =========================================
            Divider
        ========================================= */}
        <div className="mt-[27px] h-px w-full bg-[#e8eaeb]" />

        {/* =========================================
            Map Heading
        ========================================= */}
        <h3
          className="
            mb-[27px]
            mt-7
            text-[17px]
            font-bold
            leading-[1.3]
            text-[#003f45]

            max-md:mb-5
            max-md:mt-6
            max-md:text-base

            max-sm:text-[15px]
          "
        >
          We deliver almost all over Bangladesh
        </h3>

        {/* =========================================
            Map
        ========================================= */}
        <div
          className="
            h-[660px]
            w-full
            overflow-hidden

            max-md:h-[380px]

            max-sm:h-[430px]
          "
        >
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            zoomControl={false}
            className="!h-full !w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center) => (
              <Marker position={[center.latitude, center?.longitude]}>
                <Popup>
                  {`We deliver almost all over ${center.district}`} <br />
                  <span> Service Area: {center.covered_area.join(",")}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
