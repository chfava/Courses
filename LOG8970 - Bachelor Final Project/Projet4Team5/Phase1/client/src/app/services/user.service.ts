import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MeditrinaeApi } from "./meditrinae.api";
import { IUser } from "../utils/requests-interfaces";

@Injectable({
    providedIn: "root"
})
export class UserService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient) {
        super("users");
    }

    public updateSelfPassword(actualPassword: string, newPassword: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<IUser>(
                    this.url("password"),
                    { actualPassword, newPassword },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                )
                .subscribe(
                    () => {
                        resolve();
                    },
                    msg => reject(msg)
                );
        });
    }

    public updateUserPassword(userId: string, newPassword: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<IUser>(
                    this.url("password/" + userId),
                    { newPassword },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                )
                .subscribe(
                    () => {
                        resolve();
                    },
                    msg => reject(msg)
                );
        });
    }

    public createUser(user: IUser): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post<IUser>(this.url(), user, {
                    headers: { "Content-Type": "application/json" }
                })
                .toPromise()
                .then((userDto: IUser) => {
                    resolve(userDto._id);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public deleteUser(username: string, password: string, userId: string): Promise<void> {
        const options = {
            headers: { "Content-Type": "application/json" },
            body: {
                username,
                password
            }
        };

        return new Promise((resolve, reject) => {
            this.httpClient
                .delete<IUser>(this.url(userId), options)
                .toPromise()
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
