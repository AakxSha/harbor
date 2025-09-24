# Harbor 🌊

**A Real-Time Coastal Hazard Reporting Platform**

Harbor is a comprehensive mobile and web application designed to help coastal communities stay safe from ocean-related hazards such as tsunamis, storm surges, high waves, and flooding through real-time crowdsourced reporting and early warning systems.

## 📋 Table of Contents

- [About](#about)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🌊 About

Harbor addresses the critical need for real-time field reporting from citizens and local communities during ocean-related emergencies. While agencies like INCOIS (Indian National Centre for Ocean Information Services) provide early warnings based on satellite data and numerical models, this platform bridges the gap by enabling:

- **Real-time citizen reporting** of ocean hazards
- **Credibility-based verification** system
- **Automated micro-alerts** for nearby users
- **Interactive mapping** with safe locations
- **Social media monitoring** for hazard-related discussions

## 🎯 Problem Statement

**Problem Statement ID: 25039**

India's vast coastline faces numerous ocean hazards including tsunamis, storm surges, high waves, and coastal currents. The current challenge is the lack of real-time field reporting and the untapped potential of social media insights during hazardous events. Harbor creates a unified platform for:

- Citizens to submit geotagged reports during hazardous events
- Role-based access for citizens, officials, and analysts
- Real-time data aggregation and visualization
- Social media integration with NLP for trend analysis
- Emergency response support with situational awareness

## ✨ Features

### 🚨 Core MVP Features

1. **Instant Hazard Reporting**
   - Quick report submission with location and media
   - Auto-location detection
   - Photo and video upload capabilities
   - Offline data collection with sync capabilities

2. **Credibility Score System**
   - User trust scoring based on report accuracy
   - Weighted verification of reports
   - Self-correcting community moderation

3. **Micro-Alerts & Notifications**
   - Real-time push notifications to nearby users
   - Automatic alert generation based on verified reports
   - Location-based alert filtering

4. **Interactive Map Dashboard**
   - Live hazard visualization
   - Safe location markers (shelters, hospitals, high ground)
   - Dynamic hotspot generation
   - Route guidance to safety

5. **User Profiles & History**
   - Personal credibility score tracking
   - Report history and statistics
   - Achievement system for community contributors

### 🔍 Advanced Features (Planned)

- Social media integration and NLP analysis
- Multilingual support for regional accessibility
- Integration with official early warning systems
- Advanced analytics and reporting
- Community forums and discussions

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **React Router** for client-side routing
- **TanStack Query** for server state management

### UI & Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library (Radix UI primitives)
- **Lucide React** for consistent iconography
- **CVA (Class Variance Authority)** for component variants

### Additional Libraries
- **React Hook Form** for form management
- **Sonner** for toast notifications
- **Date-fns** for date utilities
- **Recharts** for data visualization

### Development Tools
- **ESLint** for code linting
- **PostCSS** for CSS processing
- **TypeScript** for type safety
- **Bun** as package manager

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AakxSha/harbor.git
   cd harbor
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   ```

3. **Start development server**
   ```bash
   # Using Bun
   bun run dev
   
   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application.

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint for code quality

## 📁 Project Structure

```
harbor/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   └── Navigation.tsx # Main navigation component
│   ├── data/             # Mock data and constants
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Route components
│   │   ├── Home.tsx      # Dashboard/Home page
│   │   ├── Report.tsx    # Hazard reporting page
│   │   ├── Map.tsx       # Interactive map view
│   │   ├── Alerts.tsx    # Alert notifications
│   │   └── Profile.tsx   # User profile page
│   └── types/            # TypeScript type definitions
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## 🔄 Data Flow

1. **Report Submission**: Citizen submits hazard report with location and media
2. **Server Processing**: Backend verifies report using credibility score and AI/NLP
3. **Alert Generation**: Verified reports trigger micro-alerts to nearby users
4. **Map Updates**: Real-time map updates with new hazards and safe locations
5. **Score Updates**: User credibility scores updated based on report accuracy

## 🗺 Application Pages

- **Home**: Quick hazard overview and report button
- **Report**: Hazard submission form with media upload
- **Map**: Interactive dashboard with hazards and safe locations
- **Alerts**: Recent notifications and warnings
- **Profile**: User statistics and credibility score

## 🤝 Contributing

We welcome contributions to Harbor! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is part of a solution for INCOIS Problem Statement 25039 and is intended for coastal safety and disaster risk reduction.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for coastal community safety**
