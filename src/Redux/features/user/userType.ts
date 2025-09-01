
// Define the type for user data
export interface IProcessSignUpUser {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: "user" | "admin";
    profilePhoto?: string;
  }
  
  // Define the type for the API response
  export interface IIProcessSignUpResponse {
    message: string;
    payload: {
      token: string;
    };
  }

  export interface ISignUpMutationResponse {
    user: {
      _id: string;
      email: string;
    };
    message: string;
  }
  
  export interface ISignUpMutationRequest {
    token: string | null;
  }

  // user update request 
  export interface IUpdateUserProfileRequest {
    address: string;
    email: string;
    name: string;
    phone: number;
    profilePhoto: string;
  }
  

  // user update response 
  export interface IUpdateUserProfileResponse {
    success: boolean;
    statusCode: number;
    message: string;
    payload: {
      _id: string;
      name: string;
      email: string;
      password: string; 
      role: string;
      isBanned: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
      address: string;
      phone: string;
      profilePhoto: string;
    };
  }
  