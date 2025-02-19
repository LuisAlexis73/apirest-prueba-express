import { IPostsRepository, IPostsService, Posts } from "types/Posts.types";
import { Query } from "types/Repository.types";

export class PostsService implements IPostsService {
  private postsRepository: IPostsRepository;

  constructor(repository: IPostsRepository) {
    this.postsRepository = repository;
  }

  async createPosts(posts: Posts): Promise<Posts> {
    return await this.postsRepository.create(posts);
  }

  async findPosts(query?: Query): Promise<Posts[]> {
    return await this.postsRepository.find(query);
  }

  async findPostsById(id: string): Promise<Posts | null> {
    return await this.postsRepository.findById(id);
  }

  async updatePosts(id: string, post: Partial<Posts>): Promise<Posts | null> {
    return await this.postsRepository.update(id, post);
  }

  async deletePosts(id: string): Promise<boolean> {
    return await this.postsRepository.delete(id);
  }
}
