import React from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import "./DiceRollerMessages.css";

function DiceRollerMessages() {
  const { diceRollMessages,setDiceRollMessages } = useGlobalState();

  const handleCloseRollDiceMessage = (index) => {
    const newDiceRollMessages = [...diceRollMessages];
    newDiceRollMessages[index].visible = false;
    setDiceRollMessages(newDiceRollMessages)
  };

  return (
    <div className="dicerollermessages-listner">
      {        diceRollMessages?.some((m) => m.visible) && (
          <div className="dicerollermessages-pushdicerollmessage">
            {diceRollMessages?.map(
              (r, index) =>
                r.visible && (
                  <div
                    key={index}
                    className={`dicerollermessages-pushdicerollmessage_popup rolldice_${r.level}`}
                    onClick={() => handleCloseRollDiceMessage(index)}
                  >
                    <div className="dicerollermessages-pushdicerollmessage_popup_rolldice">
                      {r.level}
                    </div>
                    <div
                      className="dicerollermessages-pushdicerollmessage_popup_message"
                      dangerouslySetInnerHTML={{ __html: r.message }}
                    ></div>
                  </div>
                )
            )}
          </div>
        )}
    </div>
  );
}

export default DiceRollerMessages;
