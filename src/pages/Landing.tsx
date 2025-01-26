import { Briefcase, Search, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Your Perfect Job Match Awaits
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Upload your resume and let our AI-powered matching system connect you with your ideal career opportunities. Get personalized job recommendations based on your skills and experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Precise Matching</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced AI analysis for accurate job matches</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Smart Search</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Instant access to relevant job opportunities</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Career Growth</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Find roles that match your career goals</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-16 text-center">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          Try Now
        </button>
      </section>
    </>
  );
};