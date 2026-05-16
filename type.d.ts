interface AuthState{
    isSignedIn: boolean, 
    userName: string | null, 
    userId: string | null 
}
type AuthContext = {
    isSignedIn: boolean,
    userName: string | null,
    userId: string | null, 
    refreshAuth: () => Promise<boolean>, 
    signIn: () => Promise<boolean>, 
    signOut: () => Promise<boolean>, 
}

interface StoreHostedImageParams {
    hosting: HostingConfig | null;
    url: string;
    projectId: string;
    label: "source" | "rendered";
}