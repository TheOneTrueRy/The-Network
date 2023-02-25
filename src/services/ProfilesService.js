import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"


class ProfilesService{
  async getProfileById(profileId){
    const res = await api.get('api/profiles/' + profileId)
    AppState.profile = new Profile(res.data)
  }

  clearProfile(){
    AppState.profile = null
  }
}

export const profilesService = new ProfilesService()