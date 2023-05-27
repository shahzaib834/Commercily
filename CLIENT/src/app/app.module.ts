import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreen } from './Screens/homeScreen/home-screen.component';
import { NavComponent } from './Components/Nav/navbar.component';
import { FooterComponent } from './Components/Footer/footer.component';
import { SideBarComponent } from './Components/Sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SideBarComponent,
    HomeScreen,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
