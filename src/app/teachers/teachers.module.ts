import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { MaterialModule } from '../material-module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [TeachersComponent, ListComponent, AddComponent],
  imports: [
  			CommonModule,
  			MaterialModule,
   			TeachersRoutingModule],
  entryComponents: [AddComponent]
})
export class TeachersModule { }
