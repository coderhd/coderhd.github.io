# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This website showcases my professional experience, projects, and technical skills with a clean, minimalist design.

## Features

- ✨ Modern UI with smooth animations and transitions
- 📱 Fully responsive design that works on all devices
- 🌗 Custom animated logo and loading screen
- 🧩 Interactive experience timeline with tab navigation
- 🎯 Smooth scrolling between sections
- 🌈 Custom styled components with Tailwind CSS
- 📊 Project showcases in a card layout
- 📲 Mobile-friendly navigation with slide-in drawer

## Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/app` - Next.js application routes and components
- `/public` - Static assets (images, resume, etc.)
- `/app/components` - Reusable UI components
- `/app/providers` - React context providers
- `/app/globals.css` - Global CSS and animations

## Customization

To personalize this portfolio for your own use:

1. Update the personal information in `app/page.tsx`
2. Replace the profile picture in `public/portfolio-pic.jpg`
3. Update the resume file in `public/Harsh-Resume.pdf`
4. Modify the experience and projects sections in `app/page.tsx`
5. Customize colors and styles in `tailwind.config.ts` and `app/globals.css`

## Deployment

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com/), the platform from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import your project to Vercel
3. Vercel will detect Next.js automatically and apply the optimal settings

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by [Brittany Chiang's Portfolio](https://brittanychiang.com/)
- Icons provided by [Lucide Icons](https://lucide.dev/)
