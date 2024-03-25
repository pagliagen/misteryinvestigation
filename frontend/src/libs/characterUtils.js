const listCharacteristics = [
  { name: "Forza", value: 0 },
  { name: "Costituzione", value: 0 },
  { name: "Taglia", value: 0 },
  { name: "Destrezza", value: 0 },
  { name: "Fascino", value: 0 },
  { name: "Istruzione", value: 0 },
  { name: "Intelligenza", value: 0 },
  { name: "Potere", value: 0 },
];

const listSkills = [
  { name: "Ammaliare", value: 15, minValue: 15, maxValue: 100 },
  { name: "Antropologia", value: 0, minValue: 0, maxValue: 100 },
  { name: "Archeologia", value: 0, minValue: 0, maxValue: 100 },
  {
    name: "Armi da fuoco (fucile/shotgun)",
    value: 25,
    minValue: 25,
    maxValue: 100,
  },
  {
    name: "Armi da fuoco (pistola)",
    value: 20,
    minValue: 20,
    maxValue: 100,
  },
  {
    name: "Armi da fuoco (generico)",
    value: 0,
    minValue: 0,
    maxValue: 100,
  },
  {
    name: "Arti e Mestieri (generico)",
    value: 5,
    minValue: 5,
    maxValue: 100,
  },
  { name: "Ascoltare", value: 25, minValue: 25, maxValue: 100 },
  { name: "Biblioteconomia", value: 20, minValue: 20, maxValue: 100 },
  { name: "Camuffare", value: 5, minValue: 5, maxValue: 100 },
  { name: "Cavalcare", value: 5, minValue: 5, maxValue: 100 },
  { name: "Combatte (rissa)", value: 25, minValue: 25, maxValue: 100 },
  { name: "Combattere (generico)", value: 0, minValue: 0, maxValue: 100 },
  { name: "Contabilità", value: 5, minValue: 5, maxValue: 100 },
  { name: "Furtività", value: 20, minValue: 20, maxValue: 100 },
  { name: "Guidare (auto)", value: 20, minValue: 20, maxValue: 100 },
  { name: "Guidare (generico)", value: 0, minValue: 0, maxValue: 100 },
  { name: "Individuare", value: 25, minValue: 25, maxValue: 100 },
  { name: "Intimidire", value: 25, minValue: 25, maxValue: 100 },
  { name: "Lanciare", value: 20, minValue: 20, maxValue: 100 },
  { name: "Legge", value: 5, minValue: 5, maxValue: 100 },
  { name: "Lingua (generico)", value: 0, minValue: 0, maxValue: 100 },
  { name: "Lingua (Madre)", value: 0, minValue: 0, maxValue: 100 },
  {
    name: "Man. macch. pesanti",
    value: 0,
    minValue: 0,
    maxValue: 100,
  },
  { name: "Medicina", value: 0, minValue: 0, maxValue: 100 },
  { name: "Miti di Cthulhu", value: 0, minValue: 0, maxValue: 100 },
  { name: "Naturalistica", value: 10, minValue: 10, maxValue: 100 },
  { name: "Navigare", value: 10, minValue: 10, maxValue: 100 },
  { name: "Nuotare", value: 20, minValue: 20, maxValue: 100 },
  { name: "Occultismo", value: 5, minValue: 5, maxValue: 100 },
  { name: "Persuadere", value: 10, minValue: 10, maxValue: 100 },
  { name: "Pilotare (generico)", value: 0, minValue: 0, maxValue: 100 },
  { name: "Primo soccorso", value: 30, minValue: 30, maxValue: 100 },
  { name: "Psicoanalisi", value: 0, minValue: 0, maxValue: 100 },
  { name: "Psicologia", value: 10, minValue: 10, maxValue: 100 },
  { name: "Raggirare", value: 5, minValue: 5, maxValue: 100 },
  { name: "Rapidità di mano", value: 10, minValue: 10, maxValue: 100 },
  {
    name: "Rip. elettriche",
    value: 10,
    minValue: 10,
    maxValue: 100,
  },
  {
    name: "Rip. meccaniche",
    value: 10,
    minValue: 10,
    maxValue: 100,
  },
  { name: "Saltare", value: 20, minValue: 20, maxValue: 100 },
  { name: "Scalare", value: 20, minValue: 20, maxValue: 100 },
  { name: "Scassinare", value: 0, minValue: 0, maxValue: 100 },
  { name: "Schivare", value: 0, minValue: 0, maxValue: 100 },
  { name: "Scienze (specificare)", value: 0, minValue: 0, maxValue: 100 },
  { name: "Seguire tracce", value: 10, minValue: 10, maxValue: 100 },
  {
    name: "Sopravvivenza (generico)",
    value: 10,
    minValue: 10,
    maxValue: 100,
  },
  { name: "Storia", value: 5, minValue: 5, maxValue: 100 },
  { name: "Valore di credito", value: 0, minValue: 0, maxValue: 100 },
  { name: "Valutare", value: 5, minValue: 5, maxValue: 100 },
];
 
export const getListCharacteristics = async () => {
    return listCharacteristics;
};

export const getListSkills = async () => {
    return listSkills;
};
