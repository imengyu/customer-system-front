const state = {
  authed: false,
  authedUserId: 0,
  authedUserInfo: null,
  authedUserName: null,
  lastAuthTime: null,
  lastNeedAuth: 0,
};
const getters = {
  authed(state) { return state.authed },
  authedUserId(state) { return state.authedUserId },
  authedUserInfo(state) { return state.authedUserInfo },
  authedUserName(state) { return state.authedUserName },
  lastAuthTime(state) { return state.lastAuthTime },
  lastNeedAuth(state) { return state.lastNeedAuth },
};
const mutations = {
  authed(state, authed) { state.authed = authed; },
  authedUserId(state, userId) { state.authedUserId = userId; },
  authedUserInfo(state, userInfo) { state.authedUserInfo = userInfo; },
  authedUserName(state, name) { state.authedUserName = name; },
  lastAuthTime(state, time) { state.lastAuthTime = time; },
  increaseLastNeedAuth(state) { state.lastNeedAuth++; },
};
const actions = {
  setAuthed(context, authed) { context.commit('authed', authed); },
  setAuthedUserId(context, userId) { context.commit('authedUserId', userId); },
  setAuthedUserInfo(context, userInfo) { context.commit('authedUserInfo', userInfo); },
  setLastAuthTime(context, time) { context.commit('lastAuthTime', time); },
  setAuthedUserName(context, name) { context.commit('authedUserName', name); },
 
  requestReloadAuthStatus(context) {
    context.commit('increaseLastNeedAuth');
  },
  resetAuthStatus(context){
    context.commit('authed', false);
    context.commit('authedUserId', null);
    context.commit('authedUserInfo', null);
    context.commit('authedUserName', null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

