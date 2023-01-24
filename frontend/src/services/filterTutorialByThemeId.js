
// const blabla = [
//     {
// author: "admin",
// creation_date: "2023-01-20T10:58:47.000Z",
// description: "<p>test pour migrate</p>",
// difficulty: "1",
// edition_date: "2023-01-20T10:58:47.000Z",
// hashtag:  
// [
// {id: 1, text: 'phone'},
// {id: 2, text: 'internet'},
// ],
// id: 1,
// objective: "migrate",
// published: 0,
// step: "[{\"id\":1,\"type\":\"editor\",\"content\":\"<p>remplacmeent</p>\"}]",
// theme_id: 2,
// title: "test",
// },
// {
// author: "admin",
// creation_date: "2023-01-20T10:58:47.000Z",
// description: "<p>test pour migrate</p>",
// difficulty: "1",
// edition_date: "2023-01-20T10:58:47.000Z",
// hashtag:  
// [
// {id: 1, text: 'phone'},
// {id: 2, text: 'internet'},
// ],
// id: 1,
// objective: "migrate",
// published: 0,
// step: "[{\"id\":1,\"type\":\"editor\",\"content\":\"<p>remplacmeent</p>\"}]",
// theme_id: 3,
// title: "test",
// },

// {
//     author: "admin",
//     creation_date: "2023-01-20T10:58:47.000Z",
//     description: "<p>test pour migrate</p>",
//     difficulty: "1",
//     edition_date: "2023-01-20T10:58:47.000Z",
//     hashtag:  
//     [
//     {id: 1, text: 'phone'},
//     {id: 2, text: 'internet'},
//     ],
//     id: 1,
//     objective: "migrate",
//     published: 0,
//     step: "[{\"id\":1,\"type\":\"editor\",\"content\":\"<p>remplacmeent</p>\"}]",
//     theme_id: 2,
//     title: "test",
//     },

//     {
//         author: "admin",
//         creation_date: "2023-01-20T10:58:47.000Z",
//         description: "<p>test pour migrate</p>",
//         difficulty: "1",
//         edition_date: "2023-01-20T10:58:47.000Z",
//         hashtag:  
//         [
//         {id: 1, text: 'phone'},
//         {id: 2, text: 'internet'},
//         ],
//         id: 1,
//         objective: "migrate",
//         published: 0,
//         step: "[{\"id\":1,\"type\":\"editor\",\"content\":\"<p>remplacmeent</p>\"}]",
//         theme_id: 4,
//         title: "test",
//         },

// ]


const filterTutorialByThemeId = (themeId, arrayTofilter) => {
    return arrayTofilter.filter(tutorial => tutorial.theme_id === themeId);
  }

//   const blibli = filterTutorialByThemeId(2, blabla)

//   console.log(blibli)

  export default filterTutorialByThemeId
