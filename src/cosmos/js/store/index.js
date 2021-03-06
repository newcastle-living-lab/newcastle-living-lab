import Vue from 'vue'
import Vuex from 'vuex';

import app from './modules/app';
import projects from './modules/projects';
import project from './modules/project';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		app,
		projects,
		project,
	},
	strict: debug,
});
