export class Token{

    username: string = ''; 
    authenticated?: Boolean;
    created?: Date;
    expiration: Date = new Date;
    accessToken: string = '';
    refreshToken: string = '';
}