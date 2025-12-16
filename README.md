# Chat Application with Supabase

A real-time chat application built with Angular 17 and Supabase, featuring user authentication, real-time messaging, and user profiles.

## Features

- 🔐 **User Authentication** - Sign up and login functionality using Supabase Auth
- 💬 **Real-time Chat** - Send and receive messages in real-time
- 👤 **User Profiles** - Display user names and avatars in chat
- 🔒 **Protected Routes** - Route guards to secure chat functionality
- ✏️ **Message Management** - Edit and delete your own messages
- 🎨 **Responsive Design** - Modern UI that works across devices

## Tech Stack

- **Frontend Framework:** Angular 17 (Standalone Components)
- **Backend & Database:** Supabase
- **Authentication:** Supabase Auth
- **Styling:** CSS
- **Build Tool:** Angular CLI
- **Testing:** Jasmine & Karma

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)
- A [Supabase](https://supabase.com/) account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-application-with-supabase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

   You can find these values in your Supabase project settings under API.

4. **Set up Supabase Database**

   Refer to the [Database Creation README.md](Database%20Creation%20README.md) file for detailed instructions on setting up the required database tables and functions.

   Quick summary of tables needed:
   - `users` table - Stores user profiles
   - `chat` table - Stores chat messages with real-time capabilities

## Database Setup

The application requires specific database tables and configurations in Supabase. Follow these steps:

### 1. Create Users Table

### 2. Enable Row Level Security

### 3. Create RLS Policies

### 4. Create Trigger Function

### 5. Create Trigger

### 6. Create Chat Messages Table

For complete database setup instructions, see [Database Creation README.md](Database%20Creation%20README.md).

## Running the Application

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

Execute the unit tests via Karma.

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── login/           # Login page component
│   │   ├── sign-up/         # Sign up page component
│   │   └── chat/            # Main chat interface
│   ├── services/
│   │   └── auth.service.ts  # Authentication service
│   ├── supabase/
│   │   └── chat.service.ts  # Chat/messaging service
│   ├── layout/
│   │   └── delete-modal/    # Modal for message deletion
│   ├── interface/
│   │   └── chat-response.ts # TypeScript interfaces
│   ├── auth.guard.ts        # Route guard for authentication
│   ├── app.routes.ts        # Application routing
│   ├── app.config.ts        # App configuration
│   └── app.component.*      # Root component
├── assets/                  # Static assets
├── index.html              # Main HTML file
├── main.ts                 # Application entry point
└── styles.css              # Global styles
```

## Key Components

### Authentication Service
Handles user authentication, session management, and auth state changes using Supabase Auth.

### Chat Service
Manages all chat-related operations including:
- Sending messages
- Fetching message history
- Deleting messages
- Real-time subscriptions

### Auth Guard
Protects routes that require authentication, redirecting unauthenticated users to the login page.

## Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/login` | LoginComponent | No | User login |
| `/sign-up` | SignUpComponent | No | User registration |
| `/chat` | ChatComponent | Yes | Main chat interface |
| `/` | - | No | Redirects to login |

## Features in Detail

### User Authentication
- Users can sign up with email and password
- Full name and avatar URL are stored in user metadata
- Automatic profile creation via database triggers
- Session persistence across page refreshes

### Real-time Chat
- Messages appear instantly for all users
- Display sender information (name and avatar)
- Timestamp for each message
- Ability to delete own messages

### Message Management
- Send text messages
- View message history
- Delete messages (with confirmation modal)
- Real-time updates when messages are added or removed

## Environment Variables

The application uses environment variables for Supabase configuration:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anonymous key

These are configured in the `.env` file and accessed via webpack configuration.

## Deployment

This application is deployed using [Vercel](https://vercel.com/), with separate environments for development (preview) and production.

### Vercel Deployment Setup

#### Prerequisites
- A [Vercel](https://vercel.com/) account
- Repository connected to Vercel (GitHub, GitLab, or Bitbucket)

#### Initial Setup

1. **Import Your Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository
   - Select the root directory of your project

2. **Configure Build Settings**
   - **Framework Preset:** Other (or Angular if available)
   - **Build Command:** `npm run build` or `ng build`
   - **Output Directory:** `dist/ng-chat` (adjust based on your Angular project name)
   - **Install Command:** `npm install`

3. **Set Environment Variables**

   In Vercel Dashboard → Project Settings → Environment Variables, add:

   | Variable | Value | Environments |
   |----------|-------|--------------|
   | `SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
   | `SUPABASE_KEY` | Your Supabase anonymous key | Production, Preview, Development |

   > **Note:** You can use different Supabase projects for production and preview/development environments for better separation.

### Environment Configuration

#### Production Environment
- **URL:** Your custom domain or `your-project.vercel.app`
- **Deployment Trigger:** Push to `main` branch
- **Purpose:** Serves end users
- **Supabase:** Production database instance

#### Preview Environment (Dev)
- **URL:** Unique URL for each PR/branch (e.g., `your-project-git-branch.vercel.app`)
- **Deployment Trigger:** Push to any branch or Pull Request
- **Purpose:** Testing and review before merging to production
- **Supabase:** Can use same production instance or separate dev instance

### Deployment Workflow

1. **Automatic Deployments**
   - Every push to `main` triggers a production deployment
   - Every push to a feature branch creates a preview deployment
   - Every pull request gets its own preview deployment

2. **Manual Deployment**
   - Via Vercel Dashboard → Deployments → Redeploy
   - Using Vercel CLI:
     ```bash
     npm i -g vercel
     vercel --prod  # Deploy to production
     vercel         # Deploy to preview
     ```

3. **Deployment Process**
   ```
   Code Push → Git Repository → Vercel Build → Deploy → Live URL
   ```

### Environment-Specific Configuration

For different configurations across environments, you can use Vercel's system environment variables:

```typescript
// In your Angular app
const isProduction = process.env['VERCEL_ENV'] === 'production';
const isPreview = process.env['VERCEL_ENV'] === 'preview';
```

Available Vercel system variables:
- `VERCEL_ENV` - `production`, `preview`, or `development`
- `VERCEL_URL` - Deployment URL
- `VERCEL_GIT_COMMIT_SHA` - Git commit SHA
- `VERCEL_GIT_COMMIT_REF` - Git branch or tag name

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

2. **Update DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers for full DNS management

3. **SSL Certificates**
   - Automatically provisioned and renewed by Vercel
   - HTTPS enforced by default

### Monitoring Deployments

- **Real-time Build Logs:** Available in Vercel Dashboard during deployment
- **Deployment History:** View all past deployments and their status
- **Analytics:** Track performance and usage (available on paid plans)
- **Error Tracking:** Monitor runtime errors via Vercel Analytics


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Authentication not working:**
- Verify your Supabase credentials in `.env`
- Check that your Supabase project has email authentication enabled
- Ensure RLS policies are correctly set up

**Messages not appearing:**
- Verify the `chat` table exists in your Supabase database
- Check that real-time is enabled for the `chat` table in Supabase
- Ensure proper RLS policies are configured

**Build errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure you're using a compatible Node.js version

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check existing [Issues](../../issues)
- Create a new issue if your problem isn't already reported

## Acknowledgments

- Built with [Angular](https://angular.io/)
- Powered by [Supabase](https://supabase.com/)
- Inspired by modern chat applications
