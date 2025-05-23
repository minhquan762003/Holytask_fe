import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = {};
  private lang = new BehaviorSubject<string>('en');
  lang$ = this.lang.asObservable();
  selectedLang = 'vi';
  constructor(private http: HttpClient) {
    this.setLanguage(this.selectedLang);
  }

  setLanguage(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe((data) => {
      this.translations = data;
      this.lang.next(lang);
    });
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
