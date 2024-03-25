export const handleError = (error) => {
  if (error.response) {
    console.error("Errore nella richiesta:", error.response.data);
    throw new Error(JSON.stringify(error.response.data));
  } else if (error.request) {
    console.error("Nessuna risposta ricevuta:", error.request);
    throw new Error(
      "Nessuna risposta dal server. Si prega di riprovare più tardi."
    );
  } else {
    console.error(
      "Errore durante la configurazione della richiesta:",
      error.message
    );
    throw error;
  }
};
