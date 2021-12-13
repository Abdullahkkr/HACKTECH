import React from "react";
import PropTypes from "prop-types";
import Link from "next/Link";


export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  return (
    <>
    <button>
    <Link href="/auth/MobileAdd">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
                <img src="/img/mo.jpg"></img>
              </h5>
            </div>
          </div>
        </div>
      </div>
      </Link>
      </button>
      <div className="bg-blueGray-800"><p>.</p></div>
    </>
  );
}


CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
};
