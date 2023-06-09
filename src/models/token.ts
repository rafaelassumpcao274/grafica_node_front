export class Token{

    username: string = ''; 
    authenticated?: Boolean;
    created?: Date;
    expiration?: Date;
    accessToken: string = '';
    refreshToken?: string;
}