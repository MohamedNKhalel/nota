import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';
import { DataService } from 'src/app/services/data.service';
import { Note } from 'src/app/interfaces/note';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public _MatDialog:MatDialog,private _DataService:DataService){}
  ngOnInit(): void {
    this.getAllNotes()
  }
  notes!:Note[]

  add(): void {
    this._DataService.status.next(false);
    const dialogRef = this._MatDialog.open(AddNoteComponent, {
      width:"800px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
  edit(data:Note){
    this._DataService.status.next(true);
    console.log(data);
    
    const dialogRef = this._MatDialog.open(AddNoteComponent, {
      width:"800px",
      data:data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAllNotes(){
    this._DataService.getAllNotes().subscribe({
      next:data=>{
        this.notes = data.map((e:any)=>{
          const allData = e.payload.doc.data();
          allData.id = e.payload.doc.id;
          return allData;
        })
        console.log(this.notes);
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  delete(note:Note){
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${note.title} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(note);
        Swal.fire(
          'Deleted!',
          'Patient has been deleted.',
          'success'
        );
      }
    });
  }


  confirmDelete(note:Note){
    this._DataService.deleteNote(note)

  }
}
