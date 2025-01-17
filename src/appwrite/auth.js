import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account; // will give values to account later using the constructor below

    //this constructor will be called whenever a new authService object is created
    constructor(){
        //this takes client as the reference
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);// Your project ID


        // Creating account for client ( NOT USING const account = new Account(client); instead using this )
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password, name);
            if(userAccount){
                // call another method for login
                return this.login({email,password});

            } else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){ // Handling user login
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){ // Check for user account
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){  // Logout or delete all the sessions
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}
// Whenever someone wants to access AuthService the he/she needs to create a object instead we create a object here only.

const authService = new AuthService(); //Object created by AuthService

export default authService;