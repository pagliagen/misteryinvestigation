import React from "react";
import slugify from "slugify";

function CharacterPoints({ points }) {
  return (
    <div className="character-sheetpage_points">
        {points.map((point) => (
          <div
            key={`points_${slugify(point.name.toLocaleLowerCase())}`}
            className="character-sheetpage_points_stat character-hover"
          >
            <div className="character-sheetpage_points_stat_name">
              {point.name}
            </div>
            <div className="character-sheetpage_points_stat_value">
              {point.value} / {point.maxValue}
            </div>
          </div>
        ))}
      </div>
  );
}

export default CharacterPoints;
