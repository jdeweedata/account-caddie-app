# Account Caddie

Account Caddie is a comprehensive financial services website built with Next.js, offering expert accounting, tax, and financial planning solutions for businesses in South Africa.

## Version

1.2.0 (2024-11-09 12:21)

## Features

- Modern, responsive design using Tailwind CSS
- Server-side rendering with Next.js for improved performance and SEO
- Interactive UI components built with shadcn/ui
- ZOHO CRM and Calendar integration for consultation scheduling
- Comprehensive service pages for:
  - Accounting & Reporting
  - Tax Services
  - Debtors Management
  - Payroll Assistance
  - Financial Planning
  - Strategic Services
  - Risk & Compliance
- About page showcasing company values and team
- Pricing page with detailed service plans
- FAQ page for quick answers to common questions
- POPIA compliant privacy policy and terms of service
- Careers page for potential job seekers

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [ZOHO APIs](https://www.zoho.com/crm/developer/docs/api/v2/) - CRM and Calendar integration

## Project Structure

```
├── app/                            # Next.js app directory
│   ├── about/                     # About page
│   ├── api/                      # API routes
│   │   ├── consultation/        # Consultation API endpoints
│   │   └── zoho/               # ZOHO integration endpoints
│   ├── assessment/             # Assessment wizard
│   ├── booking/               # Booking system
│   ├── careers/              # Careers page
│   ├── contact/             # Contact page
│   ├── faq/                # FAQ page
│   ├── legal/             # Legal pages (privacy, terms, etc.)
│   ├── pricing/          # Pricing page
│   ├── services/        # Service pages
│   └── test/           # Testing pages
├── components/        # React components
│   ├── ConsultationScheduler/  # Consultation booking components
│   ├── Navigation/           # Navigation components
│   ├── PIScoreWizard/       # Performance Index Score wizard
│   ├── pricing/            # Pricing components
│   └── ui/                # UI components (buttons, cards, etc.)
├── config/            # Configuration files
│   └── business-hours.ts  # Business hours config
├── lib/              # Utility functions and hooks
│   ├── zoho/       # ZOHO integration
│   │   ├── auth/  # Authentication
│   │   ├── hooks/ # Custom hooks
│   │   └── utils/ # Utility functions
│   └── utils.ts   # General utilities
├── public/        # Static assets
├── scripts/      # Development scripts
└── styles/      # Global styles
    ├── calendar.css    # Calendar styles
    └── globals.css    # Global CSS

Configuration Files:
├── .env                 # Environment variables
├── .env.example        # Example environment variables
├── .eslintrc.json     # ESLint configuration
├── next.config.js    # Next.js configuration
├── postcss.config.js # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json    # TypeScript configuration
└── components.json # shadcn/ui components configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the ZOHO API credentials and configuration

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ZOHO Integration Setup

1. Create a ZOHO Developer Account
2. Set up a new client in ZOHO API Console
3. Configure OAuth credentials:
   - Add authorized redirect URIs
   - Enable required API scopes
4. Update environment variables with your ZOHO credentials
5. Test the integration:

```bash
npm run test-zoho
```

## Environment Variables

Required environment variables for ZOHO integration:

```env
NEXT_PUBLIC_ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_ZOHO_REDIRECT_URI=your_redirect_uri
NEXT_PUBLIC_ZOHO_API_DOMAIN=https://www.zohoapis.com
NEXT_PUBLIC_ZOHO_AUTH_DOMAIN=https://accounts.zoho.com
NEXT_PUBLIC_ZOHO_CALENDAR_ID=your_calendar_id
```

## API Routes

- `/api/zoho/auth/initialize` - Initialize ZOHO authentication
- `/api/zoho/auth/callback` - OAuth callback handler
- `/api/zoho/auth/token` - Token management
- `/api/consultation` - Consultation scheduling
- `/api/consultation/slots` - Available time slots
- `/api/consultation/cancel` - Cancel consultation

## Development

### Testing

Run ZOHO integration tests:

```bash
npm run test-zoho
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Version Control

We use Git for version control. To contribute to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact us at info@accountcaddie.co.za.