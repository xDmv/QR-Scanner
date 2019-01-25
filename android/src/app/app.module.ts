import { NgModule, ErrorHandler 					} from '@angular/core';
import { BrowserModule 								} from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler 	} from 'ionic-angular';

import { MyApp 										} from './app.component';
import { HomePage 									} from '../pages/home/home';
import { ScanPage 									} from '../pages/scan/scan';
import { RezulPage 									} from '../pages/rezul/rezul';

import { StatusBar 									} from '@ionic-native/status-bar';
import { SplashScreen 								} from '@ionic-native/splash-screen';
import { QRScanner 									} from '@ionic-native/qr-scanner';
import { QrScan 									} from '../providers/qr-scan/qr-scan';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ScanPage,
		RezulPage
	],
	imports: [BrowserModule, IonicModule.forRoot(MyApp)],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ScanPage,
		RezulPage
	],
	providers: [StatusBar, SplashScreen,QRScanner, {provide: ErrorHandler, useClass: IonicErrorHandler}, QrScan]
})
export class AppModule {}
