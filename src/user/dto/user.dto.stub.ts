// import { ArticleDTO } from "src/article.dto";

// export const ArticleDTOStub = (): ArticleDTO => {
//   return {
//     title: "This is the title of the article",
//     authorName: "Vinicius Santos de Pontes",
//     body: "This is a stub for testing",
//   };
// };


export const UserDTOStub = () => {
  return {
    created_by: "admin",
    email : "julie12@gmail.com",
    gender : "male",
    mobile_number : "3434343",
    name : "julie",
    password : "julie",
    role_id   : "[eeeee]",
  };
};


export const getUserDTOStub = () => {
  return {
    id : "6532becd79af55a93dcaa26e",
  };
};
