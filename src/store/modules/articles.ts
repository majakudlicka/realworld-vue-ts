import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Article } from '../models';
import * as api from '@/store/api';
type FeedType = 'global' | 'user';

@Module({
    dynamic: true,
    namespaced: true,
    name: 'atricles',
    store
})


class ArticlesModule extends VuexModule {
    feed: Article[] = [];


    @Mutation
    setFeed(articles: Article[]) {
        this.feed = articles;
    }

    @Action({commit: 'setFeed'})
    async refreshFeed(type: FeedType) {
        const globalFeed = await api.getGlobalFeed();
        return globalFeed.articles;
    }

}


export default getModule(ArticlesModule);
