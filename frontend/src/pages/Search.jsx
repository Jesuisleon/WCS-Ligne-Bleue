import React, {useState} from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const tutorials = [
    {
      id :1,
      tutorialName : "Conecter son téléphone aux wi-fi",
      hastag : ["téléphone","wi-fi"]
    },
    {
      id :2,
      tutorialName : "Utiliser son téléphone mobile",
      hastag : ["utiliser","téléphone","mobile"]
    },
    {
      id :3,
      tutorialName : "Eteindre son ordinateur",
      hastag : ["eteindre","ordinateur"]
    },
    {
      id :4,
      tutorialName : "Eteindre son téléphone",
      hastag : ["eteindre","téléphone"]
    },
    {
      id :5,
      tutorialName : "Utiliser son ordinateur",
      hastag : ["utiliser","ordinateur"]
    },
    {
      id :6,
      tutorialName : "Utiliser sa tablette",
      hastag : ["utiliser","tablette"]
    },
    {
      id :7,
      tutorialName : "Eteindre sa tablette",
      hastag : ["eteindre","tablette"]
    },

  ]

 

  const email= "blabla"
  return (
    <div
      className="
    flex-grow
    flex
    flex-col
    px-20
    align-center
    "
    >
      <form onSubmit={()=> console.log("blabla")}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="flex justify-center mb-2 text-sm font-medium text-gray-900 dark:text-dark mt-2"
          >
            Veuillez renseigner ci-dessous votre recherche
          </label>
          <input
            type="search"
            id="email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Exemple : Tutoriel pour apprendre à allumer sont téléphone "
            required
          />
        </div>
      </form>
      {tutorials
      .filter((e)=> e.hastag.includes(searchValue) )
      .map((e)=>
      <div className="mt-2">
       <h1>{e.tutorialName}</h1> 
       <h2>{e.hastag}</h2> 
      </div>
      )}

    </div>
    )
}
