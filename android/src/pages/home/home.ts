import { Component 			} from '@angular/core';
import { NavController 		} from 'ionic-angular';
import { QrScan 			} from '../../providers/qr-scan/qr-scan';
import { ToolBox 			} from '../../providers/qr-scan/ToolBox';

@Component({
	selector: 		'page-home',
	templateUrl: 	'home.html'
})
export class HomePage {
	qrheader	: boolean = false;
	textQR		: string;
	show 		= null;
	show2		: string = "show";
	constructor(
		public navCtrl		: NavController,
		private qrscan		: QrScan) {

	}

	ionViewDidLoad() {

	}

	scan_qr_code() {
		// this.toggleAccordion('idx');

		this.show2 = "hide";
		console.log('this.show2 = ',this.show2);
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
				this.textQR = qrcode;
				//alert("Value：" + qrcode);
				// return  your_method_with_passing_qr(qrcode);
			}).then((data) => {
				console.log(data);
			}).catch((error) => {
				if (error == "invalid_qr_code") {
					console.log('your_custom_error_message');
					this.textQR = error;
				} else {
					//handle error here.
					this.textQR = "error";
				}
			});
		this.show2 = 'show';
		console.log('this.show2 = ',this.show2);
		// this.toggleAccordion('idx');
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
