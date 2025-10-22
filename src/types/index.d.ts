/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================
// USER
// ========================================
declare interface User {
  $id: string;
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

declare interface SignUpParams {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
}

declare interface LoginUser {
  email: string;
  password: string;
}

declare type signInProps = {
  email: string;
  password: string;
};

declare interface getUserInfoProps {
  userId: string;
}

// ========================================
// BANK / ACCOUNT
// ========================================
declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface createBankAccountProps {
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string;
  shareableId: string;
}

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}

// ========================================
// PLAID
// ========================================
declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost" | "default";
}

declare interface CreateLinkTokenOptions {
  user: User;
}

// ========================================
// DWOLLA
// ========================================
declare interface CreateFundingSourceOptions {
  customerId: string;
  fundingSourceName: string;
  plaidToken: string;
  _links: object;
}

declare interface NewDwollaCustomerParams {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

declare interface TransferParams {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}

declare interface AddFundingSourceParams {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}

// ========================================
// TRANSACTION
// ========================================
declare interface Transaction {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
}

// ========================================
// CATEGORY
// ========================================
declare interface Category {
  name: string;
  count: number;
  totalCount: number;
}

declare interface CategoryCount {
  name: string;
  count: number;
  totalCount: number;
}
