interface AuthConfig {
    clientID: string;
    clientSecret: string;
    redirect: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: "88d8c5ca2a17477ab787f2d559f53e57",
    clientSecret: "2cff6bfe538443dfa27b74dca691d302",
    redirect: "http://localhost:4200/callback"
}