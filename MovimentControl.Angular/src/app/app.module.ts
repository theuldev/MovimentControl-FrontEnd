import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
