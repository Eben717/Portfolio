# Portfolio Application

## Overview

This is a modern full-stack portfolio application built with React, Express, and TypeScript. It features a professional portfolio website with project showcases, skills display, and a contact form. The application uses a PostgreSQL database with Drizzle ORM and includes shadcn/ui components for a polished user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with separate client and server directories, sharing common types and schemas through a shared folder. It uses a modern full-stack architecture with:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas for type-safe data validation
- **Development**: In-memory storage fallback for development

## Key Components

### Database Schema
- **Projects Table**: Stores portfolio projects with title, description, image, technologies, category, URLs, and featured status
- **Contacts Table**: Stores contact form submissions with personal details and project requirements

### API Endpoints
- `GET /api/projects` - Fetch all projects
- `GET /api/projects/featured` - Fetch featured projects only
- `GET /api/projects/category/:category` - Fetch projects by category
- `POST /api/contact` - Submit contact form

### Frontend Pages
- **Home**: Single-page application with navigation, hero, projects, skills, and contact sections
- **404**: Not found page for invalid routes

### UI Components
- **Navigation**: Fixed header with smooth scrolling to sections
- **Hero**: Landing section with call-to-action buttons
- **Projects**: Filterable project gallery with category buttons
- **Skills**: Technology skills organized by categories
- **Contact**: Contact form with validation and submission
- **Footer**: Links and social media connections

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Drizzle ORM manages PostgreSQL database operations with fallback to in-memory storage
4. **Response Handling**: Type-safe responses using shared TypeScript interfaces
5. **UI Updates**: React components automatically re-render when data changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Schema validation library

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **react-hook-form**: Form state management

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets in `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: Uses Vite dev server with Express API proxy
- **Production**: Serves static files from Express with API routes
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Scripts
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build both frontend and backend for production
- `npm run start`: Start production server
- `npm run db:push`: Apply database schema changes

The application is designed to be deployed on platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL database support.