import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { MaterialModule } from '../material-module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {SuccessComponent} from './components/list/success.component';

@NgModule({
  declarations: [TeachersComponent, ListComponent, AddComponent, SuccessComponent],
  imports: [
  			CommonModule,
  			HttpClientModule,
  			MaterialModule,
   			TeachersRoutingModule,
   			FormsModule, ReactiveFormsModule],
  entryComponents: [AddComponent, SuccessComponent]
})
export class TeachersModule { }
