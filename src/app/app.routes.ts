import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CatogriesComponent } from './components/catogries/catogries.component';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent, canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forgot',component:ForgotComponent},
    ]},

    {path:'',component:BlankLayoutComponent ,canActivate:[authGuard] ,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home', component:HomeComponent},
        {path:'cart', component:CartComponent},
        {path:'products', component:ProductsComponent},
        {path:'brands', component:BrandsComponent},
        {path:'catogries', component:CatogriesComponent},
        {path:'details/:id', component:DetailsComponent},
        {path:'allorders', component:AllOrdersComponent},
        {path:'orders/:id', component:OrdersComponent},
    ]},

    {path:'**',component:NotFoundComponent}
];
