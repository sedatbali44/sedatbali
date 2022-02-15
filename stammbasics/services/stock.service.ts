import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  /**
   * returns all stocks for store
   * @returns {Observable<Object>}
   */
  getStocks(): any {
    return this.http.get('/apiV2/stock/getStocks');
  }

  getStockValue(body: any): any {
    return this.http.post('/apiV2/stock/value',body);
  }
}
