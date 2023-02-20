export interface User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface Posts {
  id: string;
  image: string;
  likes: number;
  owner: User;
  publishDate: "2020-05-24T14:53:17.598Z";
  tags: string[];
  text: string;
}

export interface Data {
  data: Posts;
  limit: number;
  page: number;
  total: number;
}

export interface Comments {
  id: string;
  message: string;
  owner: User;
  post: string;
  publishDate: string;
}
