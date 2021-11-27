import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 margin-bottom:2000px">
                <CardStats
                  statSubtitle="Laptops"
                />
                <div className="absolute margin-bottom:1000px"></div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Mobiles"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Cameras"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Projectors"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Gaming Consoles"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 margin-bottom:120px">
            <CardStats
                statSubtitle="Printer"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
                statSubtitle="Projector"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
                statSubtitle="Scanner"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
                statSubtitle="Tablet"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
                statSubtitle="LEDs/LCDs"
            />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
