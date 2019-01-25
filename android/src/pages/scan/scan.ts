import { Component 			} from '@angular/core';
import { NavController		} from 'ionic-angular';
import { NavParams 			} from 'ionic-angular';

import { QrScan 			} from '../../providers/qr-scan/qr-scan';
import { ToolBox 			} from '../../providers/qr-scan/ToolBox';

import { HomePage 			} from '../home/home';

@Component({
	selector				: 'page-scan',
	templateUrl				: 'scan.html',
})
export class ScanPage {
	qrheader		: boolean = false;

	constructor(
		public navCtrl		: NavController,
		private qrscan		: QrScan,
		public navParams	: NavParams) {
			let self = this;
			this.qrheader = true;
			console.log("Scan start");
			Promise.resolve("proceed")
				.then((k) => {
					return this.qrscan.scan();
				}).then((qrcode) => {
					if (qrcode == "" || qrcode == undefined) {
						return Promise.reject("invalid_qr_code");
					}
					self.qrheader = false;
					this.navCtrl.setRoot(HomePage, {data: qrcode});
					//this.textQR = qrcode;
					//alert("Value：" + qrcode);
					// return  your_method_with_passing_qr(qrcode);
				}).then((data) => {
					console.log(data);
				}).catch((error) => {
					if (error == "invalid_qr_code") {
						console.log('your_custom_error_message');
						this.navCtrl.setRoot(HomePage, {data: error});
						//this.textQR = error;
					} else {
						//handle error here.
						this.navCtrl.setRoot(HomePage, {data: 'handle error here!!!'});
						// this.textQR = "error";
					}
				});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ScanPage');
	}

	exit_from_qr_scan(): void {
		this.qrheader = false;
		ToolBox.hideCamera();
	}

	change_camera(): void {
		this.qrscan.chnage_camera();
	}

	light_enable_desable(): void {
		this.qrscan.enaable_desable_light();
	}
}
