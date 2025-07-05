import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ParishionerTabComponent} from "./parishioner-tab/parishioner-tab.component";
import {LoginComponent} from "./login/login.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {DocumentComponent} from "./document/document.component";
import {RegisterComponent} from "./register/register.component";
import {ReportComponent} from "./report/report.component";
import {PriestProfile} from "./model/priest-profile";
import {PriestProfileComponent} from "./priest-profile/priest-profile.component";
import {UserManagerComponent} from "./user-manager/user-manager.component";


export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'parishioner', component: ParishionerTabComponent},
  {path:'login', component:LoginComponent},
  {path:'schedule', component:ScheduleComponent},
  {path:'document', component:DocumentComponent},
  {path:'register', component:RegisterComponent},
  {path:'report', component:ReportComponent},
  {path:'priestProfile', component:PriestProfileComponent},
  {path:'usersManager', component:UserManagerComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

];


