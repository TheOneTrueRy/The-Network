import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getAllPosts(){
    const res = await api.get('api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async createPost(postData){
    const res = await api.post('api/posts', postData)
    logger.log(res.data)
    AppState.posts.unshift(new Post(res.data))
  }

  async getPostsByQuery(query){
    const res = await api/get('api/posts/', {params: query})
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  clearPosts(){
    AppState.posts = []
  }
}

export const postsService = new PostsService()