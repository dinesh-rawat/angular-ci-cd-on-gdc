import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';

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
  files = [];
  @ViewChild('fileUpload', { read: false, static: true }) fileUpload: ElementRef;
  chooseLabel = 'Choose';
  uploadLabel = 'Upload';
  cancelLabel = 'Cancel';
  inputFileName: string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private http: HttpClient,
      public dialogRef: MatDialogRef<AddComponent>,
              private sanitizer: DomSanitizer
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

  onClick() {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onInput(event) {

  }

  onFileSelected(event) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
      this.files.push(files[i]);
    }
  }

  removeFile(event, file) {
    let ix;
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
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
