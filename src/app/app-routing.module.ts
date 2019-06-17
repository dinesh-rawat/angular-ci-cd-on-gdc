import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
		path: '',
		loadChildren: './dashboard/dashboard.module#DashboardModule',
		pathMatch: 'full'
	}, {
		path: 'staff',
		loadChildren: './teachers/teachers.module#TeachersModule',
	}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
