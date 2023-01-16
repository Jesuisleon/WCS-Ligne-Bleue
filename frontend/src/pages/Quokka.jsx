import React, {useState} from "react";
const tutorials = [
    {
      id :1,
      tutorialName : "Conecter son téléphone aux wi-fi",
      hashtag: ["téléphone"]
    },
    {
      id :2,
      tutorialName : "Utiliser son téléphone mobile",
      hashtag: ["utiliser","téléphone","mobile"]
    },
    {
      id :3,
      tutorialName : "Eteindre son ordinateur",
      hashtag: ["eteindre","ordinateur"]
    },
    {
      id :4,
      tutorialName : "Eteindre son téléphone",
      hashtag: ["eteindre","téléphone"]
    },
    {
      id :5,
      tutorialName : "Utiliser son ordinateur",
      hashtag: ["utiliser","ordinateur"]
    },
    {
      id :6,
      tutorialName : "Utiliser sa tablette",
      hashtag: ["utiliser","tablette"]
    },
    {
      id :7,
      tutorialName : "Eteindre sa tablette",
      hashtag: ["eteindre","tablette"]
    },
  ]

  const phrases = ["téléphone", "tablette", "voiture" ]


  console.log(tutorials.filter((e)=> e.hashtag.includes("téléphone") || e.hashtag.includes("blabla") ))

  tutorials.filter((e)=>e.hashtag.includes())









  console.log(tutorials[0].hastag[0])

const searchValue = "téléphone téléphone téléphone téléphone "


const splitPhrasing = (phrase, tableToConvert) =>{
    const phraseSplit = phrase.split(" ")
    console.log(phraseSplit)
    console.log(tableToConvert.filter((e)=> e.hastag.includes(phraseSplit.map((e) => e))))

    return phraseSplit
  }

  splitPhrasing(searchValue, tutorials)

  tutorials.filter((e)=>e.hastag.includes(phraseSplit.map((a)=> a)))





