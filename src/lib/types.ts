export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  profilePhoto?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserContact {
  id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  fax?: string | null;
  linkedInUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserAddress {
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAcademic {
  id: string;
  userId: string;
  schoolName: string;
  degree?: string | null;
  fieldOfStudy?: string | null;
  startYear?: number | null;
  endYear?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface FullUser {
  userInfo: UserInfo;
  userContact: UserContact;
  userAddress: UserAddress;
  userAcademics: UserAcademic[];
}

// Request/form types
export interface UserInfoInput {
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  profilePhoto?: string;
}

export interface UserContactInput {
  email: string;
  phoneNumber: string;
  fax?: string;
  linkedInUrl?: string;
}

export interface UserAddressInput {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserAcademicInput {
  schoolName: string;
  degree?: string;
  fieldOfStudy?: string;
  startYear?: number;
  endYear?: number;
}

export interface CreateUserPayload {
  userInfo: UserInfoInput;
  userContact: UserContactInput;
  userAddress: UserAddressInput;
  userAcademics: UserAcademicInput[];
}

// Wizard form data (all steps combined)
export interface WizardFormData {
  // Step 1
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  profilePhoto?: string;
  // Step 2
  email: string;
  phoneNumber: string;
  fax?: string;
  linkedInUrl?: string;
  // Step 3
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  // Step 4
  academics: UserAcademicInput[];
}
