import { Query, Repository } from "./Repository.types";

export interface Posts {
  title: string;
  description: string;
  content?: string;
  featureImage: string;
  author: string;
}

export interface IPostsRepository extends Repository<Posts> {}

export interface IPostsService {
  createPosts(post: Posts): Promise<Posts>;
  findPosts(query?: Query): Promise<Posts[]>;
  findPostsById(id: string): Promise<Posts | null>;
  updatePosts(id: string, post: Partial<Posts>): Promise<Posts | null>;
  deletePosts(id: string): Promise<boolean>;
}
