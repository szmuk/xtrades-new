import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
// const discordOauth2 = require('discord-oauth2');
// import * as discordOauth2 from 'discord-oauth2';
import * as Client from 'discord-oauth2-api';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;

  discordResponseCode: string;
  discordToken: string;
  user: any;

  apiUrl = 'https://api.xtrades.net/api/v1/';

  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) {

  }

  isAuthenticated(route: ActivatedRouteSnapshot): boolean {
    if (this.authenticated) {
      return true;
    } else {
      this.handleDiscordResponse(route);

      if (this.discordResponseCode) {
        this.discordAuth();
        return true;
      } else {
        // eslint-disable-next-line max-len
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=767764715388403732&redirect_uri=${window.location.origin}/signin-discord&response_type=code&scope=identify%20email`;
        return false;
      }
    }
  }

  handleDiscordResponse(route: ActivatedRouteSnapshot) {
    this.discordResponseCode = route.queryParams?.code;
    const error = route.queryParams?.error;
    const returnUrl = route.queryParams?.state;
    console.log('Discord code', route.queryParams.code);

    // TODO: improve
    this.route.queryParams.subscribe(c => {
      // eslint-disable-next-line max-len
      const url = this.router.createUrlTree([], { relativeTo: this.route, queryParams: { code: null }, queryParamsHandling: 'merge' }).toString();
      this.location.go(url);
    });

  }

  discordAuth() {
    const client = new Client({
      clientID: '767764715388403732',
      clientSecret: 'B7RwypXwb5mpabVM0HAqthrabujQENMS',
      scopes: ['identify', 'email'],
      redirectURI: 'https://localhost:5001/signin-discord',
    });

    client.getAccessToken(this.discordResponseCode).then(token => {
      this.discordToken = token.accessToken;
      console.log('Discord token', token);

      client.getUser(this.discordToken).then(user => {
        console.log(user);
        this.user = user;
        this.postTest();
      });
    });
  }

  postTest() {

    // eslint-disable-next-line max-len
    const url = `/functions/api/v1/user/registration?discordUserId=${this.user.id}&discordUsername=${this.user.username}&email=${this.user.email}&state=/`;


    this.http.post(url, {}, {
      headers: { 'x-functions-key': '9cAee/4ekOMeUzMDiF1skPZi1QmjhsrvX9l9FY2rgyGT/bIGEqgxBQ==' },
    }).pipe(
      tap(x => {
        console.log(x);
      }
      )
    ).subscribe();

    this.http.get(`/api/v1/token?discordUserId=${this.user.id}&email=${this.user.email}`)
      .pipe(
        tap(x => {
          console.log(x);
        }
        )
      ).subscribe();
  }

}

