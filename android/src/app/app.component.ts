import { Component 					} from '@angular/core';
import { Platform 					} from 'ionic-angular';
import { StatusBar 					} from '@ionic-native/status-bar';
import { SplashScreen 				} from '@ionic-native/splash-screen';

import { HomePage 					} from '../pages/home/home';

import { QRScanner, QRScannerStatus	} from "@ionic-native/qr-scanner";
//import { AndroidPermissions 		} from '@ionic-native/android-permissions';


@Component({
	templateUrl			: 'app.html'
})
export class MyApp {
	rootPage:any = HomePage;

	constructor(
		private qrScanner				: QRScanner,
		platform						: Platform,
		statusBar						: StatusBar,
		//private androidPermissions		: AndroidPermissions,
		splashScreen					: SplashScreen) {
			//this.startApp();
			// platform.ready().then(() => {
			// 	//this.initQrcode();
			// 	statusBar.styleDefault();
			// 	splashScreen.hide();
			// });
			platform.ready().then(() => {
				// if(platform.is('android')){
				// 	androidPermissions.checkPermission(androidPermissions.PERMISSION.CAMERA).then(result => alert('Give access to the camera, please, it is necessary to scan the QR-code'), err => androidPermissions.requestPermission(androidPermissions.PERMISSION.CAMERA));
				// 	androidPermissions.requestPermission([androidPermissions.PERMISSION.CAMERA]);
				// }
				//this.initQrcode();
				statusBar.styleDefault();
				splashScreen.hide();
		});
	}

	// startApp(){
	// 	platform.ready().then(() => {
	// 		this.initQrcode();
	// 		this.statusBar.styleDefault();
	// 		this.splashScreen.hide();
	// 	});
	// }

	initQrcode(){
		// Optionally request the permission early
		this.qrScanner.prepare().then((status: QRScannerStatus) => {
			if (status.authorized) {
				// camera permission was granted
				alert("Wellcome!");
				console.log('"Wellcome!"');
			} else if (status.denied) {
				console.log('"Wellcome!"');
				alert("222");
				// camera permission was permanently denied
				// you must use QRScanner.openSettings() method to guide the user to the settings page
				// then they can grant the permission from there
			} else {
				alert("333");
				// permission was denied, but not permanently. You can ask for permission again at a later time.
			}
		}).catch((e: any) => {
			alert('Error is'+ e);
			console.log('Error is', e);
		});
	}
}
