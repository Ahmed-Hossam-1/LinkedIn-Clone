// import { Timestamp } from "firebase/firestore";

import { Timestamp } from "firebase/firestore";

// type TImage = {
//   lastModified: number;
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
//   lastModifiedDate: Date;
// };

export type TUser = {
  email: string;
  displayName: string;
  photoURL: string;
};

export type TArticle = {
  image: any;
  video: string;
  user: TUser;
  description: string;
  timestamp: Timestamp;
};

export type TArticleState = {
  actor: {
    title: string;
    description: string;
    Date: Timestamp;
    image: string;
  };
  commrnts: number;
  description: string;
  video: any;
  sharedImg: any;
};
