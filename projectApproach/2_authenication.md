# Authentication in Next.js Using Clerk

## Overview
This document provides a step-by-step guide to setting up authentication in a Next.js project using Clerk. The approach ensures a structured and maintainable authentication system while leveraging Next.js features like route groups and environment variables. Additionally, it includes the **design layout** for the authentication page following a **two-column approach** using CSS Grid.

---

## 1. **Understanding Next.js Routing and Route Groups**
Before setting up authentication, it is crucial to understand how routing works in Next.js, specifically the concept of route groups.

### **Basic Routing in Next.js**
- Create a folder inside the `app` directory (e.g., `test`).
- Inside the folder, create a `page.tsx` file.
- Ensure the component is a **default export**, otherwise, the route will not register.
- Running the project and accessing `localhost:3000/test` should display the test page.

### **Using Route Groups**
- If we want to organize routes without affecting the URL, we use **route groups**.
- Create a folder inside `app` and wrap its name in parentheses. For example:
  ```bash
  app/(auth)/signin/page.tsx
  app/(auth)/signup/page.tsx
  ```
- The parentheses tell Next.js not to include this folder in the URL, meaning:
  - `localhost:3000/signin`
  - `localhost:3000/signup`

### **Catch-All Routes**
- Useful for handling dynamic parameters or unknown paths.
- Create a dynamic folder with double square brackets (`[[...params]]`).
- Example:
  ```bash
  app/(auth)/[[...signin]]/page.tsx
  ```
- This setup ensures that Clerk can properly handle redirects and callback URLs.

---

## 2. **Setting Up Authentication with Clerk**
### **Step 1: Install Clerk**
- Go to [Clerk.com](https://clerk.com) and create an account.
- Create a new application.
- Select authentication providers (Google, Email, Web3, etc.).
- Install Clerk in the Next.js project:
  ```bash
  bun add @clerk/nextjs
  ```
  Or, if using npm:
  ```bash
  npm install @clerk/nextjs
  ```
  Or, using yarn:
  ```bash
  yarn add @clerk/nextjs
  ```

### **Step 2: Configure Environment Variables**
- Inside the root of your project, create a `.env.local` file:
  ```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
  CLERK_SECRET_KEY=your_secret_key
  ```
- Ensure `.env.local` is added to `.gitignore` to prevent committing sensitive information.

### **Step 3: Integrating Clerk Provider in Layout**
- Open `app/layout.tsx`.
- Import ClerkProvider at the top:
  ```tsx
  import { ClerkProvider } from "@clerk/nextjs";
  ```
- Wrap the entire application inside `<ClerkProvider>`:
  ```tsx
  export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
          <ClerkProvider>
              {children}
          </ClerkProvider>
      );
  }
  ```

---

## 3. **Protecting Routes (Authentication & Redirection)**
### **Step 1: Restrict Access to Dashboard**
```tsx
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
    const { userId } = auth();

    if (!userId) {
        redirect("/signin");
    }

    return <p>This is an authenticated route.</p>;
}
```

### **Step 2: Setting Up Sign In & Sign Up Pages**
```tsx
import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
    return <SignIn />;
}
```
```tsx
import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
    return <SignUp />;
}
```

### **Step 3: Redirect Users After Authentication**
Modify the `middleware.ts` file:
```tsx
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/signin", "/signup"],
    ignoredRoutes: ["/api/webhooks/clerk"],
    afterAuth(auth, req, evt) {
        if (!auth.userId && req.nextUrl.pathname.startsWith("/dashboard")) {
            return Response.redirect(new URL("/signin", req.url));
        }
    },
});

export const config = {
    matcher: ["/((?!_next).*)"],
};
```




MORE IMPORTANT DETAILS : 

# Authentication in Next.js using Clerk

## Overview
This document serves as a structured and detailed guide on implementing authentication in a Next.js project using Clerk. It covers setting up Clerk, configuring authentication, protecting routes, and designing the authentication page layout.

---

## 1. Why Use Catch-All Routes `[[...sign-in]]` and `[[...sign-up]]`?

In Next.js, catch-all routes (`[[...param]]`) are used to capture multiple dynamic routes inside a single folder. We use them for `sign-in` and `sign-up` so that Clerk can handle various authentication scenarios like sign-in with email, OAuth providers, or custom authentication flows within a single route.

- **Example Folder Structure:**
  ```
  app/
    ├── (auth)/
    │   ├── [[...sign-in]]/
    │   │   ├── page.tsx
    │   ├── [[...sign-up]]/
    │   │   ├── page.tsx
  ```

- Clerk automatically renders the appropriate authentication UI when users visit `/sign-in` or `/sign-up`.

---

## 2. Why Create a Separate `dashboard` Folder?

The `dashboard` folder is created to group protected routes under a common layout. This ensures that users who haven't authenticated are redirected before accessing the dashboard.

- **Example Folder Structure:**
  ```
  app/
    ├── dashboard/
    │   ├── page.tsx  (Main Dashboard Page)
  ```
- The `dashboard/page.tsx` file is where authenticated users land after signing in.

---

## 3. Setting Up Clerk Authentication

### Step 1: Create a Clerk Account
1. Visit [Clerk](https://clerk.dev/) and sign up.
2. Create a new project inside Clerk.
3. Obtain the **Publishable Key** and **Secret Key** from the API Keys section.

### Step 2: Install Clerk in Next.js
Run the following command inside your Next.js project:
```sh
npm install @clerk/nextjs
```

### Step 3: Add API Keys to `.env.local`
Create a new `.env.local` file at the root of your project and add:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGVhZGluZy11cmNoaW4tMjMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_Jc66qot5INud0k6uPhiLnxj0VBvX3vvAn0Z7U0k35s
```

---

## 4. Middleware Setup for Route Protection

Create a new `middleware.ts` file in the root of your project:
```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

### Protecting the Main Landing Page
By default, the main landing page is still accessible. To enforce authentication, update `middleware.ts`:
```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### Explanation:
- `const isProtectedRoute = createRouteMatcher(['/']);`
  - This function checks if the request matches the `/` (root) route.
  - If it does, the `auth.protect()` method ensures that only signed-in users can access it.
  - If the user is not authenticated, they are redirected to the sign-in page.

---

## 5. Integrating ClerkProvider in `layout.tsx`
Modify `app/layout.tsx` to wrap the application inside `ClerkProvider`:
```ts
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

---

## 6. Creating Authentication Pages

### Sign-In Page (`app/(auth)/sign-in/page.tsx`)
```ts
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return <SignIn />;
}
```

### Sign-Up Page (`app/(auth)/sign-up/page.tsx`)
```ts
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return <SignUp />;
}
```

After these changes, visiting `/sign-in` or `/sign-up` will display Clerk’s authentication UI.

---

## 7. Authentication Page Design
Our authentication page follows a **2-column layout** using CSS Grid:
- **Left Column:** Login/signup form
- **Right Column:** Logo or Image
notes below : 



