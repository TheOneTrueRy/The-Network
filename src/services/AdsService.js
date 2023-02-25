import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from '../AppState.js'


class AdsService{
  async getAds(){
    const res = await api.get('api/ads')
    AppState.ads = res.data
    logger.log(AppState.ads)
  }
}

export const adsService = new AdsService()