import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'page-rezul',
	templateUrl: 'rezul.html',
})
export class RezulPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RezulPage');
	}

}
