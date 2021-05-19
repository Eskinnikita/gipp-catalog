import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {  } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faVk, faTwitter, faOdnoklassniki, faTelegram }  from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faVk, faTwitter, faOdnoklassniki, faTelegram )

Vue.component('font-awesome-icon', FontAwesomeIcon)
