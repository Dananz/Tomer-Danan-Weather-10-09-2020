import { fromEvent, of } from 'rxjs';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { WeatherKey } from './../../models/weather-interfaces';
import { AccuWeatherApiService } from './../../services/accuWeatherApi.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output('onResultSelect') resultSelectionEmitter = new EventEmitter<WeatherKey>()
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  public apiResponse: any = [];
  public isSearching: boolean = false;
  public isOpened: boolean = false;
  public hasError: boolean = false;

  constructor(
    private accuWeatherApiService: AccuWeatherApiService
  ) { }

  ngOnInit() {
    this.autoCompleteOnKeyUp()
  }

  private onKeyUpEvent() {
    return fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter(res => res.length >= 2),
        debounceTime(600),
        distinctUntilChanged()
      )
  }

  private autoCompleteOnKeyUp() {
    return this.onKeyUpEvent().subscribe((text: string) => {
      this.isSearching = true;

      this.searchGetCall(text).subscribe((res) => {
        this.isSearching = false
        this.apiResponse = res
        this.isOpened = true

        if (res === of([])) {
          this.apiResponse = []
        }
      }, (err) => {
        this.isSearching = false
        this.hasError = true
        this.isOpened = true
        console.log('error', err)
      })
    })
  }

  private searchGetCall(searchValue: string) {
    if (searchValue === '') {
      return of([]);
    }
    return this.accuWeatherApiService.getAutocompleteSearch(searchValue)
  }

  onSelectResult(result) {
    const weatherKey = this.getWeatherKey(result['Key'], result['LocalizedName'])
    this.resultSelectionEmitter.emit(weatherKey)
    this.closeResults()
  }

  closeResults() {
    this.isOpened = false
  }

  getWeatherKey = (key, localizedName) => <WeatherKey>{ key, localizedName }

}
