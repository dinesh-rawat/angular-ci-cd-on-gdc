import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  teacherForm: any;
  addressForm: any;
  educationForm: any;
  fileUploadForm: any;
	isLinear = true;
  files:any;
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private http: HttpClient,
      public dialogRef: MatDialogRef<AddComponent>,
) { }

  ngOnInit() {
  	  this.teacherForm = this.fb.group({
  	  	firstName: ['', Validators.required],
  	  	lastName: [''],
  	  	father: this.fb.group({
	      fatherFirstName: ['', Validators.required],
  	  	  fatherLastName: [''],
	    }),
	    dob: ['', Validators.required],
	    knownLanguages: ['', Validators.required],
	    englishLanguage: this.fb.group({
	    	  read: [''],
	  	  	  write: [''],
	  	  	  speak: [''],
	  	  	  understand: [''],
	  	  	}
  	  	  ),
	});

		this.addressForm = this.fb.group({
	      communicationAddress: ['', Validators.required],
  	  	  permanentAddress: ['', Validators.required],
  	  	  email: ['', [Validators.email]],
  	  	  contactNumber: ['', [Validators.required, Validators.maxLength(10),  Validators.minLength(10)]],
  	  	  emergencyContactNumber: ['', [Validators.required, , Validators.maxLength(10),  Validators.minLength(10)]],
    
          accountNumber: ['', Validators.required],
          accountName: ['', Validators.required],
          bank: ['', Validators.required],
          ifsc: ['', Validators.required],
	    });

    this.fileUploadForm = this.fb.group({
      file: ['', Validators.required]
    });


		this.educationForm = this.fb.group({
	      qualification: ['', Validators.required],
  	  	  institute: ['', Validators.required],
  	  	  board: ['', Validators.required],
  	  	  marks: ['', Validators.required],
          period: ['', Validators.required],
          organization: ['', Validators.required],
          designation: ['', Validators.required],
          personalAchievements: [''],
	    });
	}

  onFileChange(files) {
      this.files = files;
  }

  saveBasicDetails() {
  }

  saveAddress() {
  }

  saveEducation() {

  }

  upload() {
  //  const data: FormData = new FormData();
//    Array.from(this.files).forEach(file => data.append('files', file))
    this.dialogRef.close({isSaved: true});
  }

  close() {
    this.dialogRef.close();
  }
}
