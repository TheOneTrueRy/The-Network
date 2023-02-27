import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { router } from "../router.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getAllPosts(){
    const res = await api.get('api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async createPost(postData){
    const res = await api.post('api/posts', postData)
    logger.log(res.data)
    AppState.posts.unshift(new Post(res.data))
    this.getAllPosts()
    document.getElementById('topofposts').scrollIntoView()
  }

  async getPostsByQuery(query){
    const res = await api.get('api/posts/', {params: query})
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
    logger.log(AppState.posts)
  }

  async changePage(url){
    const res = await api.get(url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async changePageWithQuery(url){
    const res = await api.get(url, {query: AppState.query})
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async likePost(postId){
    const res = await api.post(`api/posts/${postId}/like`)
    const response = await api.get('api/posts/' + postId)
    let i = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts.splice(i, 1, new Post(response.data))
  }

  async search(searchData){
    const res = await api.get('api/posts', {params: searchData})
    router.push({name: 'Search'})
    AppState.query = searchData.query
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async deletePost(postId){
    const res = await api.delete('api/posts/' + postId)
    let i = AppState.posts.findIndex(p => p.id == postId)
    if(i != -1){
      AppState.posts.splice(i, 1)
    }
  }

  clearPosts(){
    AppState.posts = []
  }
}

export const postsService = new PostsService()