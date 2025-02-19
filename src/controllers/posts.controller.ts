import { IPostsRepository, IPostsService } from "types/Posts.types";
import { PostsRepository } from "@repositories/posts.repository";
import { PostsService } from "@services/Posts.service";
import { Request, Response } from "express";

const postsRepository: IPostsRepository = new PostsRepository();
const postsService: IPostsService = new PostsService(postsRepository);

export const findPosts = async (req: Request, res: Response) => {
  //console.log("req findPosts :>>", req.currentUser); // Este 'currentUser' lo puedo acceder gracias a la extension de la carpeta @types dentro del node_modules

  try {
    const posts = await postsService.findPosts();

    if (posts.length === 0) {
      res.status(404).json({ message: "No posts found" });
    }

    res.json(posts);
  } catch (error) {
    console.log("Error finding posts", error);
    res.status(500).json({ message: "Error finding posts" });
  }
};

export const findPostsById = async (req: Request, res: Response) => {
  try {
    const posts = await postsService.findPostsById(req.params.id);

    if (!posts) {
      res.status(404).json({ message: "Post not found" });
    }

    res.json(posts);
  } catch (error) {
    console.log("Error finding post", error);
    res.status(404).json({ message: "Error finding post" });
  }
};

export const createPosts = async (req: Request, res: Response) => {
  try {
    const newPost = req.body;
    const result = await postsService.createPosts(newPost);

    res.status(201).json(result);
  } catch (error) {
    console.log("Error creating post", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePosts = async (req: Request, res: Response) => {
  try {
    const posts = await postsService.updatePosts(req.params.id, req.body);

    if (!posts) {
      res.status(404).json({ message: "Post not found" });
    }

    res.json(posts);
  } catch (error) {
    console.log("Error updating post", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePosts = async (req: Request, res: Response) => {
  try {
    const posts = await postsService.deletePosts(req.params.id);

    if (!posts) {
      res.status(404).json({ message: "Post not found" });
    }

    res.json(posts);
  } catch (error) {
    console.log("Error deleting post", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};
