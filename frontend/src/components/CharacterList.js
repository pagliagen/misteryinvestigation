import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CharacterList({ characters, apiError }) {
  const [currentCharacter, setCurrentCharacter] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    afterChange: (index) => {
    },
    beforeChange: (current, next) => {
      setCurrentCharacter(characters[next])
    },
  }; 

  useEffect(() => {
    if (characters.length > 0) {
      setCurrentCharacter(characters[0]);
    }
  }, [characters]);  

  if (apiError) {
    return (
      <div>
        <div>Errore: {apiError}</div>
        <Link to="/login">Vai a login</Link>
      </div>
    );
  }

  if (!currentCharacter) {
    return null;
  }

  return (
    <div className="character-list">
      <div className="character-list-carousel">
        {characters.length === 1 ? (
          <div className="character-card" key={currentCharacter._id}>
            <div className="character-card_avatar">
              <img
                src={currentCharacter.images.avatar}
                alt="Avatar"
              />
            </div>
          </div>
        ) : (
          <Slider {...settings} >
            {characters.map((character) => (
              <div className="character-card" key={character._id}>
                <div className="character-card_avatar">
                  <img
                    src={character.images.avatar}
                    alt="Avatar"
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}

        {currentCharacter && (
          <div className="character-list-carousel_bagliore"></div>
        )}
      </div>
      {currentCharacter &&  (
        <div className="character-list-infocharacter">
          <div className="character-list-infocharacter_info">
            <div className="character-list-infocharacter_info_details">
              <h2>{currentCharacter.characterInfo.name}</h2>
              <div>{currentCharacter.characterInfo.work}</div>
              <sub>{currentCharacter._id}</sub>
            </div>
            <div className="character-list-infocharacter_info_buttons">
              <Link to={`/characters/${currentCharacter._id}`}>Entra</Link>
            </div>
          </div>
          <div className="character-list-infocharacter_pages">
            <a
              href={`https://misteryinvestigation.it/character_images/${currentCharacter._id}/page_1.jpg`}
              target="page_1"
            >
              <img
                src={`${currentCharacter.images.page_1}`}
                alt="Avatar"
              />
            </a>
            <a
              href={`https://misteryinvestigation.it/character_images/${currentCharacter._id}/page_2.jpg`}
              target="page_2"
            >
              <img
                src={`${currentCharacter.images.page_2}`}
                alt="Avatar"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterList;
