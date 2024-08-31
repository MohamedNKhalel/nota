import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _AngularFirestore:AngularFirestore) { }
  userToken:any = localStorage.getItem('token')
  status:BehaviorSubject<boolean> =  new BehaviorSubject(false);
  email:BehaviorSubject<string> = new BehaviorSubject('');

  addNote(note:Note){
    note.id = this._AngularFirestore.createId()
    return this._AngularFirestore.collection(`users/${JSON.parse(this.userToken)}/notes`).add(note)
  }

  getAllNotes(){
    this.userToken = localStorage.getItem('token');
    return this._AngularFirestore.collection(`users/${JSON.parse(this.userToken)}/notes`).snapshotChanges()
  }

  deleteNote(note:Note){
    return this._AngularFirestore.doc(`users/${JSON.parse(this.userToken)}/notes/${note.id}`).delete()
  }

  updateNote(note:Note){
    return this._AngularFirestore.doc(`users/${JSON.parse(this.userToken)}/notes/${note.id}`)
  }
}
