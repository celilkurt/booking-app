import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Bussiness} from '../shared/bussiness';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  bussinesses = [];

  constructor(public afStore: AngularFirestore,
              public router: Router) {

  }

  GetBussinessData(uid) {
    const bussinessData = new Bussiness();
    bussinessData.uid = uid;

    console.log(uid);
    const docRef = this.afStore.collection('bussiness').doc(uid);

    docRef.get().toPromise().then(doc => {
      if (doc.exists) {
        console.log('There is Bussiness data:', doc.data());
        bussinessData.name = doc.data().name;
        bussinessData.type = doc.data().type;
        bussinessData.address = doc.data().address;
        return bussinessData;
      } else {
        console.log('No such document!');
        return bussinessData;
      }
    }).catch(error => {
      console.log('Error getting document:', error);
      return null;
    });
    return bussinessData;
  }

  GetBussinessesData() {
    const bussinessData = new Bussiness();


    this.afStore.collection('bussiness')
        .get()
        .toPromise()
        .then(querySnapshot => {

          querySnapshot.forEach(doc => {
            // const bussiness = {id: doc.id, name: doc.data().name, address: doc.data().address, type: doc.data().type};
            // console.log(doc.id, ' => ', doc.data());
            this.bussinesses.push(doc.data());
          });

        })
        .catch(error => {
          console.log('Error getting documents: ', error);
        });

    return this.bussinesses;
  }

  SetBussinessData(bussiness) {
    console.log(bussiness);
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`bussiness/${bussiness.uid}`);
    return userRef.set({name: bussiness.name, address: bussiness.address, type: bussiness.type}, {
      merge: true
    });
  }

}
