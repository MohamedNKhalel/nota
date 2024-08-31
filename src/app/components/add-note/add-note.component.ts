import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Note } from 'src/app/interfaces/note';
@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  constructor(public MatDialogRef: MatDialogRef<AddNoteComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _DataService:DataService){}

  ngOnInit(): void {
    this._DataService.status.subscribe({
      next:data=>{
        this.status = data
      }
    })
  }

  status!:boolean ;
  addNoteForm:FormGroup =  new FormGroup({
    title:new FormControl(this.data?.title ||null,[Validators.required]),
    description: new FormControl(this.data?.description ||null,[Validators.required]),
    date: new FormControl(this.data?.date ||new Date().toLocaleString())
  })

  addNewNote(){
    this._DataService.addNote(this.addNoteForm.value)
    this.close()
    
  }
  editNote(){
    this._DataService.updateNote(this.data).update({
      title:this.addNoteForm.get('title')?.value,
      description:this.addNoteForm.get('description')?.value,
      date:`Edited ${new Date().toLocaleString()}`
    })
    this.close()
  }
  close(){
    this.MatDialogRef.close()
  }
}
