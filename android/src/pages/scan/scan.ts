import { Component 			} from '@angular/core';
import { NavController		} from 'ionic-angular';
import { NavParams 			} from 'ionic-angular';


@Component({
	selector				: 'page-scan',
	templateUrl				: 'scan.html',
})
export class ScanPage {

	constructor(
		public navCtrl		: NavController,
		public navParams	: NavParams) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ScanPage');
	}

}
