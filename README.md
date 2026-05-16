# Cinematic Photography Portfolio

A premium, luxury photography portfolio built with Next.js 14, Tailwind CSS, Framer Motion, GSAP, and Lenis.

## Features
- **Cinematic Experience**: Auto-playing video hero, film grain overlay, and custom cursor glow.
- **Smooth Animations**: Framer Motion scroll reveals and buttery smooth Lenis scrolling.
- **Full-Screen Galleries**: Edge-to-edge masonry grids and Instagram feeds with an integrated lightbox.
- **Dark/Light Mode**: Smooth theme toggling with `localStorage` persistence.
- **Zero-Backend Forms**: Booking inquiries and newsletter subscriptions powered by FormSubmit.

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository or navigate to the project directory:**
   ```bash
   cd "e:\Program Files\PHOTO\photographer-portfolio"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

Start the local development server with the following command:

```bash
npm run dev
```

The application will start running on `http://localhost:3000`. Open this URL in your browser to view the portfolio.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

To test the production build locally:

```bash
npm run start
```

## Customization

### Updating Images
- You can change the placeholder images by updating the `src` paths in `src/components/Portfolio.tsx` and `src/components/Instagram.tsx`.
- The portfolio is currently configured to allow images from `images.unsplash.com` and `res.cloudinary.com` in `next.config.ts`. If you use your own domain or another image provider, be sure to add it to the `remotePatterns` in `next.config.ts`.

### Updating the Hero Video
- The background video is located in `src/components/Hero.tsx`. Update the `<source src="..." />` tag to point to your cinematic reel (MP4).

### Contact & Newsletter Forms
- Both the **Booking Form** (`src/components/Booking.tsx`) and the **Newsletter Form** (`src/components/Footer.tsx`) are wired to use **FormSubmit**.
- When you first submit a form from the live website, FormSubmit will send an activation link to your email address (`varadjujare00@gmail.com`). Click the link to confirm your address, and all future inquiries will go straight to your inbox!

## Deployment
This project is optimized for deployment on Vercel. 
1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Deploy! Vercel will automatically detect the Next.js framework and handle the rest.
