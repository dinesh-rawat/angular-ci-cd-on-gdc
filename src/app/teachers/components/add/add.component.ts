import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  HttpClient
} from "@angular/common/http";
import {
  MatDialogRef
} from '@angular/material';
import {
  DomSanitizer
} from '@angular/platform-browser';
import {
  Observable
} from 'rxjs';
import {
  map,
  startWith
} from 'rxjs/operators';
import {
  FormControl
} from '@angular/forms';

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
  positions = [];
  positionCtrl = new FormControl();
  positionOffering: string;
  @ViewChild('fileUpload', {
    read: false,
    static: true
  }) fileUpload: ElementRef;
  chooseLabel = 'Choose';
  filteredPositions: Observable < any > ;
  maxDate: any;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private http: HttpClient,
    public dialogRef: MatDialogRef < AddComponent > ,
    private sanitizer: DomSanitizer
  ) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    this.maxDate = new Date(year-18, month-1, day);
console.log(this.maxDate)
    this.filteredPositions = this.positionCtrl.valueChanges
      .pipe(
        startWith(''),
        map(position => position ? this._filterStates(position) : this.positions.slice())
      );
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.positions.filter(position => position.viewValue.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.positions = [

      {
        value: 'PGT',
        viewValue: 'PGT'
      },
      {
        value: 'TGT',
        viewValue: 'TGT'
      },
      {
        value: 'PRT',
        viewValue: 'PRT'
      },

      {
        value: 'Special Educator',
        viewValue: 'Special Educator'
      },
      {
        value: 'Counsellor/Psychologist',
        viewValue: 'Counsellor/Psychologist'
      },
      {
        value: 'Physical Education Teacher',
        viewValue: 'Physical Education Teacher'
      },
      {
        value: 'Principal',
        viewValue: 'Principal'
      },
      {
        value: 'Special Education Teacher',
        viewValue: 'Special Education Teacher'
      },

      {
        value: 'Vice Principal',
        viewValue: 'Vice Principal'
      },
      {
        value: 'School Administrator',
        viewValue: 'School Administrator'
      },
      {
        value: 'Music Teacher',
        viewValue: 'Music Teacher'
      },
      {
        value: 'Sport Teacher',
        viewValue: 'Sports Teacher'
      },

      {
        value: 'Librarian',
        viewValue: 'Librarian'
      },
      {
        value: 'Clerk',
        viewValue: 'Clerk'
      },
      {
        value: 'Computer Programmer',
        viewValue: 'Computer Programmer'
      },
      {
        value: 'Laboratory Assistant',
        viewValue: 'Laboratory Assistant'
      },
      {
        value: 'Store Keeper',
        viewValue: 'Store Keeper'
      },
      {
        value: 'Peon',
        viewValue: 'Peon'
      },
      {
        value: 'Mali',
        viewValue: 'Mali'
      },
      {
        value: 'Sweeper',
        viewValue: 'Sweeper'
      },
      {
        value: 'Private Secretary',
        viewValue: 'Private Secretary'
      },
      {
        value: 'Assistant',
        viewValue: 'Assistant'
      },
      {
        value: 'Personal Assistant',
        viewValue: 'Personal Assistant'
      },
      {
        value: 'Caretaker',
        viewValue: 'Caretaker'
      },
      {
        value: 'Junior Assistant',
        viewValue: 'Junior Assistant'
      },
      {
        value: 'Assistant Librarian',
        viewValue: 'Assistant Librarian'
      },
      {
        value: 'System Administrator',
        viewValue: 'System Administrator'
      },
      {
        value: 'Section Officer Account',
        viewValue: 'Section Officer (Account)'
      },
      {
        value: 'Driver',
        viewValue: 'Driver'
      },
    ];

    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      father: this.fb.group({
        fatherFirstName: ['', Validators.required],
        fatherLastName: [''],
      }),
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      positions: ['', Validators.required],
      knownLanguages: ['', Validators.required],
      englishLanguage: this.fb.group({
        read: [''],
        write: [''],
        speak: [''],
        understand: [''],
      }),
    });

    this.addressForm = this.fb.group({
      communicationAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      email: ['', [Validators.email]],
      contactNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      emergencyContactNumber: ['', [Validators.required, , Validators.maxLength(10), Validators.minLength(10)]],

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


  saveBasicDetails() {}

  saveAddress() {}

  saveEducation() {

  }

  upload() {
    //  const data: FormData = new FormData();
    //    Array.from(this.files).forEach(file => data.append('files', file))
    this.dialogRef.close({
      isSaved: true
    });
  }

  close() {
    this.dialogRef.close();
  }

  setPosition(value) {
    this.positionOffering = value;
  }
}