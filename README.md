# RentalCar

RentalCar is a responsive car rental catalog built with Next.js. Users can browse available vehicles, filter the catalog by brand, price, and mileage, open a vehicle's detail page, and submit a booking request.

## Features

- Browse a catalog of rental cars
- Filter vehicles by brand, price per hour, and mileage range
- Clear active filters and reset the catalog
- Load additional results with pagination
- View detailed vehicle information, specifications, features, and rental conditions
- Submit a booking request with name, email, and a comment
- Loading, empty-results, and error states
- Responsive layouts and route-specific metadata

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19
- **Data fetching:** Axios and TanStack React Query
- **Forms and validation:** Formik and Yup
- **Styling:** CSS Modules and global CSS
- **Notifications:** React Hot Toast
- **Icons:** React Icons
- **Utilities:** clsx
- **Linting:** ESLint

## Project Structure

```text
app/
  cars/                  Catalog and vehicle detail routes
  api/                   API route area
  Providers.tsx          React Query and toast providers
  layout.tsx             Root layout and global metadata
components/              Reusable catalog, header, form, loader, and card components
lib/api/                 Axios client and rental API functions
lib/hooks/               React Query hooks
public/                  Images and static assets
styles/                  Global and shared styles
types/                   Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and set the base URL for the rental API:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

The API client uses this value for car listings, filters, vehicle details, and booking requests.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint

## API Endpoints Used

The application expects the following endpoints to be available from `NEXT_PUBLIC_API_URL`:

- `GET /cars` — fetch paginated vehicles and apply catalog filters
- `GET /cars/filters` — fetch available brands and the price range
- `GET /cars/:id` — fetch a vehicle by ID
- `POST /cars/:id/booking-requests` — submit a booking request

## Backend API Documentation

See the [backend API documentation (Swagger)](https://car-rental-api.goit.study/api-docs/).

## Main Routes

- `/` — project landing page
- `/cars` — searchable and filterable vehicle catalog
- `/cars/:carId` — vehicle details and booking form
