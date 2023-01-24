const blabla = [
  { value: "Utiliser ligne bleue", isChecked: false },
  { value: "Utiliser mon téléphone", isChecked: false },
  { value: "ddd", isChecked: false },
  { value: "Utilaaaéphone", isChecked: true },
  { value: "Utilggggbleue", isChecked: true },
  { value: "Utvvvvhone", isChecked: false },
  { value: "Utiligtgg", isChecked: false },
  { value: "Utilbgggggg", isChecked: false },
  { value: "U,,,,,", isChecked: false },
  { value: "Utiliser m,kllllllllll", isChecked: false },
];

blabla.filter((e) => e.isChecked === true);
