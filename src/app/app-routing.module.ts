import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthgaurdService } from './services/authgaurd/authgaurd.service';
import { AddProductComponent } from './views/add-product/add-product.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DetailsComponent } from './views/details/details.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthgaurdService] },
  { path: 'product-detail/:id', component: DetailsComponent, canActivate:[AuthgaurdService]  },
  { path: 'add-product', component: AddProductComponent, canActivate:[AuthgaurdService]  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
