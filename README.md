# CV Modifier

A Next.js application that helps users tailor their existing CV to better match the job description they're applying for. The app also generates a matching cover letter based on the refined CV and job description.

## Features

- **CV Upload**: Upload your current CV in various formats (PDF, DOCX, TXT, HTML)
- **Job Description Entry**: Paste in the job description you're targeting
- **AI-Powered Tailoring**: Automatically refine your CV to better match the job requirements
- **Cover Letter Generation**: Create a matching cover letter based on your tailored CV and the job description
- **Template Selection**: Choose from multiple CV templates before downloading
- **Supabase Integration**: Authentication, file storage, and user preferences (to be implemented)

## Technologies Used

- **Next.js**: Frontend and API routes
- **Tailwind CSS**: Styling
- **OpenAI API**: CV tailoring and cover letter generation
- **Supabase**: Authentication and database (to be implemented)
- **React Dropzone**: File uploads
- **PDF/DOCX Parsing**: Extract content from various file formats

## Getting Started

### Prerequisites

- Node.js 14+ and npm/yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/goodness273/cvmodifier.git
   cd cvmodifier
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app`: Next.js application routes
- `/src/components`: React components for the UI
- `/src/lib`: Utility functions and services
- `/src/api`: API route handlers
- `/public`: Static assets

## Deployment

This application can be deployed to Vercel or any other platform that supports Next.js applications.

## Future Enhancements

- User authentication and profile management
- Saved CV and job description history
- More CV templates
- Improved CV parsing and formatting
- Enhanced AI tailoring algorithms

## License

This project is licensed under the MIT License - see the LICENSE file for details.
