import { Component 			} from '@angular/core';
import { NavController 		} from 'ionic-angular';
import { NavParams 			} from 'ionic-angular';

import { ScanPage 			} from '../scan/scan';

@Component({
	selector: 		'page-home',
	templateUrl: 	'home.html'
})
export class HomePage {

	textQR			: string;
	show 			= null;
	servicesData 	: { data: string};
	scaner: any;
	temp: string;

	constructor(
		public navCtrl		: NavController,
		public navParams	: NavParams
		) {
			if(this.navParams.data){
				this.servicesData = this.navParams.data;
				this.textQR = this.servicesData.data;
			}
	}

	ionViewDidLoad() {
		console.log('this.navParams.data = ',this.navParams.data);
		if(this.navParams.data){
			this.servicesData = this.navParams.data;
			this.textQR = this.servicesData.data;
			this.toggleAccordion('idx');
		}
	}

	scan_qr_code() {
		this.toggleAccordion('idx');
		this.navCtrl.push(ScanPage);
		//---//


		// this.toggleAccordion('idx');
	}

	tempfun(en: boolean){
		if(en == true){
			this.temp = 'Выполняется функция';
		}
		else{
			this.temp = 'Останавливается функция';
		}
	}

	toggleAccordion(idx) {
		if (this.isLevelShown(idx)) {
			this.show = null;
		} else {
			this.show = idx;
		}
	}

	isLevelShown(idx) {
		return this.show === idx;
	};
}
