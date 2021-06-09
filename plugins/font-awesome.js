import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faVk, faTwitter, faOdnoklassniki, faTelegram } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faVk, faTwitter, faOdnoklassniki, faTelegram, faHeart, faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)
