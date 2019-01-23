import { Component 			} from '@angular/core';
import { NavController 		} from 'ionic-angular';
import { BarcodeScanner 	} from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
	selector: 			'page-home',
	templateUrl: 		'home.html'
})
export class HomePage {

	textbarcode: any;
	QRtext: any;

	constructor(
		public navCtrl: NavController,
		private barcodeScanner: BarcodeScanner,
		private qrScanner: QRScanner
	) {

	}

	ScanerBarcode(){
		this.barcodeScanner.scan().then((barcodeData) => {
			this.barcode = barcodeData.text;
			this.textbarcode = barcodeData.text;
		}, (err) => {
			this.barcode=err;
			this.textbarcode = 'Error!';
		});
	}

	ScanerQRScanner(){
		this.qrScanner.prepare()
		.then((status: QRScannerStatus) => {
			this.status = 'Start QRScannerStatus';
			if (status.authorized) {
				this.qrScanner.show();
				this.qrScanner.useBackCamera();
				this.status = this.qrScanner.getStatus();
				// camera permission was granted
				// start scanning
					let scanSub = this.qrScanner.scan().subscribe((text: string) => {
						this.status = 'this.qrScanner.scan';
						console.log('Scanned something', text);
						this.QRtext = text;
						this.qrScanner.hide(); // hide camera preview
						scanSub.unsubscribe(); // stop scanning
					});
			} else if (status.denied) {
				this.status = 'status.denied...';
				this.QRtext = 'status.denied';
			} else {
				this.status = 'this.QRtext ...';
				this.QRtext = 'status.authorized';
			}
		})
		.catch((e: any) => console.log('Error is', e));
	}

}
