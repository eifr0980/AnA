import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { AuthRequestOptions } from './auth/auth-request';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { AptsComponent } from './apts/apts.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AptDetailComponent } from './apt-detail/apt-detail.component';

import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './auth/login/login.component';
import { RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FooterComponent,
    NavbarComponent,
    HomepageComponent,
    NotFoundComponent,
    AboutComponent,
    ProjectsComponent,
    AptsComponent,
    AptDetailComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    NgtUniversalModule,
    MatProgressSpinnerModule,
    TransferHttpCacheModule,
    HttpClientModule,
    HttpModule,
    AdminModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: RequestOptions, 
      useClass: AuthRequestOptions,
      
    }, AuthGuard, AuthService
  ],
})
export class AppModule { }
