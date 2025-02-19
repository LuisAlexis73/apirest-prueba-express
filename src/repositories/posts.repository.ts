import { PostsModel } from "@models/Posts";
import { Posts, IPostsRepository } from "types/Posts.types";
import { Query } from "types/Repository.types";

export class PostsRepository implements IPostsRepository {
  async create(post: Posts): Promise<Posts> {
    const newPost = new PostsModel(post);

    return await newPost.save();
  }

  async find(query?: Query): Promise<Posts[]> {
    return await PostsModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Posts | null> {
    return await PostsModel.findById(id).exec();
  }

  async update(id: string, post: Partial<Posts>): Promise<Posts | null> {
    return await PostsModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deletePost = await PostsModel.findByIdAndDelete(id).exec();

    return !!deletePost;
  }
}
