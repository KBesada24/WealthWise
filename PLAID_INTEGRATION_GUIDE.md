# WealthWise - Plaid API Integration Setup Guide

## 📍 Current Status

You're **80% complete** with the Plaid integration! Here's what's been set up:

### ✅ Files Created/Fixed:
1. **`src/lib/plaid.ts`** - Plaid client configuration
2. **`src/appwrite.ts`** - Appwrite client setup
3. **`src/types/index.d.ts`** - TypeScript type definitions
4. **`src/lib/user.actions.ts`** - Simplified for read-only banking data (No Dwolla needed!)

---

## 🚀 Next Steps to Complete Integration

### Step 1: Install Missing Dependencies

Run this command in your terminal:

```bash
npm install node-appwrite
```

Or if using yarn:
```bash
yarn add node-appwrite
```

### Step 2: Set Up Your Environment Variables

Create a `.env.local` file with these credentials:

   #### 🔵 **Plaid API** (Required)
   - Sign up at: https://dashboard.plaid.com/
   - Get your Client ID and Secret from the dashboard
   - Set `PLAID_ENV` to `sandbox` for testing
   
   ```env
   PLAID_CLIENT_ID=your_actual_client_id
   PLAID_SECRET=your_actual_secret
   PLAID_ENV=sandbox
   ```

   #### 🟢 **Supabase** (Already using this)
   - Get from: https://supabase.com/dashboard
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

   #### 🟣 **Appwrite** (Required for user management)
   - Sign up at: https://cloud.appwrite.io/
   - Create a project and get your credentials
   - Create a database with collections for users and banks
   
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
   NEXT_APPWRITE_KEY=your_api_key
   APPWRITE_DATABASE_ID=your_database_id
   APPWRITE_USER_COLLECTION_ID=your_user_collection_id
   APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
   ```

### Step 3: Verify the Integration

After setting up environment variables, test your integration:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the Plaid Link component:**
   - Navigate to your dashboard page
   - Click the "Connect Bank" button
   - You should see the Plaid Link flow open

3. **Check for errors in the console**

---

## 📂 File Structure Overview

```
src/
├── lib/
│   ├── plaid.ts              ✅ Plaid client configuration
│   ├── user.actions.ts       ✅ User & bank operations (read-only)
│   └── utils.ts              ✅ Utility functions
├── components/
│   └── ui/
│       └── PlaidLink.tsx     ✅ Plaid UI component
├── app/
│   ├── api/
│   │   └── plaid/
│   │       └── create-link-token/
│   │           └── route.ts  ⚠️  Duplicate (can be removed)
│   └── dashboard/
│       └── page.tsx          ✅ Uses PlaidLink component
├── types/
│   └── index.d.ts            ✅ Type definitions
└── appwrite.ts               ✅ Appwrite configuration
```

---

## 🔧 How the Integration Works

### Flow Diagram:
```
User clicks "Connect Bank"
    ↓
PlaidLink component requests link_token
    ↓
createLinkToken() called (user.actions.ts)
    ↓
Plaid API returns link_token
    ↓
Plaid Link modal opens
    ↓
User selects bank and authenticates
    ↓
Plaid returns public_token
    ↓
exchangePublicToken() called
    ↓
Exchange for access_token + account info
    ↓
Get account details (balances, account numbers, etc.)
    ↓
Save bank account to Appwrite database
    ↓
✅ Bank connected successfully! Now you can read banking data!
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module 'plaid'"
**Solution:** Run `npm install plaid react-plaid-link`

### Issue 2: "plaidClient is not defined"
**Solution:** Make sure `src/lib/plaid.ts` exists and environment variables are set

### Issue 3: "No session" error
**Solution:** User must be authenticated. Check Appwrite session in cookies.

### Issue 4: Plaid Link not opening
**Solution:** 
- Check browser console for errors
- Verify PLAID_CLIENT_ID and PLAID_SECRET are correct
- Make sure link_token is being created successfully

### Issue 5: "PLAID_ENV" error
**Solution:** Set `PLAID_ENV=sandbox` in your `.env.local` file

---

## 📊 What Data You Can Pull from Plaid

Once integrated, you can access:

1. **Account Information:**
   - Account balances (checking, savings, credit cards)
   - Account and routing numbers
   - Account names and types

2. **Transaction Data:**
   - Transaction history
   - Merchant names
   - Transaction amounts and dates
   - Categories

3. **Identity Information:**
   - Account holder names
   - Email addresses
   - Phone numbers
   - Addresses

4. **Investment Data** (with additional products):
   - Holdings
   - Securities
   - Investment transactions

---

## 🧪 Testing in Sandbox Mode

Plaid provides test credentials for sandbox mode:

**Bank:** Chase
- Username: `user_good`
- Password: `pass_good`

**Bank:** Wells Fargo  
- Username: `user_good`
- Password: `pass_good`

For more test credentials: https://plaid.com/docs/sandbox/test-credentials/

---

## 📝 Additional API Routes You Might Need

### Get Transactions
Create a new file: `src/app/api/plaid/transactions/route.ts`

```typescript
import { plaidClient } from '@/lib/plaid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, startDate, endDate } = await request.json();
    
    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    
    return NextResponse.json({ transactions: response.data.transactions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
```

### Get Account Balance
Create: `src/app/api/plaid/balance/route.ts`

```typescript
import { plaidClient } from '@/lib/plaid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();
    
    const response = await plaidClient.accountsBalanceGet({
      access_token: accessToken,
    });
    
    return NextResponse.json({ accounts: response.data.accounts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}
```

---

## 🎯 Next Development Steps

1. **Install missing packages** (node-appwrite, dwolla-v2)
2. **Set up environment variables** from the services mentioned above
3. **Test the Plaid Link integration** in sandbox mode
4. **Create additional API routes** for transactions and balances
5. **Build UI components** to display financial data
6. **Implement data sync** to keep transactions updated

---

## 📚 Useful Resources

- **Plaid Documentation:** https://plaid.com/docs/
- **Plaid Dashboard:** https://dashboard.plaid.com/
- **Appwrite Docs:** https://appwrite.io/docs
- **Dwolla Docs:** https://developers.dwolla.com/
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## ✨ Summary

**You're at the finish line!** Here's what remains:

1. ✅ Code structure is complete
2. ⏳ Install `node-appwrite` and `dwolla-v2`
3. ⏳ Get API credentials and fill in `.env.local`
4. ⏳ Test the integration

Once you complete steps 2-4, your Plaid integration will be fully functional! 🚀
