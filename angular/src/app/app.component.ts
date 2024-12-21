import { LocalizationService } from "@abp/ng.core";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
// import { CookieService } from "ngx-cookie-service"; // Or use localStorage/sessionStorage

import localeVi from "@angular/common/locales/vi";
import { registerLocaleData } from "@angular/common";

// Register Angular's locale data
registerLocaleData(localeVi);

@Component({
  selector: "app-root",
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private languageChangeSubscription: Subscription;

  constructor(private localizationService: LocalizationService) {}

  ngOnInit(): void {
    this.languageChangeSubscription = this.localizationService.languageChange$.subscribe(lang => {
      this.onLanguageChange(lang);
    });
  }

  onLanguageChange(language: string): void {
    const abpSession = JSON.parse(localStorage.getItem("abpSession"));
    localStorage.setItem("abpSession", JSON.stringify({ ...abpSession, language }));
    console.log("Changed language to: ", language);
    console.log(JSON.parse(localStorage.getItem("abpSession")));
  }

  ngOnDestroy(): void {
    this.languageChangeSubscription.unsubscribe();
  }
}
