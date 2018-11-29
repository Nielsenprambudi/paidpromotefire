import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';

@Injectable()
export class AddUserService {

    public user: Observable<any>

    constructor(public afs: AngularFirestore) {
		
	}

    getType(userId: any): AngularFirestoreDocument<any> {
        return this.afs.collection('users').doc(userId)
    }

}