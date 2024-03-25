import React, { Component } from "react";
import { GlobalStateContext } from "./GlobalStateContext";
import { getCharacterList } from "../services/characters";
import { WEBSOCKET_ENDPOINT } from "../config";
import MobileDetect from 'mobile-detect';
const uuid = require("uuid");

class GlobalStateProvider extends Component {
  constructor(props) {
    super(props);

    this.socket = null;
    this.state = {
      wwsToken: uuid.v4(),
      isMobile: false,
      listCharacteristics: null,
      listSkills: null,
      listAudios: null,
      audioStreaming: null,
      diceRollMessages: [],
      sessionInfo: {
        token: null,
        user: null,
        characters: null,
        activeCharacter: null,
        fetchUser: async () => {
          const token = localStorage.getItem("token");
          if (token !== null && this.state.sessionInfo.token !== token) {
            await this.fetchData();
          }
        },
      },
    };
  }
  
  handleWindowSize = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    const isThisDeviceMobile = md.mobile() !== null || md.tablet() !== null;
    this.setState({ ...this.state, isMobile: isThisDeviceMobile });
  };

  componentDidMount() {
    this.fetchData();
    this.initSocket();
    this.updateDiceRollMessages();
    this.handleWindowSize();
    window.addEventListener('resize', this.handleWindowSize);
  } 

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSize);
  }

  async fetchData() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const characterData = await getCharacterList();
        this.setState((prevState) => ({
          sessionInfo: {
            ...prevState.sessionInfo,
            token: token,
            user: characterData.user,
            characters: characterData.characters,
            activeCharacter: null,
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("token");
      this.setState((prevState) => ({
        sessionInfo: {
          ...prevState.sessionInfo,
          token: null,
          user: null,
          characters: null,
          activeCharacter: null,
        },
      }));
    }
  }

  initSocket() {
    const instanceSocket = new WebSocket(WEBSOCKET_ENDPOINT);

    instanceSocket.onopen = (ws) => {
      console.log("WebSocket connection established.", this.state.wwsToken);
      this.socket = ws.target;
      this.socket.send(
        JSON.stringify({
          action: "SESSION_TOKEN",
          sessionToken: this.state.wwsToken,
        })
      );
    };

    instanceSocket.onerror = (error) => {
      console.error("WebSocket connection error:", error);
      this.socket = null;
    };

    instanceSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setTimeout(() => {
        this.initSocket();
      }, 1000);
    };

    instanceSocket.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        console.log("WebSocket message received:", parsedMessage.action);
        if (parsedMessage.action === "audioStreaming") {
          this.setState({
            ...this.state,
            audioStreaming: parsedMessage.data.file,
          });
          console.log("Updated audioStreaming in GlobalStateProvider.js");
        }
        if (parsedMessage.action === "initParameters") {
          this.setState({
            ...this.state,
            ...parsedMessage.data.costants,
          });
          console.log("Updated initParameters in GlobalStateProvider.js");
        }
        if (parsedMessage.action === "ping") {
          this.socket.send(
            JSON.stringify({
              sessionToken: this.state.wwsToken,
              action: "SESSION_PONG",
            })
          );
        }
        if (parsedMessage.action === "diceRollMessage") {
          const now = new Date().getTime();
          const prevMessages = this.state.diceRollMessages || [];
          const newMessages = [
            ...prevMessages.filter((m) => m.visible && m.timeout >= now),
            {
              ...parsedMessage.data,
              timeout: now + 122220000,
              visible: true,
            },
          ];
          this.setState({
            ...this.state,
            diceRollMessages: newMessages,
          });
          console.log(
            "Updated diceRollMessages in GlobalStateProvider.js",
            newMessages
          );
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  }

  updateDiceRollMessages() {
    setInterval(() => {
      const { diceRollMessages } = this.state;
      const prevMessages = diceRollMessages || [];
      if (prevMessages.length > 0 && diceRollMessages.length > 0) {
        const now = new Date().getTime();
        const newRollMessages = prevMessages
          .filter((m) => m.visible)
          .map((m) => ({ ...m, visible: m.timeout >= now }));

        this.setState({
          ...this.state,
          diceRollMessages: newRollMessages,
        });
      }
    }, 1000);
  }

  render() {
    const {
      isMobile,
      sessionInfo,
      listCharacteristics,
      listSkills,
      listAudios,
      audioStreaming,
      diceRollMessages,
    } = this.state;
    const { children } = this.props;
    const contextValue = {
      isMobile,
      sessionInfo,
      listCharacteristics,
      listSkills,
      listAudios,
      audioStreaming,
      diceRollMessages,
      socket: this.socket === null ? false : true,
      sendSocketMessage: (action, message) => {
        if (this.socket !== null) {
          this.socket.send(
            JSON.stringify({
              sessionToken: this.state.wwsToken,
              action: action,
              data: message,
            })
          );
        }
      },
      updateCharacter: (updateCharacter) =>
        this.setState({
          ...this.state,
          sessionInfo: {
            ...this.state.sessionInfo,
            characters: this.state.sessionInfo.characters.map((character) =>
              character._id === updateCharacter._id ? updateCharacter : character
            ),
          },
        }),
      setSessionInfo: (newSessionInfo) =>
        this.setState({ ...this.state, sessionInfo: newSessionInfo }),
      setListAudios: (value) =>
        this.setState({ ...this.stats, listAudios: value }),
      setDiceRollMessages: (value) =>
        this.setState({ ...this.stats, diceRollMessages: value }),
    };

    return (
      <GlobalStateContext.Provider value={contextValue}>
        {children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;
