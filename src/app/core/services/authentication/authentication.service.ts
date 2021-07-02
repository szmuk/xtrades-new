import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as Client from 'discord-oauth2-api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;

  discordResponseCode: string;

  auth: TemporaryXtradesAuthObject;

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
      const auth = localStorage.getItem('x-trades-auth');

      if (auth) {
        this.auth = JSON.parse(auth);
        this.authenticated = true;
        return true;
      } else {
        this.handleDiscordResponse(route);

        if (this.discordResponseCode) {
          this.authenticateWithDiscordCode();
          return true;
        } else {
          // eslint-disable-next-line max-len
          window.location.href = `https://discord.com/api/oauth2/authorize?client_id=767764715388403732&redirect_uri=${window.location.origin}/signin-discord&response_type=code&scope=identify%20email`;
          return false;
        }
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

  authenticateWithDiscordCode() {
    this.auth = new TemporaryXtradesAuthObject();

    const client = new Client({
      clientID: '767764715388403732',
      clientSecret: 'B7RwypXwb5mpabVM0HAqthrabujQENMS',
      scopes: ['identify', 'email'],
      redirectURI: 'https://localhost:5001/signin-discord',
    });

    client.getAccessToken(this.discordResponseCode).then(token => {
      this.auth.discordToken = token.accessToken;

      client.getUser(this.auth.discordToken).then(user => {
        this.auth.user = user;
        localStorage.setItem('x-trades-auth', JSON.stringify(this.auth));

        this.getUserData();
        this.getToken();
      });
    });
  }

  getUserData() {
    // eslint-disable-next-line max-len
    const url = `/functions/api/v1/user/registration?discordUserId=${this.auth.user.id}&discordUsername=${this.auth.user.username}&email=${this.auth.user.email}&state=/`;

    this.http.post(url, {}, { headers: { 'x-functions-key': '9cAee/4ekOMeUzMDiF1skPZi1QmjhsrvX9l9FY2rgyGT/bIGEqgxBQ==' } })
      .toPromise().then(console.log);
  }

  getToken() {
    this.http.get(`/api/v1/token?discordUserId=${this.auth.user.id}&email=${this.auth.user.email}`).toPromise().then(console.log);
  }
}

// TODO: figure out proper way of authenticating
export class TemporaryXtradesAuthObject {
  discordToken: string;
  user: any;
}
