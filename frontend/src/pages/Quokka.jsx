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

  const phrases = ["téléphone", "tablette", "voiture" ];

  const search = "je veux eteindre mon téléphone";

  const searchTostring = search.split(" ");
  console.log(searchTostring) 
  console.log(searchTostring[0])
  console.log(tutorials.filter((e)=> e.hashtag.includes(searchTostring[2])))

  searchTostring






