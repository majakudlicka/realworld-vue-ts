import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {Profile, User, UserForUpdate, UserSubmit} from '@/store/models';
import {loginUser, fetchProfile, updateUser} from '@/store/api';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true
})
class UsersModule extends VuexModule {
    user: User | null = null;
    profile: Profile | null = null;

    @Mutation
    setUser(user: User) { this.user = user; }

    @Mutation
    setProfile(profile: Profile) {
        this.profile = profile;
    }

    get username() {
        return this.user && this.user.username || null;
    }

    @Action({commit: 'setUser'})
    async login(userSubmit: UserSubmit) {
        try {
            const user = await loginUser(userSubmit);
            return user;
        } catch (err) {
            console.error(err);
            throw new Error('Invalid username or password');
        }

    }

    @Action({ commit: 'setProfile'})
    async loadProfile(username: string) {
        const profile = await fetchProfile(username);
        return profile;
    }

    // @MutationAction
    // async updateSelfProfile(userUpdateFields: UserForUpdate) {
    //     const user = await updateUser(userUpdateFields);
    //     return { user };
    // }
}

export default getModule(UsersModule);
