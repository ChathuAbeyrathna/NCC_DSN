import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PostComponent } from './post/post.component';
import { ManualPageComponent } from './manualpage.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './admin/reports.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post', component: PostComponent },
  { path: 'manual', component: ManualPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'reports', component: ReportsComponent },
];
