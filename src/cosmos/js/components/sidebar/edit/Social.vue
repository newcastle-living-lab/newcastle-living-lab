<template>

	<div class="sidebar-item">

		<sidebar-heading :name="panelName" title="Social Media" />

		<div class="sidebar-top" v-show="visible">
			<ul class="tab tab-block tab-social">
				<li class="tab-item item-twitter-bg" :class="activeTab == 'twitter' ? 'active' : ''">
					<a href="javascript:;" @click="activateTab('twitter')"><twitter-icon /></a>
				</li>
				<li class="tab-item item-facebook-bg" :class="activeTab == 'facebook' ? 'active' : ''">
					<a href="javascript:;" @click="activateTab('facebook')"><facebook-icon /></a>
				</li>
				<li class="tab-item item-instagram-bg" :class="activeTab == 'instagram' ? 'active' : ''">
					<a href="javascript:;" @click="activateTab('instagram')"><instagram-icon /></a>
				</li>
				<li class="tab-item item-youtube-bg" :class="activeTab == 'youtube' ? 'active' : ''">
					<a href="javascript:;" @click="activateTab('youtube')"><youtube-icon /></a>
				</li>
			</ul>
		</div>

		<div class="sidebar-content" v-show="activeTab == 'twitter' && visible">
			<p class="text-gray-medium text-small">Enter a Twitter hashtag, with or without the #. Press enter to add.</p>
			<p class="text-gray-medium text-small">Double-click an item to edit it, and enter to save.</p>
			<div class="form-group">
				<input
					@keyup.enter="addItem({ event: $event, network: 'twitter' })"
					v-focus="activeTab == 'twitter'"
					class="form-input"
					autofocus
					autocomplete="off"
				>
			</div>
			<ul class="menu social-edit-menu">
				<social-item
					v-for="(item, index) in twitter"
					:key="index"
					:item="item"
					network="twitter"
				/>
			</ul>
		</div>

		<div class="sidebar-content" v-show="activeTab == 'facebook' && visible">
			<p class="text-gray-medium text-small">Add full links (URLs) to Facebook groups or pages.</p>
			<p class="text-gray-medium text-small">Double-click an item to edit it, and enter to save.</p>
			<div class="form-group">
				<input
					@keyup.enter="addItem({ event: $event, network: 'facebook' })"
					v-focus="activeTab == 'facebook'"
					class="form-input"
					autocomplete="off"
				>
			</div>
			<ul class="menu social-edit-menu">
				<social-item
					v-for="(item, index) in facebook"
					:key="index"
					:item="item"
					network="facebook"
				/>
			</ul>
		</div>

		<div class="sidebar-content" v-show="activeTab == 'instagram' && visible">
			<p class="text-gray-medium text-small">Enter an Instagram hashtag, with or without the #. Press enter to add.</p>
			<p class="text-gray-medium text-small">Double-click an item to edit it, and enter to save.</p>
			<!-- https://www.instagram.com/explore/tags/websearch/ -->
			<div class="form-group">
				<input
					@keyup.enter="addItem({ event: $event, network: 'instagram' })"
					v-focus="activeTab == 'instagram'"
					class="form-input"
					autocomplete="off"
				>
			</div>
			<ul class="menu social-edit-menu">
				<social-item
					v-for="(item, index) in instagram"
					:key="index"
					:item="item"
					network="instagram"
				/>
			</ul>
		</div>

		<div class="sidebar-content" v-show="activeTab == 'youtube' && visible">
			<p class="text-gray-medium text-small">Enter a link to a YouTube video and press enter to add.</p>
			<p class="text-gray-medium text-small">Double-click an item to edit it, and enter to save.</p>

			<div class="form-group">
				<input
					@keyup.enter="addItem({ event: $event, network: 'youtube' })"
					v-focus="activeTab == 'youtube'"
					class="form-input"
					autocomplete="off"
				>
			</div>
			<ul class="menu social-edit-menu">
				<social-item
					v-for="(item, index) in youtube"
					:key="index"
					:item="item"
					network="youtube"
				/>
			</ul>
		</div>

		<div class="sidebar-footer" v-show="visible">
			<button
				type="button"
				class="btn btn-success"
				@click="next()"
			>Next</button>
		</div>

	</div>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import TwitterIcon from 'vue-feather-icons/icons/TwitterIcon';
import FacebookIcon from 'vue-feather-icons/icons/FacebookIcon';
import InstagramIcon from 'vue-feather-icons/icons/InstagramIcon';
import YoutubeIcon from 'vue-feather-icons/icons/YoutubeIcon';

import SocialItem from './SocialItem.vue';

export default {

	components: {
		SocialItem,
		TwitterIcon,
		FacebookIcon,
		InstagramIcon,
		YoutubeIcon,
	},

	directives: {
		focus (el, { value }, { context }) {
			if (value) {
				context.$nextTick(() => {
					el.focus()
				})
			}
		}
	},

	data() {
		return {
			panelName: 'social',
			activeTab: 'twitter',
		};
	},

	computed: {
		...mapState('app', {
			visible(state) {
				return state.editPanel == this.panelName
			},
		}),
		...mapState('project', {
			projectData: state => state.project.data,
		}),
		...mapGetters('project', ['social']),
		twitter() {
			return this.social.filter(item => item.network == 'twitter');
		},
		facebook() {
			return this.social.filter(item => item.network == 'facebook');
		},
		instagram() {
			return this.social.filter(item => item.network == 'instagram');
		},
		youtube() {
			return this.social.filter(item => item.network == 'youtube');
		},
	},

	methods: {

		activateTab(name) {
			this.activeTab = name;
		},

		addItem({ event, network }) {
			let value = event.target.value;
			if (value.trim()) {
				this.$store.commit('project/addSocial', { network: network, value: value });
			}
			event.target.value = '';
		},

		next() {
			this.$store.dispatch('app/doEditNext', this.panelName);
		},

	}

}
</script>
