import React from "react";

// components

import Laptop from "components/CardsUserDash/Laptop.js";
import Mobile from "components/CardsUserDash/Mobile.js";
import Printer from "components/CardsUserDash/Printer.js";
import Camera from "components/CardsUserDash/Camera.js";
import Projector from "components/CardsUserDash/Projector.js";
import Scanner from "components/CardsUserDash/Scanner.js";
import Desktop from "components/CardsUserDash/Desktop.js";
import Tablet from "components/CardsUserDash/Tablet.js";
import Led from "components/CardsUserDash/Led.js";
import Console from "components/CardsUserDash/Console.js";

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
            <Laptop
                statSubtitle="Laptops"
            />
            <div className="absolute margin-bottom:1000px"></div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Mobile
                statSubtitle="Mobiles"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Camera
                statSubtitle="Cameras"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Projector
                statSubtitle="Projectors"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Console
                statSubtitle="Gaming Consoles"
            />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 margin-bottom:120px">
        <Printer
            statSubtitle="Printer"
        />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <Desktop
            statSubtitle="Desktops"
        />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <Scanner
            statSubtitle="Scanner"
        />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <Tablet
            statSubtitle="Tablet"
        />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <Led
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
