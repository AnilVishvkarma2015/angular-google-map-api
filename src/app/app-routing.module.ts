import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent
  },
  {
    path: '',
    component: UserRegistrationComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
